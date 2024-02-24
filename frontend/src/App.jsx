import React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="bg-gray-100 ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
