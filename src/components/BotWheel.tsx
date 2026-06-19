import React, { useEffect, useState, useRef } from 'react';
import type { Bot } from '../data/bots';

let audioCtx: AudioContext | null = null;
const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTick = (ctx: AudioContext, time?: number, volume: number = 0.8) => {
  const startTime = time ?? ctx.currentTime;
  
  // Create a 50ms burst of white noise
  const bufferSize = ctx.sampleRate * 0.05; 
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;
  
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
}

const SPIN_DURATION_MS = 4500;

export const BotWheel: React.FC<BotWheelProps> = ({ bots, isSpinning, selectedBot, onSpinComplete }) => {
  const [stripBots, setStripBots] = useState<Bot[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  const displayedBotRef = useRef<Bot | null>(null);

  // Initialize the strip on mount
  useEffect(() => {
    if (bots.length > 0 && stripBots.length === 0) {
      const displayBot = selectedBot || bots.find(b => b.id === 'martin') || bots[0];
      displayedBotRef.current = displayBot;
      setStripBots([displayBot]);
      
      // Ensure we are at the top
      if (stripRef.current) {
         stripRef.current.style.transition = 'none';
         stripRef.current.style.transform = `translateY(0px)`;
      }
    }
  }, [bots, selectedBot, stripBots.length]);

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
    if (isSpinning && stripBots.length > 1) {
      const itemHeight = stripRef.current?.children[0]?.clientHeight || 200;
      const finalOffset = -((stripBots.length - 1) * itemHeight);
      
      let animationFrameId: number;
      const ctx = initAudio();
      
      if (stripRef.current) {
        // Snap instantly to the top (which is our current bot)
        stripRef.current.style.transition = 'none';
        stripRef.current.style.transform = `translateY(0px)`;
        
        // Trigger reflow to apply the snap
        void stripRef.current.offsetHeight;
        
        // Start animation down to the new target. 
        // Adjusted curve to start with near-instant maximum velocity.
        stripRef.current.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0, 0.8, 0.3, 1)`;
        stripRef.current.style.transform = `translateY(${finalOffset}px)`;
        
        let lastIndex = 0;
        const checkTick = () => {
          if (!stripRef.current) return;
          const style = window.getComputedStyle(stripRef.current);
          const matrix = style.transform;
          if (matrix !== 'none') {
            const match = matrix.match(/matrix.*\((.+)\)/);
            if (match) {
              const values = match[1].split(', ');
              const y = parseFloat(values[5]);
              const currentIndex = Math.floor(Math.abs(y) / itemHeight);
              if (currentIndex > lastIndex && currentIndex < stripBots.length) {
                // If the wheel is spinning so fast that it skips multiple items 
                // between browser animation frames, we calculate the missed ticks 
                // and schedule them rapidly so the audio pitch perfectly matches velocity.
                const missed = currentIndex - lastIndex;
                const frameTime = 1 / 60; // Approximate 16ms frame
                
                // Cap at 2 ticks per frame to prevent the audio buffers from summing 
                // together > 1.0 and causing clipping (the "crunching" noise).
                const ticksToPlay = Math.min(missed, 2);
                const timeStep = frameTime / ticksToPlay;
                
                // Reduce volume if playing multiple rapid ticks
                const volume = 0.8 / ticksToPlay;
                
                for (let i = 0; i < ticksToPlay; i++) {
                  playTick(ctx, ctx.currentTime + (i * timeStep), volume);
                }
                
                lastIndex = currentIndex;
              }
            }
          }
          animationFrameId = requestAnimationFrame(checkTick);
        };
        animationFrameId = requestAnimationFrame(checkTick);
      }
      
      const timer = setTimeout(() => {
        onSpinComplete();
        cancelAnimationFrame(animationFrameId);
      }, SPIN_DURATION_MS + 100);

      return () => {
        clearTimeout(timer);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, [isSpinning, stripBots, onSpinComplete]);

  if (bots.length === 0) {
    return (
      <div className="wheel-container" style={{ display: 'flex', alignItems: 'center' }}>
         <p style={{ color: 'var(--text-muted)' }}>No bots available.</p>
      </div>
    );
  }

  return (
    <div className="wheel-container">
      <div 
        className="wheel-strip" 
        ref={stripRef}
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
              <div className="bot-elo">{bot.id === 'the-mechanical-turk' ? '?' : bot.elo} ELO <span className="bot-group-badge">{bot.group}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
