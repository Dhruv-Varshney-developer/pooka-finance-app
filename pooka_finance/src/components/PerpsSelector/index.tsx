"use client"
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import "./styles.scss"


interface Market {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: string;
}

const PerpetualSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMarket, setSelectedMarket] = useState<Market>({
    symbol: 'ETH-PERP',
    name: 'Ethereum Perpetual',
    price: 1988.43,
    change24h: 2.65,
    volume24h: '1.2B'
  });

  const markets: Market[] = [
    { symbol: 'ETH-PERP', name: 'Ethereum Perpetual', price: 1988.43, change24h: 2.65, volume24h: '1.2B' },
    { symbol: 'BTC-PERP', name: 'Bitcoin Perpetual', price: 42150.30, change24h: -1.23, volume24h: '2.8B' },
    { symbol: 'SOL-PERP', name: 'Solana Perpetual', price: 98.76, change24h: 5.42, volume24h: '450M' },
    { symbol: 'AVAX-PERP', name: 'Avalanche Perpetual', price: 35.82, change24h: 3.18, volume24h: '320M' },
    { symbol: 'MATIC-PERP', name: 'Polygon Perpetual', price: 0.85, change24h: -2.45, volume24h: '180M' },
  ];

  const filteredMarkets = markets.filter(market =>
    market.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    market.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="perpetual-selector">
      <button 
        className="selector-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="selected-market">
          <div className="market-info">
            <span className="market-symbol">{selectedMarket.symbol}</span>
            <span className="market-price">${selectedMarket.price.toLocaleString()}</span>
          </div>
          <div className="market-change">
            <span className={`change ${selectedMarket.change24h >= 0 ? 'positive' : 'negative'}`}>
              {selectedMarket.change24h >= 0 ? '+' : ''}{selectedMarket.change24h}%
            </span>
          </div>
        </div>
        <ChevronDown size={16} className={`chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="selector-dropdown">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="markets-list">
            {filteredMarkets.map((market) => (
              <div
                key={market.symbol}
                className="market-item"
                onClick={() => handleMarketSelect(market)}
              >
                <div className="market-main">
                  <span className="market-symbol">{market.symbol}</span>
                  <span className="market-name">{market.name}</span>
                </div>
                <div className="market-stats">
                  <span className="market-price">${market.price.toLocaleString()}</span>
                  <span className={`market-change ${market.change24h >= 0 ? 'positive' : 'negative'}`}>
                    {market.change24h >= 0 ? '+' : ''}{market.change24h}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PerpetualSelector;