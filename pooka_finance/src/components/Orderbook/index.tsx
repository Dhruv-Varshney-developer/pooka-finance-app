"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"

interface OrderbookEntry {
  price: number
  size: number
  total: number
}


export const OrderbookComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Orderbook" | "Trades">("Orderbook");
  const [selectedCurrency, setSelectedCurrency] = useState("BTC")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // Sample orderbook data

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency)
    setIsDropdownOpen(false)
  }

  const asks: OrderbookEntry[] = [
    { price: 106250.0, size: 0.0, total: 0.21 },
    { price: 106000.0, size: 0.0, total: 0.21 },
    { price: 105750.0, size: 0.0, total: 0.21 },
    { price: 105500.0, size: 0.01, total: 0.21 },
    { price: 105250.0, size: 0.0, total: 0.21 },
    { price: 105000.0, size: 0.0, total: 0.21 },
    { price: 104385.75, size: 0.21, total: 0.21 },
  ]

  const bids: OrderbookEntry[] = [
    { price: 104375.32, size: 0.0, total: 0.21 },
    { price: 104364.88, size: 0.15, total: 0.15 },
    { price: 104354.44, size: 0.2, total: 0.35 },
    { price: 104333.56, size: 0.4, total: 0.75 },
    { price: 104323.13, size: 0.56, total: 1.31 },
    { price: 104312.69, size: 0.54, total: 1.84 },
  ]

  const currentPrice = 104375.32
  const spread = 0.002
  const spreadPercentage = 94


  const currencies:string[]=['USDC', 'BTC', 'EIGEN', 'USDT', "ETH"]

  return (
    <div className="orderbookComponent">
      <div className="orderbookHeader">
        <div className="orderBookTabs">
          <button
            className={`tab ${activeTab === "Orderbook" ? "activeTab" : ""}`}
            onClick={() => setActiveTab("Orderbook")}
          >
            Orderbook
          </button>
          <button className={`tab ${activeTab === "Trades" ? "activeTab" : ""}`} onClick={() => setActiveTab("Trades")}>
            Trades
          </button>
        </div>

        <div className="symbolSelector">
        <div className="custom-select">
            <button className="select-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span className="selected-value">{selectedCurrency}</span>
              <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>▼</span>
            </button>

            {isDropdownOpen && (
              <div className="select-dropdown">
                {currencies.map((currency: string, index: number) => (
                  <button
                    key={index}
                    className={`select-option ${selectedCurrency === currency ? "selected" : ""}`}
                    onClick={() => handleCurrencySelect(currency)}
                  >
                    {currency}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="orderbookContent">
        <div className="orderbookHeaders">
          <div className="headerRow">
            <span className="priceHeader">Price</span>
            <span className="sizeHeader">Size</span>
            <span className="totalHeader">Total</span>
          </div>
        </div>

        <div className="asksSection">
          {asks.map((ask, index) => (
            <div key={index} className="orderRow askRow">
              <span className="price askPrice">{ask.price.toFixed(2)}</span>
              <span className="size">{ask.size.toFixed(2)}</span>
              <span className="total">{ask.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="spreadSection">
          <div className="currentPrice">
            <span className="priceValue">{currentPrice.toFixed(2)}</span>
            <span className="spreadIndicator">
              <span className="spreadArrow">↗</span>
              Spread = {spread.toFixed(4)}%
            </span>
          </div>
        </div>

        <div className="bidsSection">
          {bids.map((bid, index) => (
            <div key={index} className="orderRow bidRow">
              <span className="price bidPrice">{bid.price.toFixed(2)}</span>
              <span className="size">{bid.size.toFixed(2)}</span>
              <span className="total">{bid.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="orderbookFooter">
          <div className="spreadStats">
            <span className="spreadBadge bidBadge">{spreadPercentage}%</span>
            <span className="spreadBadge askBadge">6%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

