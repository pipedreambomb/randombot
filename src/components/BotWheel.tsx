import React, { useEffect, useState, useRef } from 'react';
import type { Bot } from '../data/bots';

// Utility to solve cubic bezier for animation progress
const solveCubicBezier = (p1x: number, p1y: number, p2x: number, p2y: number, x: number): number => {
  if (x <= 0) return 0;
  if (x >= 1) return 1;

  let t = x;
  for (let i = 0; i < 8; i++) {
    const pX = 3 * Math.pow(1 - t, 2) * t * p1x + 3 * (1 - t) * Math.pow(t, 2) * p2x + Math.pow(t, 3);
    const dX = 3 * Math.pow(1 - t, 2) * p1x + 6 * (1 - t) * t * (p2x - p1x) + 3 * Math.pow(t, 2) * (1 - p2x);
    if (Math.abs(pX - x) < 1e-5) break;
    if (Math.abs(dX) < 1e-5) break;
    t -= (pX - x) / dX;
  }

  return 3 * Math.pow(1 - t, 2) * t * p1y + 3 * (1 - t) * Math.pow(t, 2) * p2y + Math.pow(t, 3);
};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

let audioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

let cachedNoiseBuffer: AudioBuffer | null = null;

const playTick = (ctx: AudioContext, time?: number, volume: number = 0.8) => {
  const startTime = time ?? ctx.currentTime;
  
  // Create a 50ms burst of white noise (cached)
  if (!cachedNoiseBuffer) {
    const bufferSize = ctx.sampleRate * 0.05;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    cachedNoiseBuffer = buffer;
  }
  
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = cachedNoiseBuffer;
  
  // Filter it heavily to make it sound like a solid plastic/wood "click"
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;
  filter.Q.value = 1.0;
  
  const gainNode = ctx.createGain();
  
  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Very sharp decay envelope to kill the sound instantly (like a physical impact)
  gainNode.gain.setValueAtTime(volume, startTime);
  // Faster decay for lower volumes (high velocity) to prevent audio overlapping/crunching
  const decayTime = volume < 0.8 ? 0.008 : 0.015;
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + decayTime);
  
  noiseSource.start(startTime);
};

interface BotWheelProps {
  bots: Bot[];
  isSpinning: boolean;
  selectedBot: Bot | null;
  onSpinComplete: () => void;
  onSpin: () => void;
}

const SPIN_DURATION_MS = 4500;

