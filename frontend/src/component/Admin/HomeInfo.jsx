import React, { useState } from "react";
import * as Mui from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SellIcon from "@mui/icons-material/Sell";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PaidIcon from "@mui/icons-material/Paid";
import SettingsIcon from "@mui/icons-material/Settings";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import PeopleIcon from "@mui/icons-material/People";

export default function HomeInfo() {
  return (
    <div className="my-10 info-box">
      <div className="flex gap-1">
        <div className="bg-purple-900 border rounded-lg shadow-md p-10 px-5 pt-3 w-56 ">
          <div className="flex justify-between relative">
            <div className="text-left">
              <p className="text-md font-medium uppercase text-white">Income</p>
              <h3 className="text-4xl font-bold leading-loose text-white">
                $24k
              </h3>
            </div>
            <h3 className="icon ml-12 ">
              <MonetizationOnIcon sx={{ fontSize: 50 }} />
            </h3>
          </div>
        </div>

        <div className="bg-green-800 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 ">
          <div className="flex justify-between relative">
            <div className="text-left">
              <p className="text-md font-medium uppercase text-white">Orders</p>
              <h3 className="text-4xl font-bold leading-loose text-white">
                ! 200
              </h3>
            </div>
            <h3 className="icon ml-12 ">
              <SellIcon sx={{ fontSize: 50 }} />
            </h3>
          </div>
        </div>

        <div className="bg-blue-900 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 ">
          <div className="flex justify-between relative">
            <div className="text-left">
              <p className="text-md font-medium uppercase text-white">
                Products
              </p>
              <h3 className="text-4xl font-bold leading-loose text-white">
                # 100
              </h3>
            </div>
            <h3 className="icon ml-12 ">
              <MonetizationOnIcon sx={{ fontSize: 50 }} />
            </h3>
          </div>
        </div>
        <div className="bg-yellow-600 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 ">
          <div className="flex justify-between relative">
            <div className="text-left">
              <p className="text-md font-medium uppercase text-white">Users</p>
              <h3 className="text-4xl font-bold leading-loose text-white">
                1K
              </h3>
            </div>
            <h3 className="icon ml-12">
              <PeopleIcon sx={{ fontSize: 50 }} />
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
