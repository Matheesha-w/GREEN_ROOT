import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

function WorkGraph() {
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          margin: "auto 10%",
        }}
      >
        <h1 style={{ color: "green" }}>GeeksforGeeks</h1>

        <PieChart width={700} height={700}>
          <Tooltip />
          <Pie
            data={data}
            dataKey="students"
            outerRadius={250}
            innerRadius={150}
            fill="green"
            label={({ name, students }) => `${name}: ${students}`}
          />
        </PieChart>
      </div>
    </div>
  );
}

export default WorkGraph;
