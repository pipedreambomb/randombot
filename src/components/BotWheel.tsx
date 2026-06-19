import React, { useEffect, useState, useRef } from 'react';
import type { Bot } from '../data/bots';

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

const playTick = (ctx: AudioContext) => {
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
  gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.015);
  
  noiseSource.start(ctx.currentTime);
};

interface BotWheelProps {
  bots: Bot[];
  isSpinning: boolean;
  selectedBot: Bot | null;
  onSpinComplete: () => void;
}

const ITEM_HEIGHT = 250; // Match CSS .wheel-item height
const SPIN_DURATION_MS = 4000;

export const BotWheel: React.FC<BotWheelProps> = ({ bots, isSpinning, selectedBot, onSpinComplete }) => {
  const [stripBots, setStripBots] = useState<Bot[]>([]);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bots.length > 0) {
      // Repeat the bots array to create a long strip for spinning
      const repeatedBots = [...bots, ...bots, ...bots, ...bots, ...bots, ...bots];
      setStripBots(repeatedBots);
      
      // Reset position when not spinning
      if (!isSpinning && stripRef.current) {
         let initialIndex = 0;
         if (!selectedBot) {
           const martinIndex = bots.findIndex(b => b.id === 'martin');
           if (martinIndex !== -1) initialIndex = martinIndex;
         } else {
           initialIndex = bots.findIndex(b => b.id === selectedBot.id);
           if (initialIndex === -1) initialIndex = 0;
         }
         
         const initialOffset = -(initialIndex * ITEM_HEIGHT);
         stripRef.current.style.transition = 'none';
         stripRef.current.style.transform = `translateY(${initialOffset}px)`;
      }
    }
  }, [bots, isSpinning, selectedBot]);

  useEffect(() => {
    if (isSpinning && selectedBot && bots.length > 0) {
      // Target the bot in the 4th repetition to ensure a long spin
      const baseIndex = bots.findIndex(b => b.id === selectedBot.id);
      const targetIndex = (bots.length * 3) + baseIndex;
      
      const finalOffset = -(targetIndex * ITEM_HEIGHT);
      
      let animationFrameId: number;
      const ctx = initAudio();
      
      if (stripRef.current) {
        // Trigger reflow to ensure the transition from 0px starts properly
        void stripRef.current.offsetHeight;
        stripRef.current.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0.85, 0.15, 1)`;
        stripRef.current.style.transform = `translateY(${finalOffset}px)`;
        
        let lastIndex = -1;
        const checkTick = () => {
          if (!stripRef.current) return;
          const style = window.getComputedStyle(stripRef.current);
          const matrix = style.transform;
          if (matrix !== 'none') {
            const match = matrix.match(/matrix.*\((.+)\)/);
            if (match) {
              const values = match[1].split(', ');
              const y = parseFloat(values[5]);
              // Math.floor will detect every time we pass a full item threshold
              const currentIndex = Math.floor(Math.abs(y) / ITEM_HEIGHT);
              if (lastIndex !== -1 && currentIndex !== lastIndex) {
                playTick(ctx);
              }
              lastIndex = currentIndex;
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
  }, [isSpinning, selectedBot, bots, onSpinComplete]);

  if (bots.length === 0) {
    return (
      <div className="wheel-container" style={{ height: '250px', display: 'flex', alignItems: 'center' }}>
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
