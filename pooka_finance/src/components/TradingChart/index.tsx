"use client"
import React, { useState } from 'react';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';
import "./styles.scss"
interface Trade {
  time: string;
  price: number;
  amount: number;
  side: 'buy' | 'sell';
}

const TradingChart = () => {
  const [activeTab, setActiveTab] = useState<'trades' | 'funding' | 'openinterest'>('trades');

  const mockTrades: Trade[] = [
    { time: '14:23:45', price: 1988.43, amount: 0.5234, side: 'buy' },
    { time: '14:23:42', price: 1988.12, amount: 1.2456, side: 'sell' },
    { time: '14:23:38', price: 1987.89, amount: 0.8912, side: 'buy' },
    { time: '14:23:35', price: 1987.56, amount: 2.1234, side: 'sell' },
    { time: '14:23:31', price: 1987.78, amount: 0.6789, side: 'buy' },
  ];

  const mockFunding = [
    { time: '12:00:00', rate: '0.0125%', payment: '+$2.34' },
    { time: '08:00:00', rate: '0.0098%', payment: '+$1.87' },
    { time: '04:00:00', rate: '0.0156%', payment: '+$2.98' },
  ];

  const mockOpenInterest = [
    { time: '14:00', value: '$245.6M', change: '+2.4%' },
    { time: '13:00', value: '$240.1M', change: '+1.2%' },
    { time: '12:00', value: '$237.3M', change: '-0.8%' },
  ];

  return (
    <div className="trading-chart">
      {/* Chart Area */}
      <div className="chart-container">
        <div className="chart-header">
          <div className="chart-title">
            <h3>ETH-PERP</h3>
            <div className="chart-controls">
              <button className="timeframe active">1m</button>
              <button className="timeframe">5m</button>
              <button className="timeframe">15m</button>
              <button className="timeframe">1h</button>
              <button className="timeframe">4h</button>
              <button className="timeframe">1d</button>
            </div>
          </div>
        </div>

        {/* Mock Chart Area */}
        <div className="chart-area">
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>Trading Chart</p>
            <span>Candlestick chart would be integrated here</span>
          </div>
        </div>
      </div>

  
      <div className="chart-tabs">
        <div className="tab-headers">
          <button 
            className={`tab-header ${activeTab === 'trades' ? 'active' : ''}`}
            onClick={() => setActiveTab('trades')}
          >
            <Activity size={16} />
            Recent Trades
          </button>
          <button 
            className={`tab-header ${activeTab === 'funding' ? 'active' : ''}`}
            onClick={() => setActiveTab('funding')}
          >
            <TrendingUp size={16} />
            Funding
          </button>
          <button 
            className={`tab-header ${activeTab === 'openinterest' ? 'active' : ''}`}
            onClick={() => setActiveTab('openinterest')}
          >
            <BarChart3 size={16} />
            Open Interest
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'trades' && (
            <div className="trades-table">
              <div className="table-header">
                <span>Time</span>
                <span>Price</span>
                <span>Amount</span>
                <span>Side</span>
              </div>
              {mockTrades.map((trade, index) => (
                <div key={index} className="table-row">
                  <span className="time">{trade.time}</span>
                  <span className={`price ${trade.side}`}>{trade.price.toFixed(2)}</span>
                  <span className="amount">{trade.amount.toFixed(4)}</span>
                  <span className={`side ${trade.side}`}>
                    {trade.side.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'funding' && (
            <div className="funding-table">
              <div className="table-header">
                <span>Time</span>
                <span>Funding Rate</span>
                <span>Payment</span>
              </div>
              {mockFunding.map((funding, index) => (
                <div key={index} className="table-row">
                  <span className="time">{funding.time}</span>
                  <span className="rate">{funding.rate}</span>
                  <span className="payment positive">{funding.payment}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'openinterest' && (
            <div className="openinterest-table">
              <div className="table-header">
                <span>Time</span>
                <span>Open Interest</span>
                <span>Change</span>
              </div>
              {mockOpenInterest.map((oi, index) => (
                <div key={index} className="table-row">
                  <span className="time">{oi.time}</span>
                  <span className="value">{oi.value}</span>
                  <span className={`change ${oi.change.startsWith('+') ? 'positive' : 'negative'}`}>
                    {oi.change}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingChart;
