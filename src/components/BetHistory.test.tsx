import React from 'react';
import { render, screen } from '@testing-library/react';
import BetHistory from './BetHistory';
import { AppProvider } from '../AppContext';

describe('BetHistory Component', () => {
  it('should display bet history', () => {
    render(
      <AppProvider>
        <BetHistory />
      </AppProvider>
    );

    // Initially, no bets should be present
    expect(screen.getByText(/No bets yet/i)).toBeInTheDocument();
  });
});
