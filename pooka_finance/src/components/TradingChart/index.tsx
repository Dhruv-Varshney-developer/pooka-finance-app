/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';
import './styles.scss';
import { BTC_DUMMY_DATA } from '../Data/btc';


export const TradingChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  const currentLocale = window.navigator.languages[0];

 const myPriceFormatter = Intl.NumberFormat(currentLocale, {
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
    candleStickSeries.setData(BTC_DUMMY_DATA);
    chartRef.current.timeScale().fitContent();


  
    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);


  return (
    <div className="candlestickChartWrapper">
      <div ref={chartContainerRef} className="chart" />
    </div>
  );
};
