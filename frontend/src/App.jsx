import React from "react";
import "./App.css";
import NavBar from "./component/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./component/Footer";
import { Provider } from "react-redux";
import store from "./redux/store";
import AlertError from "./component/AlertError";

function App() {
  return (
    <Provider store={store}>
      <div className="bg-gray-100 ">
        <NavBar />

        <AlertError />
        <Outlet />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
