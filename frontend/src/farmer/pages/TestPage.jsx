import React from "react";
import Sidebar from "../components/Sidebar";
import PaymentWindow from "../utills/PaymentWindow";
import NavBar from "@/admin/pages/home/home_components/NavBar";
import NavBFarmer from "../extras/NavBFarmer";

function TestPage() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <PaymentWindow />
    </div>
  );
}

export default TestPage;
