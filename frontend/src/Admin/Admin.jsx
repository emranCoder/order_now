import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div className="bg-slate-100">
      <Header />
      <div className="container-fluid">
        <div className="container-row">
          <SideMenu />
          <div className="py-10  box-right col-md-12 col-lg-9 lg:w-4/5 px-3 max-sm:px-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
