"use client"

import type React from "react"
import { useState } from "react"
import "./styles.scss"
import { useBalance } from "wagmi"
import { useWalletStore } from "@/store/walletStore";
import { useShallow } from 'zustand/react/shallow'
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useOpenPosition } from "@/hooks/useOpenPosition"
import { usePerpStore } from "@/store/PerpStore"
const OrderComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Market">("Market");
  const [positionType, setPositionType]=useState<"Long" | "Short">("Long");
  const {
    address
  }=useWalletStore(useShallow((state)=>({
    address:state.userWalletAddress
  })))
  const {
    selectedPerp,
    leverage
  }=usePerpStore(useShallow((state)=>({
    selectedPerp:state.selectedPerp,
    leverage:state.leverage
  })))

  const {data, isLoading}=useBalance({
    address:address as `0x${string}`
  })

  const [collateralAmount, setCollateralAmount] = useState<string>("0")
  const [leverageIndex, setLeverageIndex] = useState<number>(0);

  const leverageOptions = [1,2,3,4,5,6,7,8,9,10,15,20]

  const {
    openPosition
  }=useOpenPosition();

  const handleOpenPosition=()=>{
    const isLong=positionType==="Long";
    try{
      openPosition(
        selectedPerp,
        isLong,
        collateralAmount,
        leverage,
      )
    }catch(err){
      console.log("Error occured",err)
    }
  }

  return (
    <div className="orderComponent">
      <div className="tabContainer">
        <button className={`tab ${activeTab === "Market" ? "activeTab" : ""}`} onClick={() => setActiveTab("Market")}>
          Market
        </button>
        <div className="PositionTab">
          <button
         className={positionType === "Long" ? "active" : ""}
         onClick={() => setPositionType("Long")}
         >
         Long
         </button>
         <button
         className={positionType === "Short" ? "shortActive" : ""}
          onClick={() => setPositionType("Short")}
          >
         Short
         </button>
         </div>
      </div>

      <div className="orderForm">
        <div className="formRow">
          <label className="formLabel">You Pay</label>
          {!isLoading ?<div className="availableBalance">Your Balance : {data?.symbol} {(Number(data?.value)/(10**Number(data?.decimals))).toFixed(4)}</div> : "Fetching Balance"}
        </div>

        <div className="inputContainer">
          <input
            type="text"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
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
        {
  address!==undefined ? (
    <button className="connectWalletButton" onClick={handleOpenPosition}>
      Place Order
    </button>
  ) : (
    <ConnectButton.Custom>
      {({
        openConnectModal,
        account,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        return (
          <button
            className="connectWalletButton"
            onClick={()=>{
              openConnectModal();
              useWalletStore.getState().setUserWalletAddress(account?.address as string)
            }}
            disabled={!ready}
          >
            Connect Wallet
          </button>
        );
      }}
    </ConnectButton.Custom>
  )
}
      </div>
    </div>
  )
}

export default OrderComponent
