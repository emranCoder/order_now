import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../img/orderNow.png";

export default function NavBar() {
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
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                OrderNow
              </span>
            </a>
          </div>

          <a
            href="/"
            className="max-lg:flex items-center space-x-3 rtl:space-x-reverse hidden"
          >
            <img src={logo} className="h-9 max-sm:h-12 w-24" alt="logo" />
            <span className="self-center  max-sm:hidden  text-2xl font-semibold whitespace-nowrap dark:text-white">
              OrderNow
            </span>
          </a>
          <div className="flex w-full justify-center">
            <ul className="flex cursor-pointer navbar-ul main-nav">
              <NavLink to="/">
                <li className="nav-link">Home</li>
              </NavLink>

              <li className="nav-link">
                <a>Product</a>
              </li>
              <li className="nav-link">
                <a>Offers</a>
              </li>
              <NavLink to="contactus">
                <li className="nav-link">Contact Us</li>
              </NavLink>
              <li className="nav-link">
                <a>Cart</a>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] border border-red-100 p-2 shadow-[-5px_4px_31px_-12px] menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="#" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
