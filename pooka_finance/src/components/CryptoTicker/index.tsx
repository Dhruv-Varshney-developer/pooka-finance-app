"use client"

import type React from "react"

import { useState, useEffect } from "react"
import "./styles.scss"
import { BTC_TOKEN, ETH_TOKEN, SOL_TOKEN, DOGE_TOKEN } from "@/utils/constants"
import Image from "next/image"
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
      icon: BTC_TOKEN,
      price: 104376.26,
      change24h: -0.36,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      icon: ETH_TOKEN,
      price: 3245.18,
      change24h: 1.24,
    },
    {
      id: "solana",
      name: "Solana",
      symbol: "SOL",
      icon: SOL_TOKEN,
      price: 187.92,
      change24h: 3.56,
    },
    {
      id: "dogecoin",
      name: "Dogecoin",
      symbol: "DOGE",
      icon: DOGE_TOKEN,
      price: 0.1824,
      change24h: -1.12,
    }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTokens((currentTokens) =>
        currentTokens.map((token) => {
          const priceChange = token.price * (Math.random() * 0.01 - 0.005)
          const newPrice = token.price + priceChange
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

  const formatPrice = (price: number) => {
    if (price < 0.0001) return price.toFixed(8)
    if (price < 0.01) return price.toFixed(6)
    if (price < 1) return price.toFixed(4)
    if (price < 10) return price.toFixed(2)
    return price.toLocaleString(undefined, { maximumFractionDigits: 2 })
  }

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
                <Image height={35} width={35} src={token.icon} className="tokenSymbol" alt="token"/>
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

