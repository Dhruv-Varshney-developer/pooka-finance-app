"use client"

import type React from "react"
import "./styles.scss"

interface CTASectionProps {
  onLaunchApp?: () => void
}

export const CTASection: React.FC<CTASectionProps> = ({ onLaunchApp }) => {
  return (
    <section className="ctaSection">
      <div className="ctaContainer">
        <h2 className="ctaTitle">Ready to Start Trading?</h2>
        <p className="ctaSubtitle">Join thousands of traders on PookaFinance</p>

        {/* CTA Image Placeholder */}
        <div className="ctaImagePlaceholder">
          <span className="imagePlaceholderText">Trading Dashboard Preview</span>
        </div>

        <button className="ctaButton" onClick={onLaunchApp}>
          Launch App
        </button>
      </div>
    </section>
  )
}


