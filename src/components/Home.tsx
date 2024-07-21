import React, { useState } from 'react';
import casino from './images/casino.jpg';
import './Home.css';

const Home: React.FC = () => {
    return (
      <div>
         <h1 className='wellcome-text'>Wellcome to <span className='gold-text'>Online Casino</span></h1>
         <p className='sub-title'>Have fun with different games</p>
         <div className="casino">
            <img className="casino-img" src={casino} alt="Casino Image" />
          </div>
      </div>
    );
  };
  
  export default Home;