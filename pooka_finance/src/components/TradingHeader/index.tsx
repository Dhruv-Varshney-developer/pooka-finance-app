/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"
import PerpetualSelector from "../PerpsSelector"
interface TradingHeaderProps {
  symbol?: string
  baseAsset?: string
  quoteAsset?: string
  currentPrice?: number
  priceChange?: number
  priceChangePercent?: number
  high24h?: number
  low24h?: number
  funding1h?: number
  reqMaintenance?: number
}

const TradingHeader: React.FC<TradingHeaderProps> = ({
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
  const [activeOrderTab, setActiveOrderTab] = useState<"Market" | "Limit">("Market")

  const isPositive = priceChange >= 0

  return (
    <div className="tradingHeader">
      <div className="priceSection">
        <div className="symbolContainer">
          <div className="symbolIcon">₿</div>
          <div className="symbolInfo">
            <span className="symbolText">{symbol}</span>
            <div className="symbolDropdown">▼</div>
          </div>
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

export default TradingHeader
