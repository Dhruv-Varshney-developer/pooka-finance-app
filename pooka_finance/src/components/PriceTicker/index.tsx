"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "./styles.scss"

interface TickerItem {
  symbol: string
  price: number
  change: number
  changePercent: number
}

export const PriceTickerComponent: React.FC = () => {
  const [tickerData] = useState<TickerItem[]>([
    { symbol: "NEIRO", price: 0.000443, change: -0.000006, changePercent: -1.33 },
    { symbol: "kPEPE", price: 0.01174, change: 0.001234, changePercent: 10.26 },
    { symbol: "KSHIB", price: 0.01267, change: -0.000084, changePercent: -0.62 },
    { symbol: "FARTCOIN", price: 1.0587, change: -0.0301, changePercent: -2.83 },
    { symbol: "MOODENG", price: 0.19294, change: -0.01256, changePercent: -6.11 },
    { symbol: "GIGA", price: 0.021234, change: -0.001123, changePercent: -5.01 },
    { symbol: "kBONK", price: 0.03167, change: 0.002145, changePercent: 7.26 },
    { symbol: "DOGE", price: 0.38472, change: 0.01234, changePercent: 3.32 },
    { symbol: "SHIB", price: 0.000024, change: -0.000001, changePercent: -4.17 },
    { symbol: "PEPE", price: 0.000019, change: 0.000002, changePercent: 11.76 },
    { symbol: "WIF", price: 2.1847, change: -0.0923, changePercent: -4.05 },
    { symbol: "BONK", price: 0.000041, change: 0.000003, changePercent: 7.89 },
  ])

  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(false)
      setTimeout(() => setIsAnimating(true), 50)
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number): string => {
    if (price < 0.001) {
      return price.toFixed(6)
    } else if (price < 1) {
      return price.toFixed(4)
    } else {
      return price.toFixed(2)
    }
  }

  const formatChange = (change: number): string => {
    const formatted = change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2)
    return `${formatted}%`
  }

  return (
    <div className="priceTicker">
      <div className={`tickerContent ${isAnimating ? "animate" : ""}`}>
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="tickerItem">
            <span className="tickerSymbol">{item.symbol}</span>
            <span className="tickerPrice">${formatPrice(item.price)}</span>
            <span className={`tickerChange ${item.changePercent >= 0 ? "positive" : "negative"}`}>
              {formatChange(item.changePercent)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

