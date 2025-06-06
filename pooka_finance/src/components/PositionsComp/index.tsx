"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"
import { useWalletStore } from "@/store/walletStore"
import { useShallow } from "zustand/react/shallow"



export const PositionsComponent = () => {
  const [activeTab, setActiveTab] = useState<"Positions" | "Orders" | "Trade History" | "Funding History">("Positions")
  const {
    address
  }=useWalletStore(useShallow((state)=>({
    address:state.userWalletAddress
  })))
  const tabs = [
    { key: "Positions", label: "Positions" },
    { key: "Orders", label: "Orders" },
    { key: "Trade History", label: "Trade History" },
    { key: "Funding History", label: "Funding History" },
  ] as const

  const renderTabContent = () => {
    if (!address) {
      return (
        <div className="emptyState">
          <span className="emptyStateText">Connect wallet to view {activeTab.toLowerCase()}</span>
        </div>
      )
    }

    // When wallet is connected, you can show actual data here
    switch (activeTab) {
      case "Positions":
        return (
          <div className="emptyState">
            <span className="emptyStateText">No open positions</span>
          </div>
        )
      case "Orders":
        return (
          <div className="emptyState">
            <span className="emptyStateText">No open orders</span>
          </div>
        )
      case "Trade History":
        return (
          <div className="emptyState">
            <span className="emptyStateText">No trade history</span>
          </div>
        )
      case "Funding History":
        return (
          <div className="emptyState">
            <span className="emptyStateText">No funding history</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="positionsComponent">
      <div className="tabsContainer">
        <div className="tabsList">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`tabButton ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="tabContent">{renderTabContent()}</div>
    </div>
  )
}


