import React from "react";
import Sidebar from "../components/Sidebar";
import AddCrop from "../components/AddCrop";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../utills/authUtils";
import { useEffect, useState } from "react";
import NavBFarmer from "../extras/NavBFarmer";

function AddCropPage() {
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
      <AddCrop fid={userID} />
    </div>
  );
}

export default AddCropPage;
