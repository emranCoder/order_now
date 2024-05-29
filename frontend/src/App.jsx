import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import AlertError from "./component/AlertError";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./redux/AuthSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [0]);

  return (
    <div className="bg-gray-100 ">
      <NavBar />

      <AlertError />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
