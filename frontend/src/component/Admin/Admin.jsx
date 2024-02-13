import React from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import HomeInfo from "./HomeInfo";

export default function Admin() {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="container-row">
          <SideMenu />
          <HomeInfo />
        </div>
      </div>
    </div>
  );
}
