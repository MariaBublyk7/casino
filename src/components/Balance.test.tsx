import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Balance from './Balance';
import { AppProvider } from '../AppContext';

describe('Balance Component', () => {
  it('should display and update balance', () => {
    render(
      <AppProvider>
        <Balance />
      </AppProvider>
    );

    expect(screen.getByText(/Current Balance: \$100/i)).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText(/Enter amount to add/i), { target: { value: '50' } });
    fireEvent.click(screen.getByText(/Add Balance/i));
    expect(screen.getByText(/Current Balance: \$150/i)).toBeInTheDocument();
  });
});
