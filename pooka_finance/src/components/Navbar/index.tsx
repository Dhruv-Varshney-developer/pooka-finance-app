"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export const Navbar=() => {
  const [activeNav, setActiveNav] = useState("Dashboard")

  const navItems = ["Dashboard", "Markets", "Portfolio", "Leaderboard"]

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left: Logo */}
        <div className="navbar-brand">
          <div className="logo">
            <div className="logo-icon"></div>
            <span className="logo-text">PookaFinance</span>
          </div>
        </div>

        {/* Center: Navigation */}
        <div className="navbar-nav">
          {navItems.map((item) => (
            <button
              key={item}
              className={`nav-link ${activeNav === item ? "active" : ""}`}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="navbar-actions">
          <div className="navbar-actions">       
            <ConnectButton/>
            </div>
        </div>
      </div>
    </nav>
  )
}

