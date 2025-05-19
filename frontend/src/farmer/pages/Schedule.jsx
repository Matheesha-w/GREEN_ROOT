import React from "react";
import Sidebar from "../components/Sidebar";
import ScheduleList from "../components/ScheduleList";
import WorkGraph from "../components/WorkGraph";
import ScheduleCards from "../components/ScheduleCards";
import NavBFarmer from "../extras/NavBFarmer";

function Schedule() {
  return (
    <div>
      <NavBFarmer />
      <Sidebar />
      <div style={{ float: "left", padding: "2%", marginLeft: "20px" }}>
        <ScheduleCards />
        <ScheduleList />
      </div>

      <div style={{ float: "right" }}></div>
    </div>
  );
}

export default Schedule;
