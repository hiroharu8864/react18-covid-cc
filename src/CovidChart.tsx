import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

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

const CovidChart: React.FC = () => {
  const [data, setData] = useState<CovidData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CovidData>('https://disease.sh/v3/covid-19/all');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch COVID-19 data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading COVID-19 data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>COVID-19 Global Statistics</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Total Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Cases Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Today's Statistics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={todayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', marginTop: '20px' }}>
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Total Cases</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0088FE' }}>{data.cases.toLocaleString()}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Deaths</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF8042' }}>{data.deaths.toLocaleString()}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Recovered</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#00C49F' }}>{data.recovered.toLocaleString()}</p>
        </div>
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>Active</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#FFBB28' }}>{data.active.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CovidChart;