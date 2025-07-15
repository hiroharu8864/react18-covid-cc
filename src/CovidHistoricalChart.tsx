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
  const { data, error, isLoading } = useSWR<HistoricalData>(
    'https://disease.sh/v3/covid-19/historical/all?lastdays=all',
    fetcher
  );

  if (isLoading) return <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>データを読み込み中...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>データの読み込みに失敗しました。</div>;
  if (!data) return <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>データが利用できません。</div>;

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
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const statsStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const statCardStyle: React.CSSProperties = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  };

  const statNumberStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const statLabelStyle: React.CSSProperties = {
    color: '#666',
    fontSize: '14px'
  };

  const formatTooltipValue = (value: number, name: string) => {
    return [value.toLocaleString(), name];
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={containerStyle}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          COVID-19 Historical Data
        </h1>
        
        <div style={{ position: 'relative', height: '500px', marginBottom: '30px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('ja-JP', { month: 'short', year: 'numeric' })}
              />
              <YAxis 
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip 
                formatter={formatTooltipValue}
                labelFormatter={(value) => new Date(value).toLocaleDateString('ja-JP')}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="cases"
                stroke="#ff6b6b"
                strokeWidth={2}
                dot={false}
                name="Total Cases"
              />
              <Line
                type="monotone"
                dataKey="deaths"
                stroke="#ff8c42"
                strokeWidth={2}
                dot={false}
                name="Total Deaths"
              />
              <Line
                type="monotone"
                dataKey="recovered"
                stroke="#51cf66"
                strokeWidth={2}
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