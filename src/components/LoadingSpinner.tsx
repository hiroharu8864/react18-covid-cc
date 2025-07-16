import React from 'react';

const LoadingSpinner: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    padding: '40px'
  };

  const spinnerStyle: React.CSSProperties = {
    width: '50px',
    height: '50px',
    border: '4px solid #404040',
    borderTop: '4px solid #0066cc',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  };

  const textStyle: React.CSSProperties = {
    fontSize: '18px',
    color: '#b0b0b0',
    textAlign: 'center',
    marginBottom: '10px'
  };

  const subtextStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#808080',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={spinnerStyle}></div>
      <div style={textStyle}>データを読み込み中...</div>
      <div style={subtextStyle}>COVID-19の最新データを取得しています</div>
    </div>
  );
};

export default LoadingSpinner;