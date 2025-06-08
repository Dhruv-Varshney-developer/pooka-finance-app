"use client"

import type React from "react"
import "./styles.scss"

export const SuperAppSection: React.FC = () => {
  return (
    <section className="superAppSection">
      <div className="superAppContainer">
        <div className="superAppContent">
          <h2 className="superAppTitle">
            SuperApp for
            <br />
            Onchain Derivatives
          </h2>
          <p className="superAppSubtitle">Explore Our Suite of Derivative Products</p>

          <div className="superAppImagePlaceholder">
            <span className="imagePlaceholderText">SuperApp Interface Image</span>
          </div>
        </div>

        <div className="flashDuelsCard">
          <div className="flashDuelsIcon">⚡</div>
          <h3 className="flashDuelsTitle">Flash Duels</h3>
          <p className="flashDuelsDesc">Create and trade anything with a time-based binary options market.</p>

          <div className="flashDuelsImagePlaceholder">
            <span className="imagePlaceholderText">Flash Duels Preview</span>
          </div>
        </div>
      </div>
    </section>
  )
}