export const BotWheel: React.FC<BotWheelProps> = ({ bots, isSpinning, selectedBot, onSpinComplete, onSpin }) => {
  const [stripBots, setStripBots] = useState<Bot[]>([]);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stripRef = useRef<HTMLDivElement>(null);
  const displayedBotRef = useRef<Bot | null>(null);

  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isInternalSpinningRef = useRef(false);

  // Initialize the strip
  useEffect(() => {
    if (bots.length > 0 && !isSpinning && !isInternalSpinningRef.current) {
      setStripBots([...bots]);
      
      // Center the selected bot or Martin or the first bot
      const targetBot = selectedBot || bots.find(b => b.id === 'martin') || bots[0];
      const botIndex = bots.findIndex(b => b.id === targetBot.id);
      const itemHeight = 200; // Default, will be updated by container height if needed

      if (botIndex !== -1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOffset(-(botIndex * itemHeight));
        displayedBotRef.current = targetBot;
      }
    }
  }, [bots, isSpinning, selectedBot]);

  // Handle starting a spin
  useEffect(() => {
    if (isSpinning && selectedBot && bots.length > 0) {
      const SPIN_ITEMS = 120; // Massive roulette-style spin
      const currentBot = displayedBotRef.current || bots[0];
      
      const newStrip = [currentBot];
      
      // Pick 10 random bots to repeat for the high-speed blur. 
      // This tricks the eye while preventing the browser from loading 100 unique images!
      const blurPool = [];
      for (let i = 0; i < 10; i++) {
        blurPool.push(bots[Math.floor(Math.random() * bots.length)]);
      }
      
      for (let i = 1; i < SPIN_ITEMS - 1; i++) {
        newStrip.push(blurPool[i % blurPool.length]);
      }
      newStrip.push(selectedBot);
      
      setStripBots(newStrip);
      displayedBotRef.current = selectedBot;
    }
  }, [isSpinning, selectedBot, bots]);

  // Handle animation
  useEffect(() => {
    if (isSpinning && stripBots.length > 1 && selectedBot) {
      isInternalSpinningRef.current = true;
      const itemHeight = stripRef.current?.children[0]?.clientHeight || 200;

      // Calculate starting position for the "roulette" strip based on where we were
      const finalOffset = -((stripBots.length - 1) * itemHeight);
      
      let animationFrameId: number;
      const ctx = initAudio();
      
      if (stripRef.current) {
        // Snap instantly to the top
        stripRef.current.style.transition = 'none';
        stripRef.current.style.transform = `translateY(0px)`;
        setOffset(0);
        
        // Trigger reflow to apply the snap
        void stripRef.current.offsetHeight;
        
        // Start animation
        stripRef.current.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0, 0.8, 0.3, 1)`;
        stripRef.current.style.transform = `translateY(${finalOffset}px)`;
        
        let lastIndex = 0;
        let startTime: number | null = null;

        const checkTick = (timestamp: number) => {
          if (!stripRef.current) return;
          if (startTime === null) startTime = timestamp;

          const elapsed = timestamp - startTime;
          const x = Math.min(elapsed / SPIN_DURATION_MS, 1);
          const yProgress = solveCubicBezier(0, 0.8, 0.3, 1, x);
          const y = yProgress * finalOffset;

          const currentIndex = Math.floor(Math.abs(y) / itemHeight);

          if (currentIndex > lastIndex && currentIndex < stripBots.length) {
            const missed = currentIndex - lastIndex;
            const frameTime = 1 / 60;
            const ticksToPlay = Math.min(missed, 2);
            const timeStep = frameTime / ticksToPlay;
            const volume = 0.8 / ticksToPlay;

            for (let i = 0; i < ticksToPlay; i++) {
              playTick(ctx, ctx.currentTime + (i * timeStep), volume);
            }
            lastIndex = currentIndex;
          }

          if (elapsed < SPIN_DURATION_MS) {
            animationFrameId = requestAnimationFrame(checkTick);
          }
        };
        animationFrameId = requestAnimationFrame(checkTick);
      }
      
      const timer = setTimeout(() => {
        isInternalSpinningRef.current = false;

        // Find selected bot index in the full bots list
        const finalBotIndex = bots.findIndex(b => b.id === selectedBot.id);
        if (finalBotIndex !== -1) {
          setStripBots([...bots]);
          setOffset(-(finalBotIndex * itemHeight));
          displayedBotRef.current = selectedBot;
        }

        onSpinComplete();
        cancelAnimationFrame(animationFrameId);
      }, SPIN_DURATION_MS + 50);

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isSpinning, stripBots, bots, onSpinComplete, selectedBot]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSpinning || isInternalSpinningRef.current) return;

    initAudio();
    setIsDragging(true);
    startYRef.current = e.clientY;
    startOffsetRef.current = offset;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    // Stop any CSS transitions
    if (stripRef.current) {
      stripRef.current.style.transition = 'none';
    }

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startYRef.current;
    let newOffset = startOffsetRef.current + deltaY;

    // Bounds resistance
    const itemHeight = stripRef.current?.children[0]?.clientHeight || 200;
    const maxOffset = 0;
    const minOffset = -((stripBots.length - 1) * itemHeight);

    if (newOffset > maxOffset) {
      newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
    } else if (newOffset < minOffset) {
      newOffset = minOffset + (newOffset - minOffset) * 0.3;
    }

    // Audio ticks
    const oldIndex = Math.round(Math.abs(offset) / itemHeight);
    const newIndex = Math.round(Math.abs(newOffset) / itemHeight);
    if (newIndex !== oldIndex && newIndex >= 0 && newIndex < stripBots.length) {
      const ctx = initAudio();
      playTick(ctx, ctx.currentTime, 0.4);
    }

    const currentTime = performance.now();
    const timeDelta = currentTime - lastTimeRef.current;
    if (timeDelta > 0) {
      velocityRef.current = (e.clientY - lastYRef.current) / timeDelta;
    }

    lastYRef.current = e.clientY;
    lastTimeRef.current = currentTime;
    setOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const itemHeight = stripRef.current?.children[0]?.clientHeight || 200;

    // Check for "flick" (high velocity)
    if (Math.abs(velocityRef.current) > 1.0) {
      onSpin();
    } else {
      // Snap to nearest item
      const nearestIndex = Math.max(0, Math.min(stripBots.length - 1, Math.round(Math.abs(offset) / itemHeight)));
      const targetOffset = -(nearestIndex * itemHeight);

      setOffset(targetOffset);
      displayedBotRef.current = stripBots[nearestIndex];

      if (stripRef.current) {
        stripRef.current.style.transition = 'transform 0.3s cubic-bezier(0.15, 0.85, 0.15, 1)';
      }
    }

    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    if (isSpinning || isInternalSpinningRef.current) return;

    initAudio();
    const itemHeight = stripRef.current?.children[0]?.clientHeight || 200;
    const maxOffset = 0;
    const minOffset = -((stripBots.length - 1) * itemHeight);

    let newOffset = offset - e.deltaY;
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));

    // Audio ticks
    const oldIndex = Math.round(Math.abs(offset) / itemHeight);
    const newIndex = Math.round(Math.abs(newOffset) / itemHeight);
    if (newIndex !== oldIndex && newIndex >= 0 && newIndex < stripBots.length) {
      const ctx = initAudio();
      playTick(ctx, ctx.currentTime, 0.4);
    }

    setOffset(newOffset);

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      const nearestIndex = Math.round(Math.abs(newOffset) / itemHeight);
      const targetOffset = -(nearestIndex * itemHeight);
      setOffset(targetOffset);
      displayedBotRef.current = stripBots[nearestIndex];
      if (stripRef.current) {
        stripRef.current.style.transition = 'transform 0.3s cubic-bezier(0.15, 0.85, 0.15, 1)';
      }
    }, 150);
  };

  if (bots.length === 0) {
    return (
      <div className="wheel-container" style={{ display: 'flex', alignItems: 'center' }}>
         <p style={{ color: 'var(--text-muted)' }}>No bots available.</p>
      </div>
    );
  }

  return (
    <div className="wheel-container"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
    >
      <div 
        className="wheel-strip" 
        ref={stripRef}
        style={{
          transform: `translateY(${offset}px)`,
          transition: isDragging ? 'none' : undefined
        }}
      >
        {stripBots.map((bot, idx) => (
          <div key={`${bot.id}-${idx}`} className="wheel-item">
            {bot.imageUrl ? (
              <img src={bot.imageUrl} alt={bot.name} className="bot-avatar" />
            ) : (
              <div className="bot-avatar-placeholder">
                {bot.name.charAt(0)}
              </div>
            )}
            <div className="bot-info">
              <div className="bot-name">{bot.name}</div>
              <div className="bot-elo">
                {bot.displayElo ? bot.displayElo : `${bot.elo} ELO`} <span className="bot-group-badge">{bot.group}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
