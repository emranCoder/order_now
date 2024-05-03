import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Loading from "../component/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminCredential() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [err, setErr] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
    if (state) {
      setErr(state);
      Cookies.remove("auth");
      Cookies.remove("id");
    }
  }, [0]);

  const [formData, setFormData] = useState({
    username: "emranalam645@gmail.com",
    pwd: "Emran@1234",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    pwd: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", pwd: "" };

    if (!formData.username) {
      newErrors.username = "Username is required";
      valid = false;
    }

    // Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!formData.pwd || !passwordRegex.test(formData.pwd)) {
      newErrors.pwd =
        "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        let response = await axios.post(
          "http://localhost:5000/api/login/",
          formData,
          {
            headers: {
              form: "admin-credential",
            },
          }
        );

        if (response && response.status === 200) {
          const { message, user, token } = response.data;
          if (user.role === "admin") {
            Cookies.set("id", user._id, process.env.REACT_AUTH_EXP);
            Cookies.set("auth", token, process.env.REACT_AUTH_EXP);

            window.location.replace("/dashboard");
          } else {
            setErr("Wrong Credential.");
          }
        }
      } catch (error) {
        if (error.response.data.err) {
          console.log(error.response.data);

          if (
            error.response.data.err ===
            "Please try to login with your username & password!"
          )
            setErr(error.response.data.err);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rememberMe" ? checked : value,
    });
  };

  return (
    <div className="container-fluid bg-slate-50 py-10 h-svh">
      {loader && <Loading />}
      <div className="container-row justify-center content-center flex-start items-center m-auto">
        <div className="col-lg-1 max-md:block hidden max-sm:block mt-0">
          {" "}
          <h3 className="text-[50px] font-serif font-bold text-slate-800 mb-10 mt-8">
            OrderNow
          </h3>
        </div>
        <div className="col-lg-5 col-md-9 max-sm:w-full">
          <div className="login-form bg-base-100 max-sm:p-10  p-16 border rounded-xl shadow-lg  ">
            <h3 className="text-3xl font-semibold text-slate-800 ">Welcome</h3>
            <p className="my-2 text-slate-500">Login to Continue</p>

            <form
              onSubmit={handleSubmit}
              className="flex items-center flex-col mt-5"
            >
              <span className="text-red-600">{err}</span>
              <TextField
                fullWidth
                className="!border-slate-700 "
                label="Email"
                name="username"
                value={formData.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
                margin="normal"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  "& .MuiInputBase-formControl": { borderRadius: "10px" },
                  "& .MuiInputBase-input": {
                    paddingBottom: "10px",
                    paddingTop: "22px",
                  },
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(12px, 9px) scale(0.75)",
                    paddingBottom: "10px",
                  },
                  "& .Mui-focused": {
                    color: "rgb(2 132 199) !important",
                  },

                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(2 132 199)",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                error={Boolean(errors.pwd)}
                helperText={errors.pwd}
                margin="normal"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  "& .MuiInputBase-formControl": { borderRadius: "10px" },
                  "& .MuiInputBase-input": {
                    paddingBottom: "10px",
                    paddingTop: "22px",
                  },
                  "& .MuiInputLabel-shrink": {
                    transform: "translate(12px, 9px) scale(0.75)",
                    paddingBottom: "10px",
                  },
                  "& .Mui-focused": {
                    color: "rgb(2 132 199) !important",
                  },

                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "rgb(2 132 199)",
                    },
                  },
                }}
              />
              <div className="form-control float-end flex-row w-full">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    className="checkbox checked:!bg-slate-600"
                  />
                  <span className="label-text ml-5">Remember me</span>
                </label>
              </div>
              <button
                type="btn"
                className="mt-5 rounded-full p-0 font-semibold w-full  bg-slate-700 btn hover:bg-slate-600 text-slate-100 overflow-hidden"
              >
                <Mui.ListItemButton
                  className="!flex !justify-center"
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    height: "100%",
                    padding: "0px 20px",
                  }}
                >
                  Continue
                </Mui.ListItemButton>
              </button>
              <label className="label mt-3">
                <a
                  href="#"
                  className="label-text-alt link link-hover hover:!text-slate-800"
                >
                  Forgot password?
                </a>
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
