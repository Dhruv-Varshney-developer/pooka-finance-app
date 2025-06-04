/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Navbar } from "@/components/Navbar";
import PerpetualSelector from "@/components/PerpsSelector";
import { TradingChart } from "@/components/TradingChart";
import TradingPanel from "../components/TradingPanel";
import TradingHeader from "@/components/TradingHeader";
import { PriceTickerComponent } from "@/components/PriceTicker";
import "./global.css";
import "./styles.scss";
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
          </div>
        </div>
      </div>
      <PriceTickerComponent />
    </div>
  );
};

export default Index;
