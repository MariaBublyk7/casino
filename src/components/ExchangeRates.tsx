import React, { useState, useEffect } from 'react';
import './ExchangeRates.css';

const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setRates(data.rates);
        setLoading(false);
      } catch (err) {
        const errorMessage = (err as Error).message;
        setError(errorMessage);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) return <p>Loading exchange rates...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="exchange-rates-container">
      <h2>Exchange Rates</h2>
      <table className="exchange-rates-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRates;
