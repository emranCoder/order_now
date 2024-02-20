import * as React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-red-50" sx={{ flexGrow: 1 }}>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
