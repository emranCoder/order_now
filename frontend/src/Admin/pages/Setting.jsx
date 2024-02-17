import React from "react";
import * as Mui from "@mui/material";
import Animation from "../spinner/Animation";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyIcon from "@mui/icons-material/Key";
import PasswordIcon from "@mui/icons-material/Password";
export default function Setting() {
  return (
    <Animation>
      <div className="rounded-xl border shadow-lg mb-28 p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          <div className="setting-box lg:pt-0 p-5">
            <h3 className="text-2xl font-semibold text-slate-600">Profile</h3>
            <div className="container mt-12">
              <div className="container-row  md:justify-center">
                <div className="col-lg-4 max-sm:w-full pr-1 lg:border-r">
                  <div className="avt-box flex flex-col items-center">
                    <div className="avatar">
                      <div className="w-24 mask mask-squircle">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                    <div className="avt-dtl text-center my-5">
                      <h3 className="font-semibold text-[1.5rem]">
                        Ariana Grande
                      </h3>
                      <p className="text-slate-600">Admin</p>
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
                          name="staffImage"
                          id="fileInput"
                          placeholder="Upload Image"
                          className="file-input w-full file-input-sm  hidden"
                          accept="image/*"
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
                          type="text"
                          placeholder="First Name"
                          className="input input-md py-2 input-bordered w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50"
                          required
                        />
                      </div>
                      <div className="col-md-6 max-sm:pl-0 pl-3 max-sm:w-full">
                        <label className="text-slate-700 ml-1 text-sm">
                          Last Name*
                        </label>
                        <input
                          type="text"
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
                        <label className="input input-bordered flex items-center gap-2  input-md py-2  w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50">
                          <EmailIcon
                            className="text-slate-500"
                            sx={{ fontSize: 20 }}
                          />
                          <input
                            type="email"
                            placeholder="Email Address*"
                            className="grow w-full "
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
                            type="text"
                            placeholder="Phone Number*"
                            className="w-full "
                            required
                          />
                        </label>
                      </div>
                    </div>
                    <div className="container-row mt-4">
                      <div className="col-md-6 max-sm:pr-0 pr-3  max-sm:w-full">
                        <label className="text-slate-700 ml-1">Country*</label>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="input input-md py-2 input-bordered w-full focus-within:outline-none focus-within:border-sky-800 hover:bg-slate-50"
                          required
                        />
                      </div>
                      <div className="col-md-6 max-sm:pl-0 pl-3 max-sm:w-full">
                        <label className="text-slate-700 ml-1 text-sm">
                          State*
                        </label>

                        <select
                          className="select select-bordered   rounded-lg w-full focus:outline-none focus:border-sky-800 hover:bg-slate-50 focus:ring-sky-800 focus:ring-1oc"
                          defaultValue="1"
                          name="staffRole"
                        >
                          <option disabled value="1">
                            Choose Country
                          </option>
                          <option>Manager</option>
                          <option>Head. Chef</option>
                          <option>Assistant Chef</option>
                          <option>Steward</option>
                          <option>Cleaner</option>
                          <option>Guard</option>
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
              </div>
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
                          required
                        />
                      </label>
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
                          required
                        />
                      </label>
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
                          className="grow w-full "
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div className="container-row max-sm:w-full">
                    <div className="col-md-8 "></div>
                    <div className="col-md-4 ">
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
  );
}
