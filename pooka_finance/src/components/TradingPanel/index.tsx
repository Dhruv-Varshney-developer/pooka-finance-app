"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Settings } from 'lucide-react';
import "./styles.scss";

interface Position {
  id: string;
  market: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  leverage: number;
}

const TradingPanel = () => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [amount, setAmount] = useState('');
  const [leverage, setLeverage] = useState(10);
  const [limitPrice, setLimitPrice] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  const mockPositions: Position[] = [
    {
      id: '1',
      market: 'ETH-PERP',
      side: 'long',
      size: 2.5,
      entryPrice: 1850.00,
      markPrice: 1988.43,
      pnl: 346.08,
      leverage: 10
    },
    {
      id: '2',
      market: 'BTC-PERP',
      side: 'short',
      size: 0.1,
      entryPrice: 43200.00,
      markPrice: 42150.30,
      pnl: 104.97,
      leverage: 5
    }
  ];

  const calculateLiquidationPrice = () => {
    const entryPrice = 1988.43;
    const liqPrice = side === 'buy' 
      ? entryPrice * (1 - 0.9 / leverage)
      : entryPrice * (1 + 0.9 / leverage);
    return liqPrice.toFixed(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { side, orderType, amount, leverage });
  };

  return (
    <div className="trading-panel">
      {/* Order Form */}
      <div className="order-form">
        <div className="panel-header">
          <h3>Place Order</h3>
          <button 
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Buy/Sell Toggle */}
        <div className="side-toggle">
          <button 
            className={`side-btn buy ${side === 'buy' ? 'active' : ''}`}
            onClick={() => setSide('buy')}
          >
            <TrendingUp size={16} />
            Long
          </button>
          <button 
            className={`side-btn sell ${side === 'sell' ? 'active' : ''}`}
            onClick={() => setSide('sell')}
          >
            <TrendingDown size={16} />
            Short
          </button>
        </div>

        {/* Order Type */}
        <div className="order-type">
          <select 
            value={orderType}
            onChange={(e) => setOrderType(e.target.value as 'market' | 'limit')}
            className="order-type-select"
          >
            <option value="market">Market Order</option>
            <option value="limit">Limit Order</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="order-inputs">
          {/* Limit Price (only for limit orders) */}
          {orderType === 'limit' && (
            <div className="input-group">
              <label>Limit Price (USDC)</label>
              <input
                type="number"
                value={limitPrice}
                onChange={(e) => setLimitPrice(e.target.value)}
                placeholder="1988.43"
                className="input"
              />
            </div>
          )}

          {/* Amount */}
          <div className="input-group">
            <label>Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="input"
              required
            />
          </div>

          {/* Leverage Slider */}
          <div className="input-group">
            <label>Leverage: {leverage}x</label>
            <div className="leverage-slider">
              <input
                type="range"
                min="1"
                max="50"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="slider"
              />
              <div className="leverage-marks">
                <span>1x</span>
                <span>10x</span>
                <span>25x</span>
                <span>50x</span>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <div className="advanced-options">
              <div className="input-group">
                <label>Take Profit (USDC)</label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                  placeholder="Optional"
                  className="input"
                />
              </div>
              <div className="input-group">
                <label>Stop Loss (USDC)</label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  placeholder="Optional"
                  className="input"
                />
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-row">
              <span>Est. Liquidation:</span>
              <span className="danger">${calculateLiquidationPrice()}</span>
            </div>
            {amount && (
              <div className="summary-row">
                <span>Position Size:</span>
                <span>{(Number(amount) / 1988.43).toFixed(4)} ETH</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`btn submit-btn ${side === 'buy' ? 'btn-success' : 'btn-danger'}`}
          >
            {side === 'buy' ? 'Open Long Position' : 'Open Short Position'}
          </button>
        </form>
      </div>

      {/* Open Positions */}
      <div className="positions-section">
        <h3>Open Positions</h3>
        <div className="positions-list">
          {mockPositions.map((position) => (
            <div key={position.id} className="position-card">
              <div className="position-header">
                <span className="market">{position.market}</span>
                <span className={`side ${position.side}`}>
                  {position.side.toUpperCase()} {position.leverage}x
                </span>
              </div>
              <div className="position-details">
                <div className="detail-row">
                  <span>Size:</span>
                  <span>{position.size} ETH</span>
                </div>
                <div className="detail-row">
                  <span>Entry:</span>
                  <span>${position.entryPrice.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span>Mark:</span>
                  <span>${position.markPrice.toFixed(2)}</span>
                </div>
                <div className="detail-row">
                  <span>PnL:</span>
                  <span className={position.pnl >= 0 ? 'positive' : 'negative'}>
                    {position.pnl >= 0 ? '+' : ''}${position.pnl.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingPanel;