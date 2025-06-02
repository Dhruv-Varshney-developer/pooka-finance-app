"use client"
import React, { useState, useEffect } from 'react';
import "./styles.scss"

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

const OrderBook = () => {
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);

  // Mock data generation
  useEffect(() => {
    const generateOrderBook = () => {
      const basePrice = 1988.43;
      const newAsks: OrderBookEntry[] = [];
      const newBids: OrderBookEntry[] = [];

      // Generate asks (sell orders)
      for (let i = 0; i < 8; i++) {
        const price = basePrice + (i + 1) * 0.5;
        const quantity = Math.random() * 10 + 1;
        const total = price * quantity;
        newAsks.push({ price, quantity, total });
      }

      // Generate bids (buy orders)
      for (let i = 0; i < 8; i++) {
        const price = basePrice - (i + 1) * 0.5;
        const quantity = Math.random() * 10 + 1;
        const total = price * quantity;
        newBids.push({ price, quantity, total });
      }

      setAsks(newAsks);
      setBids(newBids);
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toLocaleString(undefined, { 
      minimumFractionDigits: decimals, 
      maximumFractionDigits: decimals 
    });
  };

  return (
    <div className="orderbook">
      <div className="orderbook-header">
        <h3>Order Book</h3>
        <div className="spread">
          <span>Spread: $0.05 (0.003%)</span>
        </div>
      </div>

      <div className="orderbook-content">
        {/* Headers */}
        <div className="orderbook-headers">
          <span>Price (USDC)</span>
          <span>Amount (ETH)</span>
          <span>Total</span>
        </div>

        {/* Asks (Sell Orders) */}
        <div className="orderbook-section asks">
          {asks.map((ask, index) => (
            <div key={`ask-${index}`} className="orderbook-row ask-row">
              <span className="price ask-price">{formatNumber(ask.price)}</span>
              <span className="quantity">{formatNumber(ask.quantity, 4)}</span>
              <span className="total">{formatNumber(ask.total)}</span>
              <div 
                className="depth-bar ask-depth" 
                style={{ width: `${(ask.quantity / 15) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Current Price */}
        <div className="current-price">
          <span className="price-label">Last Price</span>
          <span className="price-value">$1,988.43</span>
          <span className="price-change positive">+2.65%</span>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="orderbook-section bids">
          {bids.map((bid, index) => (
            <div key={`bid-${index}`} className="orderbook-row bid-row">
              <span className="price bid-price">{formatNumber(bid.price)}</span>
              <span className="quantity">{formatNumber(bid.quantity, 4)}</span>
              <span className="total">{formatNumber(bid.total)}</span>
              <div 
                className="depth-bar bid-depth" 
                style={{ width: `${(bid.quantity / 15) * 100}%` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderBook;