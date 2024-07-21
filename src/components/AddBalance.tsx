import React, { useState } from 'react';
import './AddBalance.css';

// If you lost all your money you can add balance
const AddBalance: React.FC = () => {
  const [balance, setBalance] = useState<number>(100); // Initial balance
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

export default AddBalance;