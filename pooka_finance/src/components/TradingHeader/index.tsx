/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import "./styles.scss"
import { MARKET_SYMBOLS } from "@/utils/constants"
import { usePerpStore } from "@/store/PerpStore"
import Image from "next/image"

// interface TradingHeaderProps {
//   symbol?: string
//   baseAsset?: string
//   quoteAsset?: string
//   currentPrice?: number
//   priceChange?: number
//   priceChangePercent?: number
//   high24h?: number
//   low24h?: number
//   funding1h?: number
//   reqMaintenance?: number
// }

const markets = [
  { symbol: 'ETH/USD', name: 'Ethereum Perpetual', logo:"/assets/eth.svg"},
  { symbol: 'BTC/USD', name: 'Bitcoin Perpetual', logo:"/assets/btc.svg"},
];

interface Market {
  symbol: string;
  name: string;
  logo: string;
}

export const TradingHeader = ({
  symbol = "BTC/USD",
  baseAsset = "BTC",
  quoteAsset = "USD",
  currentPrice = 104376.26,
  priceChange = -374.74,
  priceChangePercent = -0.36,
  high24h = 106109.0,
  low24h = 103700.0,
  funding1h = 0.0028,
  reqMaintenance = 2.0,
}) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectedMarket, setSelectedMarket] = useState<Market>(markets[1]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isPositive = priceChange >= 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (market: Market) => {
    setSelectedMarket(market);
    usePerpStore.getState().setSelectedPerp(market.name);
    setShowDropDown(false);
  };

  const toggleDropdown = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <div className="tradingHeader">
      <div className="priceSection">
        <div className="symbolContainer" ref={dropdownRef}>
          <div className="symbolIcon">
            <Image height={30} width={30} src={selectedMarket.logo} alt="image" className="mt-2"/>
            </div>
          <div className="symbolInfo" onClick={toggleDropdown}>
            <span className="symbolText">{selectedMarket.symbol}</span>
            <div className={`symbolDropdown ${showDropDown ? 'open' : ''}`}>▼</div>
          </div>
          
          {showDropDown && (
            <div className="dropdownMenu">
              {markets.map((market) => (
                <div
                  key={market.symbol}
                  className={`dropdownItem ${selectedMarket.symbol === market.symbol ? 'selected' : ''}`}
                  onClick={() => handleSelect(market)}
                >
                   <span className="marketName">{market.name}</span>
                  <span className="marketSymbol">{market.symbol}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="priceInfo">
          <div className="currentPrice">${currentPrice.toLocaleString()}</div>
          <div className={`priceChange ${isPositive ? "positive" : "negative"}`}>
            {isPositive ? "+" : ""}
            {priceChangePercent}%
          </div>
        </div>
      </div>

      <div className="statsSection">
        <div className="statItem">
          <span className="statLabel">24H High</span>
          <span className="statValue">${high24h.toLocaleString()}</span>
        </div>
        <div className="statItem">
          <span className="statLabel">24H Low</span>
          <span className="statValue">${low24h.toLocaleString()}</span>
        </div>
        <div className="statItem">
          <span className="statLabel">1H Funding</span>
          <span className="statValue funding">{funding1h.toFixed(4)}%</span>
        </div>
        <div className="statItem">
          <span className="statLabel">Req. Maintenance</span>
          <span className="statValue">{reqMaintenance.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  )
}