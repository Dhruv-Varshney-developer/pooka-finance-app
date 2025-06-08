"use client"

import type React from "react"

import { useState, useEffect } from "react"
import "./styles.scss"

interface CryptoToken {
  id: string
  name: string
  symbol: string
  icon: string
  price: number
  change24h: number
}

export const CryptoTicker: React.FC = () => {
  const [tokens, setTokens] = useState<CryptoToken[]>([
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      price: 104376.26,
      change24h: -0.36,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      price: 3245.18,
      change24h: 1.24,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      icon: "◎",
      price: 187.92,
      change24h: 3.56,
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      icon: "Ð",
      price: 0.1824,
      change24h: -1.12,
    },
    {
      id: "shiba-inu",
      name: "Shiba Inu",
      symbol: "SHIB",
      icon: "🐕",
      price: 0.000028,
      change24h: 2.45,
    },
    {
      id: "pepe",
      name: "Pepe",
      symbol: "PEPE",
      icon: "🐸",
      price: 0.000012,
      change24h: 5.67,
    },
  ])

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((currentTokens) =>
        currentTokens.map((token) => {
          // Random price change between -0.5% and +0.5%
          const priceChange = token.price * (Math.random() * 0.01 - 0.005)
          const newPrice = token.price + priceChange

          // Random change in 24h percentage
          const changeShift = Math.random() * 0.2 - 0.1
          const newChange = token.change24h + changeShift

          return {
            ...token,
            price: newPrice,
            change24h: newChange,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Format price based on its magnitude
  const formatPrice = (price: number) => {
    if (price < 0.0001) return price.toFixed(8)
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(2)
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

  // Duplicate tokens for seamless infinite scroll
  const allTokens = [...tokens, ...tokens, ...tokens]

  return (
    <section className="cryptoTickerSection">
      <div className="tickerContainer">
        <h2 className="tickerTitle">Trade Now</h2>

        <div className="tickerWrapper">
          <div className="ticker">
            {allTokens.map((token, index) => (
              <div key={`${token.id}-${index}`} className="tokenCard">
                <div className="tokenIconWrapper">
                  <span className="tokenIcon">{token.icon}</span>
                </div>
                <div className="tokenInfo">
                  <div className="tokenNameRow">
                    <span className="tokenName">{token.name}</span>
                    <span className="tokenSymbol">{token.symbol}</span>
                  </div>
                  <div className="tokenPriceRow">
                    <span className="tokenPrice">${formatPrice(token.price)}</span>
                    <span className={`tokenChange ${token.change24h >= 0 ? "positive" : "negative"}`}>
                      {token.change24h >= 0 ? "+" : ""}
                      {token.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

