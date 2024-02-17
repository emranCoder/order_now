import * as React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-cafe-100 h-screen" sx={{ flexGrow: 1 }}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
