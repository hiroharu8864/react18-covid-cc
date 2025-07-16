import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    padding: '40px',
    textAlign: 'center'
  };

  const iconStyle: React.CSSProperties = {
    fontSize: '48px',
    color: '#ff6b6b',
    marginBottom: '20px'
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: '15px'
  };

  const messageStyle: React.CSSProperties = {
    fontSize: '16px',
    color: '#b0b0b0',
    marginBottom: '20px',
    maxWidth: '500px'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div style={containerStyle}>
      <div style={iconStyle}>⚠️</div>
      <div style={titleStyle}>データの読み込みに失敗しました</div>
      <div style={messageStyle}>
        COVID-19データの取得中にエラーが発生しました。
        ネットワーク接続を確認して、再度お試しください。
      </div>
      {error && (
        <div style={{ ...messageStyle, fontSize: '14px', color: '#808080', marginBottom: '20px' }}>
          エラー詳細: {error.message}
        </div>
      )}
      <button 
        style={buttonStyle}
        onClick={handleReload}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0052a3'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}
      >
        再読み込み
      </button>
    </div>
  );
};

export default ErrorBoundary;