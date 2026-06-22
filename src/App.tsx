import { useState, useMemo, useEffect } from 'react';
import { Controls } from './components/Controls';
import { BotWheel } from './components/BotWheel';
import { bots as allBots, type Bot } from './data/bots';
import './index.css';

function App() {
  const [minElo, setMinElo] = useState<number>(() => {
    const saved = localStorage.getItem('minElo');
    return saved !== null ? Number(saved) : 250;
  });
  const [maxElo, setMaxElo] = useState<number>(() => {
    const saved = localStorage.getItem('maxElo');
    return saved !== null ? Number(saved) : Infinity;
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  useEffect(() => {
    localStorage.setItem('minElo', minElo.toString());
    localStorage.setItem('maxElo', maxElo.toString());
  }, [minElo, maxElo]);

  const filteredBots = useMemo(() => {
    return allBots.filter(bot => bot.elo >= minElo && bot.elo <= maxElo);
  }, [minElo, maxElo]);

  const handleSpin = () => {
    if (filteredBots.length === 0) return;

    setIsSpinning(true);
    // Pick a random bot from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredBots.length);
    setSelectedBot(filteredBots[randomIndex]);
  };

  const handleSpinComplete = () => {
    setIsSpinning(false);
  };

  return (
    <div className="app-container">
      <div>
        <h1>Chess Bot Randomizer</h1>
        <p className="subtitle">Spin to find your next opponent</p>
      </div>

      <BotWheel
        bots={filteredBots}
        isSpinning={isSpinning}
        selectedBot={selectedBot}
        onSpinComplete={handleSpinComplete}
      />

      <Controls
        minElo={minElo}
        maxElo={maxElo}
        setMinElo={setMinElo}
        setMaxElo={setMaxElo}
        onSpin={handleSpin}
        isSpinning={isSpinning}
        hasValidBots={filteredBots.length > 0}
      />

      <footer style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', opacity: 0.7 }}>
        <p>This is an unofficial, unauthorized project created for fun.</p>
        <p>Not affiliated with, endorsed by, or sponsored by Chess.com.</p>
        <p>All bot names and avatars are property of Chess.com.</p>
        <p style={{ marginTop: '0.5rem' }}>
          <a href="https://github.com/pipedreambomb/randombot" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            View source on GitHub
          </a>
        </p>
        <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>Privacy & Storage: This tool uses your browser's local storage solely to remember your minimum and maximum Elo filter settings between visits. Absolutely no personal data is tracked, collected, or sent to any server.</p>
      </footer>
    </div>
  );
}

export default App;
