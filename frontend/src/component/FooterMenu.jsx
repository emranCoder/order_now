import React, { useState } from "react";
import {
  Drawer,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { GiCookie } from "react-icons/gi";
import { LuSoup, LuSalad, LuSandwich } from "react-icons/lu";
import { FaHotjar, FaPlateWheat } from "react-icons/fa6";
import CloseIcon from "@mui/icons-material/Close";
import CheckOut from "./CheckOut";

export default function FooterMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [value, setValue] = useState("food-menu");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [drawerActive, setDrawerActive] = useState({
    right: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (anchor === "right") setDrawerActive({ right: open });
    if (anchor === "bottom") setDrawerActive({ bottom: open });
  };

  const menuList = (anchor) => (
    <div className="pb-8 pt-3 px-5">
      <button
        className="btn btn-circle mt-[-5px] ml-[-12px] btn-sm mb-2 border-red-100 bg-transparentss"
        onClick={toggleDrawer("right", false)}
      >
        <CloseIcon className="!font-bold" sx={{ fontSize: 16 }} />
      </button>
      <h3 className="font-semibold mb-3 text-slate-800 text-2xl">For You</h3>
      <ul className="menu text-lg menu-vertical w-full container justify-center flex">
        <li
          className={
            selectedIndex === 0 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <a>
            <GiCookie />
            <span>Appetizers/Snacks</span>
          </a>
        </li>

        <li
          className={
            selectedIndex === 1 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <a>
            <LuSoup />
            <span>Soups</span>
          </a>
        </li>

        <li
          className={
            selectedIndex === 2 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <a>
            <LuSalad />
            <span>Salads</span>
          </a>
        </li>

        <li
          className={
            selectedIndex === 3 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <a>
            <LuSandwich />
            <span>Sandwiches</span>
          </a>
        </li>

        <li
          className={
            selectedIndex === 4 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <a>
            <FaHotjar />
            <span>Hot Entrees</span>
          </a>
        </li>

        <li
          className={
            selectedIndex === 5 ? "bg-red-600 rounded-lg text-white" : ""
          }
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <a>
            <FaPlateWheat />
            <span>Biryani</span>
          </a>
        </li>
      </ul>
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="max-lg:block hidden m-0 p-0 bottom-0 fixed w-full ">
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className="!rounded-t-3xl shadow-[0px_0px_5px_#c5c5c5] border-t border-red-100 "
        >
          <BottomNavigationAction
            showLabel={true}
            label="Food Menu"
            value="food-menu"
            onClick={toggleDrawer("right", true)}
            className="!text-red-800 "
            icon={<RestaurantMenuIcon />}
          />
          <Drawer
            anchor={"right"}
            open={drawerActive["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {menuList("right")}
          </Drawer>

          <BottomNavigationAction
            showLabel={true}
            label="Check Out"
            value="check-out"
            className="!text-red-800 "
            onClick={toggleDrawer("bottom", true)}
            icon={<ShoppingCartCheckoutIcon />}
          />
          <Drawer
            anchor={"bottom"}
            open={drawerActive["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            <CheckOut closeBtn={toggleDrawer("bottom", false)} />
          </Drawer>
          <BottomNavigationAction
            showLabel={true}
            label="Recents"
            value="recents"
            className="!text-red-800"
            icon={<RestoreIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}
