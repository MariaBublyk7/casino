import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import logo from './logo.png';
import Home from './components/Home';
import SlotMachine from './components/SlotMachine';  // Correct import statement
import Roulette from './components/Roulette';
import BetHistory from './components/BetHistory';
import Balance from './components/Balance';
import ExchangeRates from './components/ExchangeRates';
import { useAppContext } from './AppContext';

const App: React.FC = () => {
  const { balance, setBalance, addBet } = useAppContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleBet = (amount: number) => {
    setBalance(balance + amount);
  };

  const handleResult = (result: string, win: boolean, betAmount: number) => {
    const formattedDate = new Date().toLocaleString('en-GB', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }).replace(',', '');

    addBet({
      date: formattedDate,
      betAmount,
      game: "Slot Machine", // Adding game name
      result: win ? 'Win' : 'Loss',
      balance: balance + (win ? betAmount : -betAmount),
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="App">
      <Router>
        <div className={menuOpen ? 'menu-open' : ''}>
          <header>
            <div className='container'>
              <nav className='navigation'>
                <div className="menu-container">
                  <div className="logo">
                    <img className="logo-img" src={logo} alt="Logo" />
                  </div>
                  <div className="burger-menu" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <ul className="menu">
                  <li className="menu-item">
                    <Link to="/" onClick={toggleMenu}>Home</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/slot-machine" onClick={toggleMenu}>Slot Machine</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/roulette" onClick={toggleMenu}>Roulette</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/bet-history" onClick={toggleMenu}>History</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/balance" onClick={toggleMenu}>Add Balance</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/exchange-rates" onClick={toggleMenu}>Exchange Rates</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div className="main-casino-content">
            <div className='container'>
              <div className="action-wrapper gradient-border">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/balance" element={<Balance />} />
                  <Route 
                    path="/slot-machine" 
                    element={
                      <SlotMachine 
                        // balance={balance} 
                        // onBet={handleBet} 
                        // onResult={handleResult} 
                      />
                    } 
                  />  
                  <Route path="/roulette" element={<Roulette />} />
                  <Route path="/bet-history" element={<BetHistory />} />
                  <Route path="/exchange-rates" element={<ExchangeRates />} />
                </Routes>
              </div>
            </div>
          </div>
          <footer>
            <div className='container'>
              <div className='footer-wrapper'>
                <div className="logo">
                  <img className="logo-img" src={logo} alt="Logo" />
                </div>
                <div className="copyright-wrapper">
                  <p className="copyright-text">©Copyright Maria Bublyk Test Casino</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
};

export default App;
