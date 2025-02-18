import React from "react";
import Dashnav from "./dashnav";
import { Outlet } from "react-router-dom"; 

function Dashboard() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "250px", position: "fixed", height: "100vh" }}>
        <Dashnav />
      </div>

      <div style={{ marginLeft: "250px", flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet /> 
      </div>
    </div>
  );
}

export default Dashboard;
