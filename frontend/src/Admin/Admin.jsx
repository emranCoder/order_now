import React, { useEffect } from "react";
import Header from "./Header";
import SideMenu from "./SideMenu";
import { useNavigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/AuthSlice";

export default function Admin() {
  const dispatch = useDispatch();
  const [verify, setVerify] = useState(null);
  useEffect(() => {
    getUserData();
  });

  const navigate = useNavigate();
  const token = Cookies.get("auth");

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/user/`, {
        headers: {
          token: token,
        },
      });
      if (response && response.status === 200) {
        const { role } = response.data.user;
        if (role === "admin") {
          setVerify(true);
          dispatch(fetchUser());
        } else {
          navigate("/admin-login", {
            state: "Please Login with username & password",
          });
        }
      }
    } catch (error) {
      if (error) {
        navigate("/admin-login", {
          state: "Please Login with username & password",
        });
      }
    }
  };

  return (
    verify && (
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
    )
  );
}
