/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useRef, useState } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import './styles.scss';
import axios from 'axios';
import { OHLC_DATA } from '@/store/types/types';


export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [ohlcData, setOhlcData]=useState<OHLC_DATA[]>([]);
 
 const myPriceFormatter = Intl.NumberFormat("US", {
    style: 'currency',
    currency: 'USD', 
}).format;

  useEffect(() => {
    if (!chartContainerRef.current) return;


    chartRef.current = createChart(chartContainerRef.current, {
        layout: {
            background: { color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
        height:400,
        width:600,
        localization:{
          priceFormatter:myPriceFormatter
        }
    }
    );

    chartRef.current.priceScale('right').applyOptions({
      borderColor: '#71649C',
      autoScale : false,
      barSpacing:20
  });
  
  chartRef.current.timeScale().applyOptions({
      borderColor: '#71649C',
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
    },
  });
 
    const candleStickSeries = chartRef.current.addSeries(CandlestickSeries, { upColor: '#26a69a', downColor: '#ef5350', borderVisible:true, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
    candleStickSeries.setData(ohlcData);
    chartRef.current.timeScale().fitContent();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [ohlcData]);


  useEffect(()=>{
    const fetchOHLCData = async () => {
      try {
        const res = await axios.get("/api/OHLCData");
        const data = await res.data;
        console.log("OHLC Data:", data.data);
        setOhlcData(data.data)
      } catch (err) {
        console.error("Failed to fetch OHLC data:", err);
      }
    };
    fetchOHLCData();
  },[])


  return (
    <div className="candlestickChartWrapper">
      <div ref={chartContainerRef} className="chart" />
    </div>
  );
};
