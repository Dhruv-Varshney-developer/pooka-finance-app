import React, { useState } from 'react';
import './styles.scss';

interface TimeFrame {
  label: string;
  value: string;
}

const TimeSelector: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('1D'); 
  const timeframes: TimeFrame[] = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '30m', value: '30m' },
    { label: '1H', value: '1H' },
    { label: '1D', value: '1D' },
    { label: '3D', value: '3D' },
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
  ];

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
    // Here you would typically call a function to update the chart
    console.log(`Selected timeframe: ${timeframe}`);
  };

  return (
    <div className="time-selector">
      <div className="time-selector__header">
        <h3 className="time-selector__title">Timeframe</h3>
        <div className="time-selector__current">
          Current: <span className="time-selector__current-value">{selectedTimeframe}</span>
        </div>
      </div>
      
      <div className="time-selector__container">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe.value}
                onClick={() => handleTimeframeChange(timeframe.value)}
                className={`time-selector__timeframe ${
                  selectedTimeframe === timeframe.value 
                    ? 'time-selector__timeframe--active' 
                    : ''
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
    </div>
  );
};

export default TimeSelector;