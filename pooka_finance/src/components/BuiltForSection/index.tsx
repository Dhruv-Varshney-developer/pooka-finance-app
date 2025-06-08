"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"

export const BuiltForSection: React.FC = () => {
  const [isExpert, setIsExpert] = useState(false)

  return (
    <section className="builtForSection">
      <h2 className="builtForTitle">
        Built for <span className="highlightText">You</span>
      </h2>

      <div className="experienceToggle">
        <span className={`toggleLabel ${!isExpert ? "active" : ""}`}>Beginners</span>
        <div className="toggleSwitch" onClick={() => setIsExpert(!isExpert)}>
          <div className={`toggleSlider ${isExpert ? "expert" : "beginner"}`}></div>
        </div>
        <span className={`toggleLabel ${isExpert ? "active" : ""}`}>Experts</span>
      </div>

      <div className="featuresGrid">
        <div className="featureCard">
          <div className="featureImagePlaceholder">
            <span className="imagePlaceholderText">One Click Icon</span>
          </div>
          <h3 className="featureTitle">One Click Trading</h3>
          <p className="featureDesc">Execute trades instantly with our streamlined interface</p>
        </div>

        <div className="featureCard">
          <div className="featureImagePlaceholder">
            <span className="imagePlaceholderText">Lightning Icon</span>
          </div>
          <h3 className="featureTitle">Lightning Fast</h3>
          <p className="featureDesc">Execute Trades Instantly With Our Advanced Infrastructure</p>
        </div>

        <div className="featureCard">
          <div className="featureImagePlaceholder">
            <span className="imagePlaceholderText">Advanced Orders Icon</span>
          </div>
          <h3 className="featureTitle">Advanced Order Types</h3>
          <p className="featureDesc">Create Advanced Orders Like TP and SL to Manage Your Risk Efficiently</p>
        </div>
      </div>
    </section>
  )
}

