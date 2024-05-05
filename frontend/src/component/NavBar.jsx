import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { NavLink } from "react-router-dom";
import logo from "../img/orderNow.png";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import CheckOut from "./CheckOut";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addToast } from "../redux/ToastSlice";

export default function NavBar() {
  const [haveToken, setHaveToken] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, user, err } = useSelector((state) => state.user);
  const token = Cookies.get("auth");
  useEffect(() => {
    if (token) {
      setHaveToken(true);
    }
  }, [0]);

  const [drawerActive, setDrawerActive] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (anchor === "bottom") setDrawerActive({ bottom: open });
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
        dispatch(addToast({ type: "info", msg: response.data.mess }));
        Cookies.remove("auth");
        Cookies.remove("id");
        window.location.replace("/?true=forget");
      }
    } catch (error) {
      console.log(error.response);
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="bg-white border-gray-200 dark:bg-slate-800 shadow-md lg:px-10">
      <div className="container">
        <nav className="navbar ">
          <div className="navbar-start">
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
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
              href="/"
              className="lg:flex items-center space-x-3 rtl:space-x-reverse hidden"
            >
              <img src={logo} className="h-12" alt="Flowbite Logo" />
              <span className="self-center font-serif text-2xl font-semibold whitespace-nowrap dark:text-slate-50">
                OrderNow
              </span>
            </a>
          </div>

          <a
            href="/"
            className="max-lg:flex items-center space-x-3 rtl:space-x-reverse hidden"
          >
            <img src={logo} className="h-9 max-sm:h-12 w-24" alt="logo" />
            <span className="self-center  max-sm:hidden  text-2xl font-semibold whitespace-nowrap dark:text-slate-50 font-serif">
              OrderNow
            </span>
          </a>
          <div className="w-full justify-center lg:flex hidden">
            <ul className="flex cursor-pointer navbar-ul main-nav">
              <NavLink to="/">
                <li className="nav-link">Home</li>
              </NavLink>

              <NavLink to="blog">
                <li className="nav-link">Blog</li>
              </NavLink>

              <NavLink to="contactus">
                <li className="nav-link">Contact Us</li>
              </NavLink>
              <li className="nav-link">
                <span onClick={toggleDrawer("bottom", true)}>Cart</span>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            {!haveToken && (
              <a
                href="/login"
                className="btn min-h-full  h-full rounded-full hover:bg-slate-600 hover:text-slate-100 border-slate-600 bg-transparent text-slate-600 py-3 px-6"
              >
                Login/Registration
              </a>
            )}
            {haveToken && (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={
                        (user &&
                          `http://localhost:5000/avatar/${user.avatar} `) ||
                        "default-avatar.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 border border-slate-100 p-2 shadow-[-5px_4px_31px_-12px] menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-[13]"
                >
                  <li>
                    <NavLink to="profile">Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="changepwd">Change Password</NavLink>
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
            )}
          </div>
        </nav>
        <Drawer
          anchor={"bottom"}
          open={drawerActive["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          <CheckOut closeBtn={toggleDrawer("bottom", false)} />
        </Drawer>
      </div>
    </div>
  );
}
