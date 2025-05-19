import React, { useEffect, useState } from "react";
import CropInfo from "../components/CropInfo";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utills/authUtils";
import NavBar from "@/admin/pages/home/home_components/NavBar";
import NavBFarmer from "../extras/NavBFarmer";

function ViewCrop() {
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
      <CropInfo />
    </div>
  );
}

export default ViewCrop;
