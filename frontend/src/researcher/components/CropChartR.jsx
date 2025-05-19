import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function CropChartR() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('All');

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/crops');
        if (!response.ok) {
          throw new Error('Failed to fetch crop data');
        }
        const data = await response.json();
        setCrops(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const filteredData = crops
    .filter(crop => {
      if (selectedMonth === 'All') return true;
      const cropMonth = new Date(crop.createdAt).toLocaleString('default', { month: 'long' });
      return cropMonth === selectedMonth;
    })
    .map(crop => ({
      name: crop.name,
      quantity: crop.quantity,
      price: crop.price,
    }));

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-green-600">Loading crop data...</div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 bg-red-50 rounded-lg">
      Error: {error}
    </div>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Stats</h2>
        <select
          value={selectedMonth}
          onChange={handleMonthChange}
          className="px-3 py-1 border border-gray-300 rounded-md text-sm"
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <div className="flex space-x-2 mb-4">
        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
          Quantity (kg)
        </span>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          Price (LKR)
        </span>
      </div>

      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                fontSize: '14px'
              }}
              itemStyle={{ color: '#1f2937' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar
              dataKey="quantity"
              fill="#10b981"
              name="Quantity"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
            <Bar
              dataKey="price"
              fill="#3b82f6"
              name="Price"
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
