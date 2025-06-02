import React from 'react';
import Navbar from '../components/Navbar';
import PerpetualSelector from '@/components/PerpsSelector';
import OrderBook from '@/components/Orderbook';
import TradingChart from '../components/TradingChart';
import TradingPanel from '../components/TradingPanel';
import "./global.css"
import "./styles.scss"
const Index = () => {
  return (
    <div className="trading-app">
      <Navbar />
      
      <main className="trading-layout">
        {/* Left Column */}
        <div className="left-column">
          <PerpetualSelector />
          <OrderBook />
        </div>

        {/* Center Column */}
        <div className="center-column">
          <TradingChart />
        </div>

        {/* Right Column */}
        <div className="right-column">
          <TradingPanel />
        </div>
      </main>
    </div>
  );
};

export default Index;