import React, { useState } from "react";
import {
  Drawer,
  Grid,
  List,
  Divider,
  ListItem,
  ListItemButton,
  BottomNavigationAction,
  BottomNavigation,
} from "@mui/material";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import RestoreIcon from "@mui/icons-material/Restore";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CoffeeIcon from "@mui/icons-material/Coffee";
import SetMealIcon from "@mui/icons-material/SetMeal";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function FooterMenu() {
  const menuIcons = [<CoffeeIcon />, <SetMealIcon />, <RamenDiningIcon />];

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
    <div role="presentation">
      <div className="m-3 mt-5  space-x-1">
        <SearchIcon />
        <input
          className="border-spacing-0 border-0 outline-none no-underline"
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onKeyDown={(e) => console.log(e.target.value)}
        />
      </div>
      <Divider />
      <div
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["Breakfast", "Beverages", "Biriyani"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon className="text-purple-600">
                  {menuIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Breakfast", "Beverages", "Biriyani"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon className="text-purple-600">
                  {menuIcons[index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );

  const checkOut = (anchor) => (
    <div role="presentation" className="p-5 pt-0">
      <h3 className="capitalize font-medium text-2xl pt-5 text-purple-600">
        Order Details:
      </h3>
      <div className="grid grid-cols-3 gap-0 py-2 space-x-0 max-md:grid-cols-1">
        <div className="grid col-span-2 grid-cols-2 lg:grid-cols-3 max-md:grid-cols-none  justify-start gap-0 space-x-0  border-r-2 overflow-y-scroll h-64 max-md:h-52">
          <div className="h-24 mx-auto bg-white space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-purple hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>

          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-purple hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-purple hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-purple hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>

          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-purple hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
        </div>
        <div className="list px-5 ">
          <div className="w-full ">
            <div className="w-full border-b">
              <span>Subtotal: </span>
              <span className="float-right">100 $</span>
            </div>
            <div className="w-full border-b">
              <span>Discount:</span>
              <span className="float-right">0.0 %</span>
            </div>
            <div className="w-full border-b">
              <span>Tax: </span>
              <span className="float-right">1.5 %</span>
            </div>
            <div className="w-full">
              <span>Total: </span>
              <span className="float-right">110 $</span>
            </div>
            <div className="flex justify-center w-full my-5">
              <input
                className="border-spacing-0 w-full inline-block p-2 outline-none border-purple-300 focus:border-purple-600 border no-underline rounded-l-md"
                placeholder="kupon code"
                inputProps={{ "aria-label": "search" }}
                onKeyDown={(e) => console.log(e.target.value)}
              />
              <button className="p-2 m-0 text-sm inline-block  text-white font-semibold bg-purple-600 rounded-l-none rounded-md border border-purple-600 hover:text-purple hover:bg-purple-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                <KeyboardArrowRightIcon />
              </button>
            </div>
            <div className="w-full">
              <button className=" w-full py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-600 focus:outline-none focus:ring-2 hover:text-white  hover:border-purple-300 hover:bg-purple-600   focus:ring-purple-300 focus:bg-purple-600 focus:text-white   focus:ring-offset-2 ease-out duration-300">
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid">
      <div className="bg-white rounded-t-3xl  px-40  max-lg:hidden grid items-center fixed bottom-0 w-full py-5">
        <Drawer
          anchor={"bottom"}
          open={drawerActive["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {checkOut("bottom")}
        </Drawer>

        <Grid className="flex justify-between items-center">
          <Grid
            onClick={toggleDrawer("bottom", true)}
            className=" cursor-pointer text-lg capitalize"
            item
          >
            <ArrowCircleUpIcon /> Your Order
          </Grid>
          <Grid className="font-semibold">
            Price: 244,2230$
            <button
              onClick={toggleDrawer("bottom", true)}
              className="px-5 py-2 ml-5 text-sm text-white font-semibold rounded-full border bg-purple-600 hover:bg-transparent focus:outline-none focus:ring-2  border-purple-600 hover:text-purple-600    focus:ring-purple-300  hover:border-purple-600 focus:ring-offset-2 ease-out duration-300"
            >
              Check Out
            </button>
          </Grid>
        </Grid>
      </div>
      <div className="max-lg:block hidden m-0 p-0 bottom-0 fixed w-full">
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            label="Food Menu"
            value="food-menu"
            onClick={toggleDrawer("right", true)}
            icon={<RestaurantMenuIcon />}
          />
          <Drawer
            anchor={"right"}
            open={drawerActive["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {menuList("right")}
          </Drawer>
          <label className="border-inherit border-l"></label>
          <BottomNavigationAction
            label="Check Out"
            value="check-out"
            onClick={toggleDrawer("bottom", true)}
            icon={<ShoppingCartCheckoutIcon />}
          />
          <Drawer
            anchor={"bottom"}
            open={drawerActive["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            {checkOut("bottom")}
          </Drawer>
          <label className="border-inherit border-l"></label>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<RestoreIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
}
