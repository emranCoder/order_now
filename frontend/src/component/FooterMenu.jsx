import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { setCategory } from "../redux/ProductFetch";

export default function FooterMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [category, setCategories] = useState(0);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState([
    <GiCookie />,
    <LuSoup />,
    <LuSalad />,
    <LuSandwich />,
    <FaHotjar />,
    <FaPlateWheat />,
  ]);
  useEffect(() => {
    getCategory();
  }, [0]);

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

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/all`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setCategories(response.data.category);
        dispatch(setCategory(response.data.category[0].name));
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  const menuList = (anchor) => (
    <div className="pb-8 pt-3 px-5">
      <button
        className="btn btn-circle mt-[-5px] ml-[-12px] btn-sm mb-2 border-slate-100 bg-transparentss"
        onClick={toggleDrawer("right", false)}
      >
        <CloseIcon className="!font-bold" sx={{ fontSize: 16 }} />
      </button>
      <h3 className="font-semibold mb-3 text-slate-800 text-2xl">For You</h3>
      <ul className="menu text-lg menu-vertical w-full container justify-center flex">
        {category &&
          category.map((val, key) => (
            <li
              key={key}
              className={
                selectedIndex === key
                  ? "bg-slate-600 rounded-lg text-white"
                  : ""
              }
              onClick={(event) => {
                handleListItemClick(event, key);
                dispatch(setCategory(val.name));
                setDrawerActive({ right: false });
              }}
            >
              <a>
                {icon[key]}
                <span>{val.name}</span>
              </a>
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className="flex justify-center">
      <div className="max-lg:block hidden m-0 p-0 bottom-0 fixed w-full ">
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className="!rounded-t-3xl shadow-[0px_0px_5px_#c5c5c5] border-t border-slate-100 "
        >
          <BottomNavigationAction
            showLabel={true}
            label="Food Menu"
            value="food-menu"
            onClick={toggleDrawer("right", true)}
            className="!text-slate-800 "
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
            className="!text-slate-800 "
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
            className="!text-slate-800"
            icon={<RestoreIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}
