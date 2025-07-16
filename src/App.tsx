import React, { useState, Suspense } from 'react';
import './App.css';
import CovidChart from './CovidChart';
import CovidHistoricalChart from './CovidHistoricalChart';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [activeTab, setActiveTab] = useState<'current' | 'historical'>('current');

  const tabStyle: React.CSSProperties = {
    padding: '12px 24px',
    margin: '0 8px',
    backgroundColor: '#2a2a2a',
    border: '1px solid #404040',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#e0e0e0',
    transition: 'all 0.3s ease'
  };

  const activeTabStyle: React.CSSProperties = {
    ...tabStyle,
    backgroundColor: '#0066cc',
    borderColor: '#0066cc',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0, 102, 204, 0.3)'
  };

  const appStyle: React.CSSProperties = {
    backgroundColor: '#1a1a1a',
    minHeight: '100vh',
    color: '#e0e0e0'
  };

  const headerStyle: React.CSSProperties = {
    padding: '30px 20px',
    textAlign: 'center',
    backgroundColor: '#222222',
    borderBottom: '1px solid #404040'
  };

  return (
    <div className="App" style={appStyle}>
      <div style={headerStyle}>
        <h1 style={{ margin: '0 0 20px 0', color: '#ffffff', fontSize: '28px' }}>
          COVID-19 Dashboard
        </h1>
        <div>
          <button
            style={activeTab === 'current' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('current')}
            onMouseEnter={(e) => {
              if (activeTab !== 'current') {
                e.currentTarget.style.backgroundColor = '#333333';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'current') {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
              }
            }}
          >
            Current Statistics
          </button>
          <button
            style={activeTab === 'historical' ? activeTabStyle : tabStyle}
            onClick={() => setActiveTab('historical')}
            onMouseEnter={(e) => {
              if (activeTab !== 'historical') {
                e.currentTarget.style.backgroundColor = '#333333';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== 'historical') {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
              }
            }}
          >
            Historical Data
          </button>
        </div>
      </div>
      
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {activeTab === 'current' ? <CovidChart /> : <CovidHistoricalChart />}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
