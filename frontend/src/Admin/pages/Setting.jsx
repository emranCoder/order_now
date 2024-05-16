import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import Animation from "../spinner/Animation";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import PasswordIcon from "@mui/icons-material/Password";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/AuthSlice";
import Cookies from "js-cookie";
import axios from "axios";
import Toast from "../Alert/Toast";

const countryName = ["Bangladesh"];

export default function Setting() {
  const dispatch = useDispatch();
  const [previewFile, setPreviewFIle] = useState(null);
  const { isLoading, user, err } = useSelector((state) => state.user);
  const [msg, setMsg] = useState(null);
  const id = Cookies.get("id");
  const [success, setSuccess] = useState(null);
  const token = Cookies.get("auth");
  const [info, setInfo] = useState({
    currentPwd: "",
    pwd: "",
    conPwd: "",
    id: id,
  });
  const [error, setError] = useState({
    currentPwd: "",
    pwd: "",
    conPwd: "",
  });

  useEffect(() => {
    dispatch(fetchUser());
  }, [0]);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    let userUpdate = new FormData(e.target);
    userUpdate.append("id", user._id);
    userUpdate.append("oldImg", user.avatar);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/updateuser`,
        userUpdate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: Cookies.get("auth"),
          },
        }
      );

      if (response && response.status === 200) {
        const { message, user } = response.data;
        setMsg({ msg: message });
        dispatch(fetchUser());
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const formValidate = () => {
    let valid = true;
    const error = {
      currentPwd: "",
      pwd: "",
      conPwd: "",
    };
    if (!info.currentPwd) {
      error.currentPwd = "Current Password is required";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!info.pwd || !passwordRegex.test(info.pwd)) {
      error.pwd =
        "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    if (!info.conPwd || !passwordRegex.test(info.conPwd)) {
      error.conPwd =
        "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }
    if (!info.pwd) {
      error.pwd = "Password is required";
      valid = false;
    }
    if (!info.conPwd) {
      error.conPwd = "Confirm Password is required";
      valid = false;
    }
    if (info.pwd && info.conPwd) {
      if (!(info.pwd === info.conPwd)) {
        error.pwd = "Password is not match";
        error.conPwd = "Confirm Password is not match";
        setInfo({ ...info, pwd: "", conPwd: "" });
        valid = false;
      }
    }
    setError(error);
    return valid;
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInfo({ ...info, [name]: value });
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

  const handleSubmit = async () => {
    if (formValidate()) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/auth/updateuser`,
          info,
          {
            headers: {
              token: token,
            },
          }
        );

        if (response && response.status === 200) {
          const { message, user } = response.data;
          setMsg({ type: "success", msg: message });
          logOut();
        }
      } catch (error) {
        if (error && error.response.data) {
          console.log(error.response.data);
          if (error.response.data.mess) {
            setMsg({ type: "del", msg: error.response.data.mess });
          }
        }
      }
    }
  };

  return (
    user && (
      <Animation>
        <div className="rounded-xl border shadow-lg mb-28 p-10 max-sm:px-0 px-5 max-sm:py-5">
          <div className="container overflow-hidden">
            {msg && (
              <Toast
                msg={msg}
                control={() => {
                  setMsg(null);
                }}
              />
            )}
            <div className="setting-box lg:pt-0 p-5">
              <h3 className="text-2xl font-semibold text-slate-600">Profile</h3>
              <div className="container mt-12">
                <form
                  onSubmit={handleUpdateUser}
                  className="container-row  md:justify-center"
                  encType="multipart/form-data"
                  method="dialog"
                >
                  <div className="col-lg-4 max-sm:w-full pr-1 lg:border-r">
                    <div className="avt-box flex flex-col items-center">
                      <div className="avatar">
                        <div className="w-24 mask mask-squircle">
                          <img
                            src={
                              previewFile
                                ? previewFile
                                : `http://localhost:5000/avatar/${
                                    (user && user.avatar) ||
                                    "default-avatar.png"
                                  }`
                            }
                          />
                        </div>
                      </div>
                      <div className="avt-dtl text-center my-5">
                        <h3 className="font-semibold text-[1.5rem]">
                          {user.fName + " " + user.lName}
                        </h3>
                        <p className="text-slate-600 capitalize">{user.role}</p>
                      </div>
                      <div className="w-full overflow-hidden rounded-lg  max-sm:mt-0">
                        <Mui.ListItemButton
                          sx={{
                            width: "100%",
                            height: "100%",
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          <label
                            onClick={() => {
                              document.getElementById("fileInput").click();
                            }}
                            htmlFor="files"
                            className="btn w-full !bg-transparent !outline-none !border-0 font-semibold text-sky-800 rounded-lg"
                          >
                            Upload Picture
                          </label>
                          <input
                            type="file"
                            name="avatar"
                            id="fileInput"
                            placeholder="Upload Image"
                            className="file-input w-full file-input-sm  hidden"
                            accept="image/*"
                            onChange={(e) => {
                              let fileName = e.target.files[0];
                              let preview = URL.createObjectURL(fileName);
                              setPreviewFIle(preview);
                            }}
                          />
                        </Mui.ListItemButton>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8 max-sm:w-full pl-3 max-sm:p-0">
                    <div className="divider lg:hidden flex"></div>
                    <div className="container">
                      <div className="container-row mb-0">
                        <div className="col-md-6 max-sm:pr-0 pr-3 max-sm:w-full">
                          <label className="text-slate-700 ml-1">
                            First Name*
                          </label>
                          <input
                            defaultValue={user.fName}
                            type="text"
                            placeholder="First Name"
                            name="fName"
                            className="input input-md py-2 input-bordered w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50"
                            required
                          />
                        </div>
                        <div className="col-md-6 max-sm:pl-0 pl-3 max-sm:w-full">
                          <label className="text-slate-700 ml-1 text-sm">
                            Last Name*
                          </label>
                          <input
                            defaultValue={user.lName}
                            type="text"
                            name="lName"
                            placeholder="Last Name"
                            className="input input-md py-2 input-bordered w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50"
                          />
                        </div>
                      </div>
                      <div className="container-row mt-3">
                        <div className="col-md-6 max-sm:pr-0 pr-3 max-sm:w-full">
                          <label className="text-slate-700 ml-1 text-sm">
                            Email Address*
                          </label>
                          <label className="input input-bordered flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800 bg-slate-50">
                            <EmailIcon
                              className="text-slate-500"
                              sx={{ fontSize: 20 }}
                            />
                            <input
                              disabled
                              defaultValue={user.email}
                              type="email"
                              placeholder="Email Address*"
                              className="grow w-full"
                              required
                            />
                          </label>
                        </div>
                        <div className="col-md-6 max-sm:pl-0 pl-3 max-sm:w-full">
                          <label className="text-slate-700 ml-1 text-sm">
                            Phone Number*
                          </label>
                          <label className="input input-bordered flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50">
                            <LocalPhoneIcon
                              className="text-slate-500"
                              sx={{ fontSize: 20 }}
                            />

                            <input
                              defaultValue={user.mobile}
                              type="text"
                              name="mobile"
                              placeholder="Phone Number*"
                              className="w-full "
                              required
                            />
                          </label>
                        </div>
                      </div>
                      <div className="container-row mt-4">
                        <div className="col-md-6 max-sm:pr-0 pr-3  max-sm:w-full">
                          <label className="text-slate-700 ml-1">State*</label>
                          <input
                            defaultValue={user.city}
                            type="text"
                            name="city"
                            placeholder="Type city"
                            className="input input-md py-2 input-bordered w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50"
                            required
                          />
                        </div>
                        <div className="col-md-6 max-sm:pl-0 pl-3 max-sm:w-full">
                          <label className="text-slate-700 ml-1 text-sm">
                            Country*
                          </label>

                          <select
                            className="select select-bordered   rounded-lg w-full focus:outline-none focus:border-sky-800 hover:bg-slate-50 focus:ring-sky-800 focus:ring-1oc"
                            name="country"
                            defaultValue={user.country}
                          >
                            <option disabled value="1">
                              Choose Country
                            </option>
                            {countryName.map((value, key) => (
                              <option value={value} key={key}>
                                {value}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="container-row">
                        <div className="col-md-8"></div>
                        <div className="col-md-4">
                          <div className="flex justify-end my-5">
                            <button
                              type="btn"
                              className="rounded-lg p-0 font-semibold w-auto bg-slate-800 btn hover:bg-slate-700 text-slate-100 overflow-hidden"
                            >
                              <Mui.ListItemButton
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  padding: "0px 20px",
                                }}
                              >
                                Save Details
                              </Mui.ListItemButton>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="divider"></div>
                <div className="container-row lg:justify-normal  md:justify-center mt-8">
                  <h3 className="text-2xl font-semibold text-slate-600 mb-5">
                    Credential Management
                  </h3>
                  <div className="container my-5 mb-0 max-sm:w-full max-sm:pr-0">
                    <div className="container-row max-sm:w-full max-sm:p-0">
                      <div className="col-md-4 pr-1 max-sm:w-full max-sm:p-0">
                        <label className="text-slate-700 m-1">
                          Current Password*
                        </label>
                        <label className="input input-bordered  mt-2 flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800  hover:bg-slate-50">
                          <KeyIcon
                            className="text-slate-500"
                            sx={{ fontSize: 20 }}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="grow w-full "
                            onChange={handleOnChange}
                            name="currentPwd"
                            required
                          />
                        </label>
                        {error.currentPwd.length > 0 && (
                          <span className="text-sm text-red-600">
                            {error.currentPwd}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4 px-1 max-sm:w-full max-sm:p-0">
                        <label className="text-slate-700 m-1">
                          New Password*
                        </label>
                        <label className="input input-bordered mt-2 flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50">
                          <PasswordIcon
                            className="text-slate-500"
                            sx={{ fontSize: 20 }}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            className="grow w-full "
                            onChange={handleOnChange}
                            name="pwd"
                            required
                          />
                        </label>
                        {error.pwd.length > 0 && (
                          <span className="text-sm text-red-600">
                            {error.pwd}
                          </span>
                        )}
                      </div>
                      <div className="col-md-4 pl-1 max-sm:w-full max-sm:p-0">
                        <label className="text-slate-700 m-1">
                          Confirm Password*
                        </label>
                        <label className="input mt-2 input-bordered flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50">
                          <PasswordIcon
                            className="text-slate-500"
                            sx={{ fontSize: 20 }}
                          />
                          <input
                            type="password"
                            placeholder="Password"
                            name="conPwd"
                            className="grow w-full "
                            onChange={handleOnChange}
                            required
                          />
                        </label>
                        {error.conPwd.length > 0 && (
                          <span className="text-sm text-red-600">
                            {error.conPwd}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="container-row max-sm:w-full">
                      <div className="col-md-8 "></div>
                      <div className="col-md-4 ">
                        <div className="flex justify-end my-5">
                          <button
                            onClick={handleSubmit}
                            type="btn"
                            className="rounded-lg p-0 font-semibold w-auto bg-slate-800 btn hover:bg-slate-700 text-slate-100 overflow-hidden"
                          >
                            <Mui.ListItemButton
                              sx={{
                                width: "100%",
                                height: "100%",
                                padding: "0px 20px",
                              }}
                            >
                              Change Password
                            </Mui.ListItemButton>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Animation>
    )
  );
}
