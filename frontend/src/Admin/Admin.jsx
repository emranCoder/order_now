import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="container-row">
          <SideMenu />
          <div className="py-10 box-right mb-12 col-md-9 col-lg-9 col-sm-12 lg:w-4/5 lg:px-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
