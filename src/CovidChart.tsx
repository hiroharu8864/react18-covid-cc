import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import useSWR from 'swr';

interface CovidData {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const fetcher = (url: string) => fetch(url).then(res => res.json());

const CovidChart: React.FC = () => {
  const { data } = useSWR<CovidData>('https://disease.sh/v3/covid-19/all', fetcher, {
    suspense: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000
  });

  // Suspenseを使用しているため、dataは必ず存在する
  if (!data) {
    throw new Error('Data is unexpectedly undefined');
  }

  const barData = [
    { name: 'Cases', value: data.cases },
    { name: 'Deaths', value: data.deaths },
    { name: 'Recovered', value: data.recovered },
    { name: 'Active', value: data.active }
  ];

  const pieData = [
    { name: 'Active', value: data.active },
    { name: 'Recovered', value: data.recovered },
    { name: 'Deaths', value: data.deaths }
  ];

  const todayData = [
    { name: 'Today Cases', value: data.todayCases },
    { name: 'Today Deaths', value: data.todayDeaths },
    { name: 'Today Recovered', value: data.todayRecovered }
  ];

  const containerStyle: React.CSSProperties = {
    padding: '30px',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    minHeight: '100vh'
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '40px',
    backgroundColor: '#2a2a2a',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #404040'
  };

  const titleStyle: React.CSSProperties = {
    color: '#ffffff',
    marginBottom: '20px',
    fontSize: '24px'
  };

  const cardStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #2a2a2a 0%, #333333 100%)',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid #404040',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  };

  const cardTitleStyle: React.CSSProperties = {
    color: '#b0b0b0',
    margin: '0 0 10px 0',
    fontSize: '16px'
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Total Statistics</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="name" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
            <YAxis 
              tick={{ fill: '#e0e0e0', fontSize: 11 }} 
              width={70}
              tickFormatter={(value) => {
                if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                return value.toString();
              }}
            />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Count']}
              contentStyle={{
                backgroundColor: '#333333',
                border: '1px solid #555555',
                borderRadius: '8px',
                color: '#e0e0e0'
              }}
            />
            <Legend wrapperStyle={{ color: '#e0e0e0' }} />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Cases Distribution</h2>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Count']}
              contentStyle={{
                backgroundColor: '#333333',
                border: '1px solid #555555',
                borderRadius: '8px',
                color: '#e0e0e0'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={sectionStyle}>
        <h2 style={titleStyle}>Today's Statistics</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={todayData} margin={{ top: 20, right: 30, left: 80, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis dataKey="name" tick={{ fill: '#e0e0e0', fontSize: 12 }} />
            <YAxis 
              tick={{ fill: '#e0e0e0', fontSize: 11 }} 
              width={70}
              tickFormatter={(value) => {
                if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                return value.toString();
              }}
            />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Count']}
              contentStyle={{
                backgroundColor: '#333333',
                border: '1px solid #555555',
                borderRadius: '8px',
                color: '#e0e0e0'
              }}
            />
            <Legend wrapperStyle={{ color: '#e0e0e0' }} />
            <Bar dataKey="value" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Total Cases</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0088FE', margin: 0 }}>{data.cases.toLocaleString()}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Deaths</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#FF8042', margin: 0 }}>{data.deaths.toLocaleString()}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Recovered</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#00C49F', margin: 0 }}>{data.recovered.toLocaleString()}</p>
        </div>
        <div style={cardStyle}>
          <h3 style={cardTitleStyle}>Active</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#FFBB28', margin: 0 }}>{data.active.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CovidChart;