import { useState, useMemo } from 'react';
import { Controls } from './components/Controls';
import { BotWheel } from './components/BotWheel';
import { bots as allBots, type Bot } from './data/bots';
import './index.css';

function App() {
  const [minElo, setMinElo] = useState<number>(250);
  const [maxElo, setMaxElo] = useState<number>(4000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

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
        <h1>Chess.com Bots</h1>
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
    </div>
  );
}

export default App;
