import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "January", sales: 4000 },
  { name: "February", sales: 3000 },
  { name: "March", sales: 5000 },
  { name: "April", sales: 2000 },
];

const SalesBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#2bff00" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SalesBarChart;
