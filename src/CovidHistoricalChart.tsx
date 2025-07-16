import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useSWR from 'swr';

interface HistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

interface ChartDataPoint {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CovidHistoricalChart: React.FC = () => {
  const { data } = useSWR<HistoricalData>(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all',
    fetcher,
    {
      suspense: true,
      errorRetryCount: 3,
      errorRetryInterval: 1000
    }
  );

  // Suspenseを使用しているため、dataは必ず存在する
  if (!data) {
    throw new Error('Data is unexpectedly undefined');
  }

  const processData = (data: HistoricalData): ChartDataPoint[] => {
    const dates = Object.keys(data.cases);
    
    return dates.map(date => {
      const [month, day, year] = date.split('/');
      const formattedDate = `20${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      return {
        date: formattedDate,
        cases: data.cases[date],
        deaths: data.deaths[date],
        recovered: data.recovered[date]
      };
    });
  };

  const chartData = processData(data);
  const latestData = chartData[chartData.length - 1];

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#2a2a2a',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    border: '1px solid #404040'
  };

  const statsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '30px'
  };

  const statCardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #333333 0%, #404040 100%)',
    padding: '25px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #555555',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
  };

  const statNumberStyle: React.CSSProperties = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

  const statLabelStyle: React.CSSProperties = {
    color: '#b0b0b0',
    fontSize: '16px'
  };

  const formatTooltipValue = (value: number, name: string) => {
    return [value.toLocaleString(), name];
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '30px', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', color: '#ffffff', marginBottom: '40px', fontSize: '32px' }}>
          COVID-19 Historical Data
        </h1>
        
        <div style={{ position: 'relative', height: '500px', marginBottom: '30px', backgroundColor: '#1f1f1f', padding: '20px', borderRadius: '12px', border: '1px solid #404040' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 11, fill: '#e0e0e0' }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('ja-JP', { month: 'short', year: 'numeric' })}
              />
              <YAxis 
                tick={{ fill: '#e0e0e0', fontSize: 10 }}
                width={90}
                tickFormatter={(value) => {
                  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                  return value.toString();
                }}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelFormatter={(value) => new Date(value).toLocaleDateString('ja-JP')}
                contentStyle={{
                  backgroundColor: '#333333',
                  border: '1px solid #555555',
                  borderRadius: '8px',
                  color: '#e0e0e0'
                }}
              />
              <Legend wrapperStyle={{ color: '#e0e0e0' }} />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#ff6b6b"
                strokeWidth={3}
                dot={false}
                name="Total Cases"
              />
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="#ff8c42"
                strokeWidth={3}
                dot={false}
                name="Total Deaths"
              />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#51cf66"
                strokeWidth={3}
                dot={false}
                name="Total Recovered"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div style={statsStyle}>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: '#ff6b6b' }}>
              {latestData.cases.toLocaleString()}
            </div>
            <div style={statLabelStyle}>Total Cases</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: '#ff8c42' }}>
              {latestData.deaths.toLocaleString()}
            </div>
            <div style={statLabelStyle}>Total Deaths</div>
          </div>
          <div style={statCardStyle}>
            <div style={{ ...statNumberStyle, color: '#51cf66' }}>
              {latestData.recovered.toLocaleString()}
            </div>
            <div style={statLabelStyle}>Total Recovered</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CovidHistoricalChart;