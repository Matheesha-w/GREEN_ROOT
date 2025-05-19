import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  Line,
} from "recharts";
import { expenses } from "../../assets/tempData";

function ExpensesGraph() {
  return (
    <div>
      <ResponsiveContainer width={700} height={300}>
        <LineChart data={expenses}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#8884d8"
            activeDot={{
              r: 8,
            }}
          />
          <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpensesGraph;
