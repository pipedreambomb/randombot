import React, { useEffect, useState, useRef } from 'react';
import type { Bot } from '../data/bots';

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
      
      if (stripRef.current) {
        // Trigger reflow to ensure the transition from 0px starts properly
        void stripRef.current.offsetHeight;
        stripRef.current.style.transition = `transform ${SPIN_DURATION_MS}ms cubic-bezier(0.15, 0.85, 0.15, 1)`;
        stripRef.current.style.transform = `translateY(${finalOffset}px)`;
      }
      
      const timer = setTimeout(() => {
        onSpinComplete();
      }, SPIN_DURATION_MS + 100);

      return () => clearTimeout(timer);
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
              <div className="bot-elo">{bot.elo} ELO <span className="bot-group-badge">{bot.group}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
