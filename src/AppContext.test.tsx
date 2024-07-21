import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AppProvider, useAppContext } from './AppContext';

// A helper component to test the context
const TestComponent = () => {
  const { balance, setBalance, bets, addBet } = useAppContext();

  return (
    <div>
      <div>Balance: {balance}</div>
      <button onClick={() => setBalance(balance + 10)}>Add $10</button>
      <button onClick={() => addBet({ date: '2022-01-01', betAmount: 10, game: 'Test', result: 'Win', balance: balance + 10 })}>
        Add Bet
      </button>
      <div>Bets: {JSON.stringify(bets)}</div>
    </div>
  );
};

describe('AppProvider', () => {
  it('should provide initial state', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByText(/Balance: 100/i)).toBeInTheDocument();
  });

  it('should update balance', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Add \$10/i));
    expect(screen.getByText(/Balance: 110/i)).toBeInTheDocument();
  });

  it('should add a bet', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    fireEvent.click(screen.getByText(/Add Bet/i));
    expect(screen.getByText(/Bets: /i)).toBeInTheDocument();
    expect(screen.getByText(/"date":"2022-01-01"/i)).toBeInTheDocument();
  });
});
