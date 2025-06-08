"use client"

import type React from "react"
import "./styles.scss"

interface HeroSectionProps {
  onTradeNow?: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onTradeNow }) => {
  return (
    <section className="heroSection">
      <div className="heroContainer">
        <div className="statusBadge">
          <div className="statusDot"></div>
          Testnet Live
        </div>

        <h1 className="heroTitle">
          Long or Short <span className="fireEmoji">🔥</span> Memes
        </h1>

        <button className="tradeNowButton" onClick={onTradeNow}>
          Trade Now
        </button>

        <div className="curveContainer">
          <svg className="curveSvg" viewBox="0 0 1200 300" fill="none">
            <path
              d="M0 250 Q300 100 600 150 Q900 200 1200 50"
              stroke="#7bf179"
              strokeWidth="3"
              fill="none"
              className="animatedCurve"
            />
          </svg>
          <div className="curveText">
            <span className="curveTextLine1">& Everything</span>
            <span className="curveTextLine2">in Between</span>
          </div>
        </div>
      </div>

      {/* Floating Crypto Icons */}
      <div className="floatingIcons">
        <div className="floatingIcon bitcoin">₿</div>
        <div className="floatingIcon ethereum">Ξ</div>
        <div className="floatingIcon solana">◎</div>
      </div>

      {/* Hero Background Image Placeholder */}
      <div className="heroImagePlaceholder">
        <span className="imagePlaceholderText">Hero Background Image</span>
      </div>
    </section>
  )
}

