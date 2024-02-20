import * as React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-red-50 ">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
