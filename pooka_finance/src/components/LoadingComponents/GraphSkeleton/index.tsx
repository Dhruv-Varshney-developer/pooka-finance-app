import React from 'react';
import './styles.scss';

interface TradingChartSkeletonProps {
  width?: string;
  height?: string;
  showControls?: boolean;
  showPriceLabels?: boolean;
}

export const TradingChartSkeleton: React.FC<TradingChartSkeletonProps> = ({
  width = '100%',
  height = '400px',
  showControls = true,
  showPriceLabels = true
}) => {
  // Generate random path for the chart line
  const generateChartPath = () => {
    const points = [];
    const numPoints = 50;
    const chartWidth = 800;
    const chartHeight = 200;
    
    for (let i = 0; i < numPoints; i++) {
      const x = (i / (numPoints - 1)) * chartWidth;
      const y = chartHeight/2 + Math.sin(i * 0.3) * 40 + Math.random() * 20 - 10;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

  const generateCandlesticks = () => {
    const candlesticks = [];
    const numCandles = 25;
    const candleWidth = 12;
    const spacing = 32;
    
    for (let i = 0; i < numCandles; i++) {
      const x = i * spacing + 20;
      const baseHeight = 120 + Math.random() * 60;
      const wickHeight = baseHeight + Math.random() * 40;
      const isGreen = Math.random() > 0.5;
      
      candlesticks.push(
        <g key={i} className="chartSkeleton__candlestick">
          {/* Wick */}
          <line
            x1={x + candleWidth/2}
            y1={50}
            x2={x + candleWidth/2}
            y2={50 + wickHeight}
            className="chartSkeleton__wick"
          />
          {/* Body */}
          <rect
            x={x}
            y={50 + (wickHeight - baseHeight)/2}
            width={candleWidth}
            height={baseHeight}
            className={`chartSkeleton__candleBody ${isGreen ? 'chartSkeleton__candleBody--green' : 'chartSkeleton__candleBody--red'}`}
          />
        </g>
      );
    }
    
    return candlesticks;
  };

  return (
    <div className="chartSkeleton" style={{ width, height }}>
      {showControls && (
        <div className="chartSkeleton__header">
          <div className="chartSkeleton__headerLeft">
            <div className="chartSkeleton__symbolPill"></div>
            <div className="chartSkeleton__pricePill"></div>
            <div className="chartSkeleton__changePill"></div>
          </div>
          <div className="chartSkeleton__headerRight">
            <div className="chartSkeleton__controlPill"></div>
            <div className="chartSkeleton__controlPill"></div>
          </div>
        </div>
      )}
      
      <div className="chartSkeleton__chartArea">
        {showPriceLabels && (
          <div className="chartSkeleton__priceLabels">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="chartSkeleton__priceLabel"></div>
            ))}
          </div>
        )}
        
        <div className="chartSkeleton__chartContainer">
          <svg 
            className="chartSkeleton__svg" 
            viewBox="0 0 800 240"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="40" height="24" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 24" fill="none" stroke="#2a2a2a" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Horizontal grid lines */}
            {[...Array(6)].map((_, i) => (
              <line
                key={i}
                x1="0"
                y1={i * 40 + 20}
                x2="800"
                y2={i * 40 + 20}
                className="chartSkeleton__gridLine"
              />
            ))}
            
            {/* Chart content */}
            <g className="chartSkeleton__chartContent">
              {/* Candlesticks */}
              {generateCandlesticks()}
              
              {/* Moving average line */}
              <path
                d={generateChartPath()}
                className="chartSkeleton__chartLine"
                fill="none"
              />
              
              {/* Volume bars at bottom */}
              {[...Array(25)].map((_, i) => (
                <rect
                  key={i}
                  x={i * 32 + 18}
                  y={200}
                  width={16}
                  height={Math.random() * 30 + 5}
                  className="chartSkeleton__volumeBar"
                />
              ))}
            </g>
          </svg>
          
          {/* Crosshair simulation */}
          <div className="chartSkeleton__crosshair">
            <div className="chartSkeleton__crosshairVertical"></div>
            <div className="chartSkeleton__crosshairHorizontal"></div>
          </div>
        </div>
        
        {/* Time labels */}
        <div className="chartSkeleton__timeLabels">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="chartSkeleton__timeLabel"></div>
          ))}
        </div>
      </div>
      
      {showControls && (
        <div className="chartSkeleton__footer">
          <div className="chartSkeleton__footerLeft">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="chartSkeleton__indicatorPill"></div>
            ))}
          </div>
          <div className="chartSkeleton__footerRight">
            <div className="chartSkeleton__timeframePill"></div>
          </div>
        </div>
      )}
    </div>
  );
};
