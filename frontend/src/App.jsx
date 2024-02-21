import * as React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="bg-red-50 ">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
