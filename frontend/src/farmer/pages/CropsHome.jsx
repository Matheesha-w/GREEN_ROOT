import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CropChart from "../components/CropChart";
import CropTable from "../components/CropTable";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utills/authUtils";
import NavBFarmer from "../extras/NavBFarmer";

function CropsHome() {
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
      <NavBFarmer />
      <Sidebar />
      <div style={{ float: "left", marginLeft: "10%" }}>
        <CropChart fid={userID} />
        <CropTable fid={userID} />
      </div>
    </div>
  );
}

export default CropsHome;
