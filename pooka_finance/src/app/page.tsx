/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navbar } from "@/components/Navbar";
import PerpetualSelector from "@/components/PerpsSelector";
import { TradingChart } from "@/components/TradingChart";
import TradingPanel from "../components/TradingPanel";
import TradingHeader from "@/components/TradingHeader";
import { PriceTickerComponent } from "@/components/PriceTicker";
import { AgentChat } from "../components/AIAgent";
import "./global.css";
import "./styles.scss";
import { PositionsComponent } from "@/components/PositionsComp";
const Index = () => {
  return (
    <div className="tradingAppWrapper">
      <Navbar />
      <div className="tradingLayoutWrapper">
        <TradingHeader />
        <div className="MidComponentWrapper">
          <TradingChart />
          <div className="OrderPlacingColumn">
            <TradingPanel />
            {/* <AgentChat /> */}
          </div>
        </div>
        <PositionsComponent/>
      </div>
      <PriceTickerComponent />
    </div>
  );
};

export default Index;
