import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StockchartFrame from "../components/StockchartFrame";
import JobsHome from "../components/JobsHome";
import FieldMap from "../components/FieldMap";
import SummaryCards from "../components/SummaryCards";
import ExpensesGraph from "../components/ExpensesGraph";
import "../extras/styles.css";

import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utills/authUtils";
import WeatherCards from "../components/WeatherCards";

import Sidebar2 from "../tests/Sidebar2";
import NavBFarmer from "../extras/NavBFarmer";
import CropProgress from "../components/CropProgress";

function FarmerHome() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const userId = getUserIdFromToken();

    if (userId) {
      setUserID(userId);
    } else {
      navigate(`/farmer`);
    }
  }, []);

  return (
    <div>
      <div>
        <NavBFarmer />
        <div className="sticky top-0">
          <Sidebar uid={userID} />
        </div>
      </div>

      <div className="bg-gray-100">
        <div style={{ float: "left", padding: "2%" }}>
          <WeatherCards />

          <div className="overflow-hidden">
            <FieldMap />
          </div>

          <div>
            <CropProgress />
          </div>

          <div>{/* <ExpensesGraph /> */}</div>
        </div>

        <div style={{ float: "right", padding: "1.3%" }}>
          <StockchartFrame />
          <JobsHome fid={userID} />
        </div>
      </div>
    </div>
  );
}

export default FarmerHome;
