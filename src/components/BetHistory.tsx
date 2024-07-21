import React from 'react';
import './BetHistory.css';
import { useAppContext } from '../AppContext';

const BetHistory: React.FC = () => {
  const { bets } = useAppContext();

  return (
    <div>
      <h2>Bet History</h2>
      <div className="bet-history-container">
        <table className="bet-history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Game</th>
              <th>Result</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {bets.map((bet, index) => (
              <tr key={index}>
                <td>{bet.date}</td>
                <td>{bet.betAmount}</td>
                <td>{bet.game}</td>
                <td>{bet.result}</td>
                <td>{bet.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BetHistory;
