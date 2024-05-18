import React, { useState } from "react";
import * as Mui from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SellIcon from "@mui/icons-material/Sell";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import PaidIcon from "@mui/icons-material/Paid";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import CategoryIcon from "@mui/icons-material/Category";
import ContactsIcon from "@mui/icons-material/Contacts";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import GroupsIcon from "@mui/icons-material/Groups";
import { NavLink } from "react-router-dom";
import logo from "../img/orderNow.png";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export default function Header() {
  const { isLoading, user, err } = useSelector((state) => state.user);
  const [drawerActive, setDrawerActive] = useState({
    left: false,
    bottom: false,
    right: false,
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (anchor === "left") setDrawerActive({ left: open });
    if (anchor === "bottom") setDrawerActive({ bottom: open });
    if (anchor === "right") setDrawerActive({ right: open });
    if (anchor === "top") setDrawerActive({ top: open });
  };

  const logOut = async () => {
    const token = Cookies.get("auth");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/login/logout`,
        {
          headers: {
            token: token,
          },
        }
      );
      if (response && response.status === 200) {
        Cookies.remove("auth");
        Cookies.remove("id");
        window.location.replace("/admin-login?true=forget");
      }
    } catch (error) {
      console.log(error.response);
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <nav className="navbar bg-white border-gray-200 dark:bg-gray-900 shadow-lg lg:px-10">
        <div className="navbar-start">
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            onClick={toggleDrawer("left", true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <a
            href="/dashboard"
            className="lg:flex items-center space-x-3 rtl:space-x-reverse hidden"
          >
            <img src={logo} className="h-12" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              OrderNow
            </span>
          </a>
        </div>

        <a
          href="/dashboard"
          className="max-lg:flex items-center space-x-3 rtl:space-x-reverse hidden"
        >
          <img src={logo} className="h-9 max-sm:h-12 " alt="logo" />
          <span className="self-center  max-sm:hidden  text-2xl font-semibold whitespace-nowrap dark:text-white">
            OrderNow
          </span>
        </a>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle hidden  lg:flex md:flex  just-center items-center mr-5">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="#" className="justify-between">
                  Profile
                </a>
              </li>
              <li>
                <a
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="loading"
                  src={
                    (user && `http://localhost:5000/avatar/${user.avatar}`) ||
                    "default-avatar.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="setting" className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <a
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {drawerActive["left"] && (
        <div className="dark-bg" onClick={toggleDrawer("left", false)}></div>
      )}
      <Mui.Slide direction="right" in={drawerActive["left"]} timeout={300}>
        <nav
          className="text-slate-400 nav pb-14 absolute top-0 w-4/6"
          aria-label="main mailbox folders"
        >
          <div
            className="absolute right-1 border border-slate-400  mr-2 m-2 cursor-pointer text-slate-400  rounded-full p-1   items-center flex justify-center"
            onClick={toggleDrawer("left", false)}
          >
            <CloseIcon fontSize="small" className="icon " />
          </div>
          <div className="my-5 text-left px-5 mt-12">
            <div className="item-color rounded-lg px-5 py-3">
              <h3 className="text-lg font-bold text-white">
                {user.fName + " " + user.lName}
              </h3>
              <h3>{user.email}</h3>
            </div>
          </div>
          <Mui.Divider className="bg-slate-700" />
          <div className="my-8 pt-0 p-5" onClick={toggleDrawer("left", false)}>
            <NavLink to="/dashboard">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <SignalCellularAltIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Dashboard</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="all-order">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <SellIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">All Orders</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="current-order">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <ProductionQuantityLimitsIcon
                    fontSize="small"
                    className="icon"
                  />
                </span>
                <span className="font-semibold text-sm">Current Order</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="payment-status">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <PaidIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Payment Status</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="staff">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <GroupsIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Staff</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="product">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <ShoppingBasketIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Product</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="category">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <CategoryIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Category</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="user">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <ContactsIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Customers</span>
              </Mui.ListItemButton>
            </NavLink>
            <NavLink to="coupon">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <ConfirmationNumberIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Coupon Code</span>
              </Mui.ListItemButton>
            </NavLink>

            <div className="my-5">
              <Mui.Divider className="bg-slate-700 " />
            </div>
            <NavLink to="setting">
              <Mui.ListItemButton className="font-thin item-btn">
                <span className="mr-5">
                  <SettingsIcon fontSize="small" className="icon" />
                </span>
                <span className="font-semibold text-sm">Setting</span>
              </Mui.ListItemButton>
            </NavLink>
            <Mui.ListItemButton
              onClick={() => {
                logOut();
              }}
              className="font-thin item-btn"
            >
              <span className="mr-5">
                <LogoutIcon fontSize="small" className="icon" />
              </span>
              <span>Logout</span>
            </Mui.ListItemButton>
          </div>
        </nav>
      </Mui.Slide>
    </div>
  );
}
