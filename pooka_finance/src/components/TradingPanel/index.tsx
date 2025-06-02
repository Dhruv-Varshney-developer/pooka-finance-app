"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"

interface OrderComponentProps {
  onConnectWallet?: () => void
  isWalletConnected?: boolean
}

const OrderComponent: React.FC<OrderComponentProps> = ({ onConnectWallet, isWalletConnected = false }) => {
  const [activeTab, setActiveTab] = useState<"Market" | "Limit">("Market")
  const [youPay, setYouPay] = useState("0")
  const [leverageIndex, setLeverageIndex] = useState(0)

  const leverageOptions = [1, 2, 5, 10, 20]

  return (
    <div className="orderComponent">
      <div className="tabContainer">
        <button className={`tab ${activeTab === "Market" ? "activeTab" : ""}`} onClick={() => setActiveTab("Market")}>
          Market
        </button>
        <button className={`tab ${activeTab === "Limit" ? "activeTab" : ""}`} onClick={() => setActiveTab("Limit")}>
          Limit
        </button>
      </div>

      <div className="orderForm">
        <div className="formRow">
          <label className="formLabel">You Pay</label>
          <div className="availableBalance">Avbl: $0.00</div>
        </div>

        <div className="inputContainer">
          <input
            type="text"
            value={youPay}
            onChange={(e) => setYouPay(e.target.value)}
            className="orderInput"
            placeholder="0"
          />
          <button className="maxButton">
            MAX <span className="maxIcon">$</span>
          </button>
        </div>

        <div className="leverageSection">
          <label className="formLabel">Select Leverage upto 20X</label>
          <div className="leverageContainer">
            <div className="leverageProgressBar">
              <div className="leverageProgressLine"></div>
              <div
                className="leverageProgressFill"
                style={{ width: `${(leverageIndex / (leverageOptions.length - 1)) * 100}%` }}
              ></div>
              {leverageOptions.map((option, index) => (
                <div
                  key={option}
                  className={`leverageDot ${index === leverageIndex ? "active" : ""} ${index <= leverageIndex ? "filled" : ""}`}
                  onClick={() => setLeverageIndex(index)}
                />
              ))}
            </div>
            <div className="leverageLabels">
              {leverageOptions.map((option, index) => (
                <span
                  key={option}
                  className={`leverageLabel ${index === leverageIndex ? "active" : ""}`}
                  onClick={() => setLeverageIndex(index)}
                >
                  {option}x
                </span>
              ))}
            </div>
            <div className="selectedLeverage">{leverageOptions[leverageIndex]}x</div>
          </div>
        </div>

        <div className="orderDetails">
          <div className="detailRow">
            <span className="detailLabel">Est. Position Size</span>
            <span className="detailValue">--</span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Liq. Price</span>
            <span className="detailValue">--</span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Max. Slippage</span>
            <span className="detailValue">0.08%</span>
          </div>
          <div className="detailRow">
            <span className="detailLabel">Trading Fee</span>
            <span className="detailValue">--</span>
          </div>
        </div>

        <button className="connectWalletButton" onClick={onConnectWallet}>
          {isWalletConnected ? "Place Order" : "Connect Wallet"}
        </button>
      </div>
    </div>
  )
}

export default OrderComponent
