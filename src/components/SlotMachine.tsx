import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import './SlotMachine.css';

const SlotMachine: React.FC = () => {
  const { balance, setBalance, addBet } = useAppContext();
  const [spin, setSpin] = useState(false);
  const [result, setResult] = useState('');
  const [betAmount, setBetAmount] = useState(1);
  const [reels, setReels] = useState([['🍋'], ['🍋'], ['🍋']]);
  const [isSpinning, setIsSpinning] = useState([false, false, false]);

  useEffect(() => {
    if (spin) {
      const symbols = ['🍋', '🍒', '🍇', '🍉', '💎', '🍌'];
      const probabilities = [0.1, 0.15, 0.2, 0.2, 0.15, 0.2];
      const spinResult = Array.from({ length: 3 }, () =>
        getRandomSymbol(symbols, probabilities)
      );

      setIsSpinning([true, true, true]);

      spinReel(0, spinResult[0], 1200);
      spinReel(1, spinResult[1], 1400);
      spinReel(2, spinResult[2], 1600);

      setTimeout(() => {
        setResult(spinResult.join(' - '));
        handleBetResult(spinResult);
        setSpin(false);
      }, 1600);
    }
  }, [spin, balance, setBalance, addBet, betAmount]);

  const handleSpin = () => {
    if (balance >= betAmount) {
      setSpin(true);
    } else {
      alert("You don't have enough balance to spin.");
    }
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseInt(e.target.value, 10);
    if (amount >= 1 && amount <= 10) {
      setBetAmount(amount);
    }
  };

  const handleBetResult = (spinResult: string[]) => {
    let reward = -betAmount;
    let win = false;

    const resultString = spinResult.join(' - ');

    if (resultString === '💎 - 💎 - 💎') {
      reward = betAmount * 7;
      win = true;
    } else if (resultString === '🍒 - 🍒 - 🍒') {
      reward = betAmount * 6;
      win = true;
    } else if (resultString === '🍋 - 🍋 - 🍋') {
      reward = betAmount * 5;
      win = true;
    } else if (resultString === '🍉 - 🍉 - 🍉') {
      reward = betAmount * 4;
      win = true;
    } else if (resultString === '🍇 - 🍇 - 🍇') {
      reward = betAmount * 3;
      win = true;
    } else if (resultString === '🍌 - 🍌 - 🍌') {
      reward = betAmount * 2;
      win = true;
    }

    const updatedBalance = balance + reward;
    setBalance(updatedBalance);
    addBet({
      date: new Date().toISOString(),
      betAmount,
      game: 'SlotMachine',
      result: win ? 'Win' : 'Loss',
      balance: updatedBalance,
    });
  };

  const getRandomSymbol = (symbols: string[], probabilities: number[]) => {
    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < symbols.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue <= cumulativeProbability) {
        return symbols[i];
      }
    }
    return symbols[symbols.length - 1];
  };

  const spinReel = (reelIndex: number, finalSymbol: string, duration: number) => {
    const symbols = ['🍋', '🍒', '🍇', '🍉', '💎', '🍌'];
    const interval = 100;

    const spinInterval = setInterval(() => {
      setReels((prevReels) => {
        const newReels = [...prevReels];
        newReels[reelIndex] = [symbols[Math.floor(Math.random() * symbols.length)], ...newReels[reelIndex]];
        return newReels;
      });
    }, interval);

    setTimeout(() => {
      clearInterval(spinInterval);
      setReels((prevReels) => {
        const newReels = [...prevReels];
        newReels[reelIndex] = [finalSymbol];
        return newReels;
      });
      setIsSpinning((prev) => {
        const newSpinning = [...prev];
        newSpinning[reelIndex] = false;
        return newSpinning;
      });
    }, duration);
  };

  return (
    <div className="slot-machine">
      <h2>Slot Machine</h2>
      <p className='balance-text'>Current Balance: ${balance}</p>
      <p className='bet-text'>Enter your bet:</p>
      <input className='slot-input'
        type="number"
        value={betAmount}
        onChange={handleBetAmountChange}
        min="1"
        max="10"
      />
      <button className='slot-spin-btn' onClick={handleSpin} disabled={spin}>
        {spin ? 'Spinning...' : 'Spin'}
      </button>
      <div>
        <p className='result-text'>Slot Machine Result:</p>
        <div className='slot-machine-block'>
          {reels.map((reel, index) => (
            <div key={index} className={`reel ${isSpinning[index] ? 'spinning' : ''}`}>
              {reel.map((symbol, i) => (
                <div key={i} className='symbol'>{symbol}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
