import React, { useState } from 'react';
import './App.css';
import CovidChart from './CovidChart';
import CovidHistoricalChart from './CovidHistoricalChart';

function App() {
  const [activeTab, setActiveTab] = useState<'current' | 'historical'>('current');

  const tabStyle: React.CSSProperties = {
    padding: '10px 20px',
    margin: '0 5px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  return (
    <div className="App">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button
          style={activeTab === 'current' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('current')}
        >
          Current Statistics
        </button>
        <button
          style={activeTab === 'historical' ? activeTabStyle : tabStyle}
          onClick={() => setActiveTab('historical')}
        >
          Historical Data
        </button>
      </div>
      
      {activeTab === 'current' ? <CovidChart /> : <CovidHistoricalChart />}
    </div>
  );
}

export default App;
