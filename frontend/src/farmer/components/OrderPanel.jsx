import React from "react";
import OrderCard from "./OrderCard";

function OrderPanel() {
  return (
    <div className="p-1">
      <OrderCard />

      <OrderCard />
    </div>
  );
}

export default OrderPanel;
