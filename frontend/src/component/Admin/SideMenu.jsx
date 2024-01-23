import * as React from "react";
import * as Mui from "@mui/material";

import LogoutIcon from "@mui/icons-material/Logout";
import SellIcon from "@mui/icons-material/Sell";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PaidIcon from "@mui/icons-material/Paid";
import SettingsIcon from "@mui/icons-material/Settings";
export default function SideMenu() {
  return (
    <nav className=" text-slate-400 nav" aria-label="main mailbox folders">
      <Mui.Divider className="bg-slate-700" />
      <div className="my-8 pt-0 p-5">
        <Mui.ListItemButton className="font-thin item-btn active">
          <span className="mr-5">
            <SignalCellularAltIcon fontSize="small" className="icon" />
          </span>
          <span className="font-semibold text-sm">Home</span>
        </Mui.ListItemButton>
        <Mui.ListItemButton className="font-thin item-btn">
          <span className="mr-5">
            <SellIcon fontSize="small" className="icon" />
          </span>
          <span className="font-semibold text-sm">Orders</span>
        </Mui.ListItemButton>
        <Mui.ListItemButton className="font-thin item-btn">
          <span className="mr-5">
            <PaidIcon fontSize="small" className="icon" />
          </span>
          <span className="font-semibold text-sm">Payment Status</span>
        </Mui.ListItemButton>
        <Mui.ListItemButton className="font-thin item-btn">
          <span className="mr-5">
            <SettingsIcon fontSize="small" className="icon" />
          </span>
          <span className="font-semibold text-sm">Setting</span>
        </Mui.ListItemButton>
        <Mui.ListItemButton className="font-thin item-btn">
          <span className="mr-5">
            <LogoutIcon fontSize="small" className="icon" />
          </span>
          <span className="font-semibold text-sm">Logout</span>
        </Mui.ListItemButton>
      </div>
      <Mui.Divider className="bg-slate-700" />
    </nav>
  );
}
