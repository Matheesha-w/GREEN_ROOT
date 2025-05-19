import React from "react";
import Sidebar from "../components/Sidebar";
import QADashboard from "../components/QADashboard";
import NavBFarmer from "../extras/NavBFarmer";
import TicketTable from "../QADashboard/TicketTable";

function ExpertsPage() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <TicketTable />
    </div>
  );
}

export default ExpertsPage;
