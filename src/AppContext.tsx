import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Bet {
  date: string;
  betAmount: number;
  game: string;
  result: string;
  balance: number;
}

interface AppContextProps {
  balance: number;
  bets: Bet[];
  setBalance: (balance: number) => void;
  addBet: (bet: Bet) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(() => {
    const storedBalance = localStorage.getItem('balance');
    return storedBalance ? JSON.parse(storedBalance) : 100;
  });

  const [bets, setBets] = useState<Bet[]>(() => {
    const storedBets = localStorage.getItem('bets');
    return storedBets ? JSON.parse(storedBets) : [];
  });

  const handleSetBalance = (newBalance: number) => {
    setBalance(newBalance);
    localStorage.setItem('balance', JSON.stringify(newBalance));
  };

  const addBet = (bet: Bet) => {
    const newBets = [...bets, bet];
    setBets(newBets);
    localStorage.setItem('bets', JSON.stringify(newBets));
  };

  return (
    <AppContext.Provider value={{ balance, bets, setBalance: handleSetBalance, addBet }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
