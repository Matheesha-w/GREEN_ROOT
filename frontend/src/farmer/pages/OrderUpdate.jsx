import React from "react";
import NavBFarmer from "../extras/NavBFarmer";
import Sidebar from "../components/Sidebar";
import OrderDetails from "../components/OrderDetails";
import NewOrderComp from "../AdditionalComponents.jsx/NewOrderComp";

function OrderUpdate() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <NewOrderComp />
      {/* <OrderDetails /> */}
    </div>
  );
}

export default OrderUpdate;
