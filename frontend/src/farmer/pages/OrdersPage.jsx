import React from "react";
import Sidebar from "../components/Sidebar";
import OrderPanel from "../components/OrderPanel";
import OrderTabs from "../components/OrderTabs";
import OrderTable from "../components/OrderTable";
import NavBFarmer from "../extras/NavBFarmer";

function OrdersPage() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <div className="bg-amber-300">
        <OrderTable />
      </div>
    </div>
  );
}

export default OrdersPage;
