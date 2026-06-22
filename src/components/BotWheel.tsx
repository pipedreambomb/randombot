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
  
  // Use a noise-based 'tick' sound to mimic a mechanical wheel
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
  
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;
  filter.Q.value = 1.0;
  
  const gainNode = ctx.createGain();
  
  noiseSource.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  gainNode.gain.setValueAtTime(volume, startTime);
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
const ITEM_HEIGHT = 200;

export const BotWheel: React.FC<BotWheelProps> = ({ bots, isSpinning, selectedBot, onSpinComplete, onSpin }) => {
  const [stripBots, setStripBots] = useState<Bot[]>([]);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [transition, setTransition] = useState<string>('none');

  const displayedBotRef = useRef<Bot | null>(null);

  const startYRef = useRef(0);
  const startOffsetRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const isInternalSpinningRef = useRef(false);

  // Sync bots to strip
  useEffect(() => {
    if (bots.length === 0) return;

    if (!isSpinning && !isInternalSpinningRef.current) {
      setStripBots([...bots]);
      
      // If we already have a displayed bot, try to keep it in view
      let targetBot = displayedBotRef.current;
      if (!targetBot || !bots.find(b => b.id === targetBot?.id)) {
        targetBot = selectedBot || bots.find(b => b.id === 'martin') || bots[0];
      }

      const botIndex = bots.findIndex(b => b.id === targetBot.id);
      if (botIndex !== -1) {
        setOffset(-(botIndex * ITEM_HEIGHT));
        displayedBotRef.current = targetBot;
      }
    }
  }, [bots, isSpinning, selectedBot]);

  // Handle Spin Logic
  useEffect(() => {
    let animationFrameId: number;
    let timerId: ReturnType<typeof setTimeout>;

    if (isSpinning && selectedBot && bots.length > 0) {
      isInternalSpinningRef.current = true;
      const ctx = initAudio();
      
      // Build a long strip for the spin animation to create a scrolling effect
      const SPIN_ITEMS = 100;
      const blurPool = [];
      for (let i = 0; i < 10; i++) {
        blurPool.push(bots[Math.floor(Math.random() * bots.length)]);
      }
      
      const newStrip = [...bots];
      while (newStrip.length < SPIN_ITEMS - 1) {
        newStrip.push(blurPool[newStrip.length % blurPool.length]);
      }
      newStrip.push(selectedBot);
      
      setStripBots(newStrip);
      
      const startOffset = offset;
      const finalOffset = -((newStrip.length - 1) * ITEM_HEIGHT);
      
      setTransition('none');

      // Wait a frame to apply transition for the CSS-based animation
      const rafId = requestAnimationFrame(() => {
        setTransition(`transform ${SPIN_DURATION_MS}ms cubic-bezier(0, 0.8, 0.3, 1)`);
        setOffset(finalOffset);
        
        let lastTickIndex = Math.floor(Math.abs(startOffset) / ITEM_HEIGHT);
        let startTime: number | null = null;

        const checkTick = (timestamp: number) => {
          if (startTime === null) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const x = Math.min(elapsed / SPIN_DURATION_MS, 1);
          // Calculate progress to manually trigger sound effects in sync with CSS animation
          const yProgress = solveCubicBezier(0, 0.8, 0.3, 1, x);
          const currentY = startOffset + (finalOffset - startOffset) * yProgress;

          const currentTickIndex = Math.floor(Math.abs(currentY) / ITEM_HEIGHT);
          if (currentTickIndex > lastTickIndex) {
            const missed = currentTickIndex - lastTickIndex;
            // Play up to 2 ticks if moving fast, to avoid overwhelming audio
            const ticksToPlay = Math.min(missed, 2);
            const volume = 0.8 / ticksToPlay;
            for (let i = 0; i < ticksToPlay; i++) {
              playTick(ctx, ctx.currentTime + (i * 0.01), volume);
            }
            lastTickIndex = currentTickIndex;
          }

          if (elapsed < SPIN_DURATION_MS) {
            animationFrameId = requestAnimationFrame(checkTick);
          }
        };
        animationFrameId = requestAnimationFrame(checkTick);

        timerId = setTimeout(() => {
          isInternalSpinningRef.current = false;
          displayedBotRef.current = selectedBot;

          // Reset strip to normal bots list after spin finishes
          const finalBotIndex = bots.findIndex(b => b.id === selectedBot.id);
          setStripBots([...bots]);
          setTransition('none');
          setOffset(-(finalBotIndex * ITEM_HEIGHT));

          onSpinComplete();
          cancelAnimationFrame(animationFrameId);
        }, SPIN_DURATION_MS + 50);
      });

      return () => {
        cancelAnimationFrame(rafId);
        cancelAnimationFrame(animationFrameId);
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning, selectedBot, bots, onSpinComplete]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSpinning || isInternalSpinningRef.current) return;

    initAudio();
    setIsDragging(true);
    setTransition('none');

    startYRef.current = e.clientY;
    startOffsetRef.current = offset;
    lastYRef.current = e.clientY;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startYRef.current;
    let newOffset = startOffsetRef.current + deltaY;

    const maxOffset = 0;
    const minOffset = -((stripBots.length - 1) * ITEM_HEIGHT);

    if (newOffset > maxOffset) {
      newOffset = maxOffset + (newOffset - maxOffset) * 0.3;
    } else if (newOffset < minOffset) {
      newOffset = minOffset + (newOffset - minOffset) * 0.3;
    }

    const oldIndex = Math.round(Math.abs(offset) / ITEM_HEIGHT);
    const newIndex = Math.round(Math.abs(newOffset) / ITEM_HEIGHT);
    if (newIndex !== oldIndex && newIndex >= 0 && newIndex < stripBots.length) {
      playTick(initAudio(), undefined, 0.4);
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
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    const timeSinceLastMove = performance.now() - lastTimeRef.current;
    if (timeSinceLastMove > 50) {
      velocityRef.current = 0;
    }

    if (Math.abs(velocityRef.current) > 1.0) {
      onSpin();
    } else {
      const nearestIndex = Math.max(0, Math.min(stripBots.length - 1, Math.round(Math.abs(offset) / ITEM_HEIGHT)));
      const targetOffset = -(nearestIndex * ITEM_HEIGHT);

      setTransition('transform 0.3s cubic-bezier(0.15, 0.85, 0.15, 1)');
      setOffset(targetOffset);
      displayedBotRef.current = stripBots[nearestIndex];
    }
  };

  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent) => {
    if (isSpinning || isInternalSpinningRef.current) return;

    initAudio();
    const maxOffset = 0;
    const minOffset = -((stripBots.length - 1) * ITEM_HEIGHT);

    let newOffset = offset - e.deltaY;
    newOffset = Math.max(minOffset, Math.min(maxOffset, newOffset));

    if (newOffset !== offset) {
      setTransition('none');

      const oldIndex = Math.round(Math.abs(offset) / ITEM_HEIGHT);
      const newIndex = Math.round(Math.abs(newOffset) / ITEM_HEIGHT);
      if (newIndex !== oldIndex) {
        playTick(initAudio(), undefined, 0.4);
      }

      setOffset(newOffset);
    }

    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(() => {
      const nearestIndex = Math.round(Math.abs(newOffset) / ITEM_HEIGHT);
      const targetOffset = -(nearestIndex * ITEM_HEIGHT);
      setTransition('transform 0.3s cubic-bezier(0.15, 0.85, 0.15, 1)');
      setOffset(targetOffset);
      displayedBotRef.current = stripBots[nearestIndex];
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
        style={{
          transform: `translateY(${offset}px)`,
          transition
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
