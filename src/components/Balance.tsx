import React, { useState } from 'react';
import './Balance.css';
import { useAppContext } from '../AppContext';

const Balance: React.FC = () => {
  const { balance, setBalance } = useAppContext();
  const [amountToAdd, setAmountToAdd] = useState<number>(0);

  const handleAddBalance = () => {
    setBalance(balance + amountToAdd);
    setAmountToAdd(0); // Reset the input field after adding the balance
  };

  return (
    <div className="balance-page">
      <h2>Add Balance</h2>
      <div className="balance-control">
        <h3>Current Balance: ${balance}</h3>
        <input
          type="number"
          value={amountToAdd}
          onChange={(e) => setAmountToAdd(parseInt(e.target.value))}
          placeholder="Enter amount to add"
        />
        <button onClick={handleAddBalance}>Add Balance</button>
      </div>
    </div>
  );
};

export default Balance;
