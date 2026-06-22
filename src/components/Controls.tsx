import React, { useMemo } from 'react';

const ELO_TIERS = [
  { value: 250, label: '250' },
  { value: 400, label: '400' },
  { value: 550, label: '550' },
  { value: 700, label: '700' },
  { value: 850, label: '850' },
  { value: 1000, label: '1000' },
  { value: 1100, label: '1100' },
  { value: 1200, label: '1200' },
  { value: 1300, label: '1300' },
  { value: 1400, label: '1400' },
  { value: 1500, label: '1500' },
  { value: 1600, label: '1600' },
  { value: 1700, label: '1700' },
  { value: 1800, label: '1800' },
  { value: 1900, label: '1900' },
  { value: 2000, label: '2000' },
  { value: 2100, label: '2100' },
  { value: 2200, label: '2200' },
  { value: 2300, label: '2300' },
  { value: 2450, label: '2450' },
  { value: Infinity, label: 'Unlimited' }
];
interface ControlsProps {
  minElo: number;
  maxElo: number;
  setMinElo: (val: number) => void;
  setMaxElo: (val: number) => void;
  onSpin: () => void;
  isSpinning: boolean;
  hasValidBots: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  minElo,
  maxElo,
  setMinElo,
  setMaxElo,
  onSpin,
  isSpinning,
  hasValidBots
}) => {
  const minTiers = useMemo(
    () => ELO_TIERS.filter(tier => tier.value <= maxElo && tier.value !== Infinity),
    [maxElo]
  );

  const maxTiers = useMemo(
    () => ELO_TIERS.filter(tier => tier.value >= minElo),
    [minElo]
  );

  return (
    <div className="controls-container glass-panel">
      <div className="elo-inputs">
        <div className="input-group">
          <label htmlFor="minElo">Min ELO</label>
          <select
            id="minElo"
            value={minElo}
            onChange={(e) => setMinElo(Number(e.target.value))}
            disabled={isSpinning}
            className="elo-select"
          >
            {minTiers.map(tier => (
              <option key={`min-${tier.value}`} value={tier.value}>{tier.label}</option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="maxElo">Max ELO</label>
          <select
            id="maxElo"
            value={maxElo}
            onChange={(e) => setMaxElo(Number(e.target.value))}
            disabled={isSpinning}
            className="elo-select"
          >
            {maxTiers.map(tier => (
              <option key={`max-${tier.value}`} value={tier.value}>{tier.label}</option>
            ))}
          </select>
        </div>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem', opacity: 0.8 }}>Your Elo filter preferences are saved locally to your browser.</p>
      <button 
        className="btn-spin" 
        onClick={onSpin} 
        disabled={isSpinning || !hasValidBots}
      >
        {isSpinning ? 'Spinning...' : 'Spin'}
      </button>
      {!hasValidBots && !isSpinning && (
        <p style={{ color: '#ef4444', textAlign: 'center', fontSize: '0.875rem' }}>
          No bots found in this ELO range.
        </p>
      )}
    </div>
  );
};
