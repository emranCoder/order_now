import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import Info from "./Info";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/ToastSlice";
import Loading from "../component/Loading";

export default function Credential() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
  });

  const validateEmail = () => {
    let valid = true;
    const newErrors = { email: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const validateOtp = () => {
    let valid = true;
    const newErrors = { otp: "" };

    if (!formData.otp) {
      newErrors.otp = "Field is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      setLoader(true);
      try {
        if (!formData.otp && !active) {
          validateEmail();
          const response = await axios.post(
            `http://localhost:5000/api/verify/`,
            formData
          );
          if (response && response.status === 200) {
            dispatch(addToast({ type: "success", msg: response.data.message }));
            setActive(true);
            setLoader(false);
          }
        } else {
          if (validateOtp()) {
            const response = await axios.post(
              `http://localhost:5000/api/verify/otp`,
              formData
            );
            if (response && response.status === 200) {
              dispatch(addToast({ type: "info", msg: response.data.message }));
              navigate("/registration", { state: formData });
            }
          }
        }
      } catch (error) {
        if (error && error.response) {
          if (error.response.data) {
            if (error.response.data.err.email) {
              const err = error.response.data.err.email.msg;
              setErrors({ email: err });
            } else {
              dispatch(
                addToast({ type: "error", msg: error.response.data.err })
              );
            }
          }
          setLoader(false);
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
            <p className="my-2 text-slate-500">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-slate-600 hover:text-slate-800 hover:underline"
              >
                {" "}
                Login
              </Link>
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex items-center flex-col mt-5"
            >
              <TextField
                disabled={(active && true) || false}
                fullWidth
                type="email"
                label="Email (E.g. abc@gmail.com)"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  "& .MuiInputBase-formControl": { borderRadius: "10px" },
                  "& .MuiInputBase-input": {
                    paddingBottom: "10px",
                    paddingTop: "25px",
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
              {active && (
                <TextField
                  disabled={active && false}
                  fullWidth
                  onKeyPress={(e) => {
                    if (!/\d/.test(e.key)) e.preventDefault();
                  }}
                  className="!border-slate-700 "
                  label="OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  error={Boolean(errors.otp)}
                  helperText={errors.otp}
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
              )}
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
                  {(active && "Continue") || "GET OTP"}
                </Mui.ListItemButton>
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6 lg:block hidden">
          <Info />
        </div>
      </div>
    </div>
  );
}
