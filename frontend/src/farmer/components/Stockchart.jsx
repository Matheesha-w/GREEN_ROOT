import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

import axios from "axios";
import { useParams } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function StockChart() {
  const { uid } = useParams();
  const [orderList, setList] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/farmer/order/parameters",
          {
            farmerId: String(uid),
          }
        );

        let data1 = response.data.data;

        console.log(response.data.data);

        let Pending = data1.filter((element) => {
          return element.status == "Pending";
        }).length;

        let Processing = data1.filter((element) => {
          return element.status == "Processing";
        }).length;

        let Cancelled = data1.filter((element) => {
          return element.status == "Cancelled";
        }).length;

        setList([
          { name: "Pending", amount: Pending },
          { name: "Processing", amount: Processing },
          { name: "Cancelled", amount: Cancelled },
        ]);
      } catch (error) {
        console.error("Error fetching Orders:", error);
      }
    };

    if (uid) {
      fetchOrderData();
    }
  }, [uid]);

  return (
    <div>
      <ResponsiveContainer width={300} height={250}>
        <PieChart>
          <Tooltip />
          <Legend />

          <Pie
            data={orderList}
            cx="50%"
            cy="50%"
            innerRadius={50} // Added innerRadius for ring chart effect
            outerRadius={80}
            fill="#8884d8"
            dataKey="amount"
          >
            {orderList.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StockChart;
