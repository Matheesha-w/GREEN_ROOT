import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

//import { Crops } from "../../assets/tempData";

function CropChart(prop) {
  const [crops, setCrop] = useState([]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/crops/parameters",
          {
            farmerID: String(prop.fid),
            status: "on-field",
          }
        );

        setCrop(response.data.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    if (prop.fid) {
      fetchCropData();
    }
  }, [prop.fid]);

  return (
    <div>
      <div>
        <BarChart width={500} height={400} data={crops}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="quantity" fill="green" />
        </BarChart>
      </div>
    </div>
  );
}

export default CropChart;
