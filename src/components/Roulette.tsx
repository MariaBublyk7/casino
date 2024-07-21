import React, { useState, useEffect } from 'react';
import './Roulette.css';
import { useAppContext } from '../AppContext';

const numbers = [30, 15, 4, 24, 8, 33, 17, 34, 11, 3, 23, 16, 32, 27, 6, 12, 29, 1, 19, 9, 28, 35, 21, 7, 5, 25, 14, 0, 18, 31, 10, 20, 2, 26, 13, 22];
const colors = ['black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'green', 'black', 'red', 'black', 'red', 'black', 'red', 'black', 'red'];

interface SpinHistory {
  time: string;
  number: number;
  color: string;
}

const Roulette: React.FC = () => {
  const { balance, setBalance, addBet } = useAppContext();
  const [betAmount, setBetAmount] = useState<number>(0);
  const [betType, setBetType] = useState<string>('number');
  const [betValue, setBetValue] = useState<string>('');
  const [spinResult, setSpinResult] = useState<number | null>(null);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');
  const [history, setHistory] = useState<SpinHistory[]>(() => {
    const storedHistory = localStorage.getItem('rouletteHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('rouletteHistory', JSON.stringify(history));
  }, [history]);

  const numberRadius = 140; 
  const ballRadius = 70; 

  const spinWheel = () => {
    if (spinning) return;
    if (betAmount > balance) {
      setResultMessage('Insufficient balance to place the bet.');
      return;
    }
    setSpinning(true);

    const randomIndex = Math.floor(Math.random() * numbers.length);
    setSpinResult(randomIndex);

    const finalRotation = (randomIndex * (360 / numbers.length)) + (3 * 360);

    const rouletteBall = document.getElementById('rouletteBall');
    if (rouletteBall) {
      rouletteBall.style.transition = 'none';
      rouletteBall.style.transform = `rotate(270deg) translate(${ballRadius}px)`;

      setTimeout(() => {
        rouletteBall.style.transition = 'transform 4s ease-out';
        rouletteBall.style.transform = `rotate(${finalRotation}deg) translate(${ballRadius}px)`;
      }, 50);
    }

    setTimeout(() => {
      setSpinning(false);
      handleResult(randomIndex);
    }, 4000);
  };

  const handleResult = (resultIndex: number) => {
    const resultNumber = numbers[resultIndex];
    const resultColor = colors[resultIndex];
    let win = false;
    let reward = -betAmount;

    if (betType === 'number' && parseInt(betValue) === resultNumber) {
      reward = betAmount * 35;
      win = true;
    } else if (betType === 'color' && betValue === resultColor) {
      reward = betAmount * 2;
      win = true;
    }

    setBalance(balance + reward);
    addBet({
      date: new Date().toLocaleString('en-GB'),
      betAmount,
      game: 'Roulette',
      result: win ? 'Win' : 'Loss',
      balance: balance + reward,
    });

    const currentTime = new Date().toLocaleTimeString();
    const newHistoryItem: SpinHistory = {
      time: currentTime,
      number: resultNumber,
      color: resultColor,
    };

    setHistory((prevHistory) => [newHistoryItem, ...prevHistory]);

    if (win) {
      setResultMessage(`Congratulations! You won with number ${resultNumber} (${resultColor}).`);
    } else {
      setResultMessage(`Sorry, you lost. The result was ${resultNumber} (${resultColor}).`);
    }
  };

  return (
    <div className="roulette-game">
      <h2>Roulette</h2>
      <div className="balance-display">
        <p className='balance-text'>Current Balance: ${balance}</p>
      </div>
      <div className="roulette-container">
        <div className={`roulette-wheel ${spinning ? 'spinning' : ''}`} id="rouletteWheel">
          {numbers.map((number, index) => (
            <div
              key={index}
              className="number-slot"
              style={{
                transform: `rotate(${index * (360 / numbers.length)}deg) translate(${numberRadius}px) rotate(-${index * (360 / numbers.length)}deg)`,
              }}
            >
              <div className={`number-text ${colors[index]}`}>{number}</div>
            </div>
          ))}
          <div className={`roulette-ball ${spinning ? 'spinning-ball' : ''}`}
               id="rouletteBall"
               style={{
                 transform: `rotate(270deg) translate(${ballRadius}px)`
               }}></div>
        </div>
      </div>
      <div className="betting-container">
        <h2>Place Your Bets</h2>
        <div className='roulette-block'>
            <label htmlFor="betAmount">Bet Amount:</label>
            <input className='roulette-input' type="number" id="betAmount" min="1" value={betAmount} onChange={(e) => setBetAmount(parseInt(e.target.value))} />
        </div>
        <div className='roulette-block'>
            <label htmlFor="betType">Bet On:</label>
            <select className='roulette-select' id="betType" value={betType} onChange={(e) => setBetType(e.target.value)}>
            <option value="number">Number</option>
            <option value="color">Color</option>
            </select>
            <input className='roulette-input' type="text" id="betValue" placeholder="Enter number or color" value={betValue} onChange={(e) => setBetValue(e.target.value)} />
        </div>
        <div className='roulette-block'>
            <button className='spin-btn' onClick={spinWheel} disabled={spinning}>Spin</button>
        </div>
      </div>
      <div className="result-container">
        <p className='result-text'>Roulette Result:</p>
        <p className='roulette-result-text'>{resultMessage}</p>
      </div>
      <div className="history-container">
        <h2>Spin History</h2>
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Number</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td>{item.number}</td>
                <td>{item.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Roulette;
