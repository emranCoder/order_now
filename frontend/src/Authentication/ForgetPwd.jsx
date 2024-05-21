import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import Info from "./Info";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export default function ForgetPwd() {
  const [active, setActive] = useState(false);
  const [resetPwd, setResetPwd] = useState(false);
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState({ type: "", msg: "", open: false });
  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    pwd: "",
    conPwd: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    pwd: "",
    conPwd: "",
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

    if (resetPwd) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!formData.pwd || !passwordRegex.test(formData.pwd)) {
        newErrors.pwd =
          "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
        valid = false;
      }
      if (!formData.conPwd || !passwordRegex.test(formData.conPwd)) {
        newErrors.conPwd =
          "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
        valid = false;
      }
      if (formData.pwd && formData.conPwd) {
        if (!(formData.pwd === formData.conPwd)) {
          newErrors.pwd = "Password & Confirm Password Do Not Match.";
          newErrors.conPwd = "Password & Confirm Password Do Not Match.";
          valid = false;
          setFormData({ ...formData, pwd: "", conPwd: "" });
        }
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const validateResetPwd = () => {
    let valid = true;
    const newErrors = { pwd: "", conPwd: "" };
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!formData.pwd || !passwordRegex.test(formData.pwd)) {
      newErrors.pwd =
        "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }
    if (!formData.conPwd || !passwordRegex.test(formData.conPwd)) {
      newErrors.conPwd =
        "Password must be at least 8 characters with at least one uppercase and one lowercase letter";
      valid = false;
    }
    if (formData.pwd && formData.conPwd) {
      if (!(formData.pwd === formData.conPwd)) {
        newErrors.pwd = "Password & Confirm Password Do Not Match.";
        newErrors.conPwd = "Password & Confirm Password Do Not Match.";
        valid = false;
        setFormData({ ...formData, pwd: "", conPwd: "" });
      }
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
          const response = await axios.post(
            `http://localhost:5000/api/verify/exist`,
            formData
          );
          if (response && response.status === 200) {
            setActive(true);
            setToast({
              type: "info",
              msg: response.data.message,
              open: true,
            });
            setLoader(false);
          }
        } else if (resetPwd) {
          if (validateResetPwd()) {
            const response = await axios.post(
              `http://localhost:5000/api/login/reset`,
              formData
            );
            if (response && response.status === 200) {
              setResetPwd(false);

              setToast({
                type: "success",
                msg: response.data.mess,
                open: true,
              });
              setTimeout(() => {
                window.location.replace("/login?reset=true");
              }, "2s");
            }
          }
        } else {
          if (validateOtp()) {
            const response = await axios.post(
              `http://localhost:5000/api/verify/otp`,
              formData
            );
            if (response && response.status === 200) {
              setActive(true);
              setToast({
                type: "info",
                msg: response.data.message,
                open: true,
              });
              setFormData({ ...formData, otp: "" });
              setResetPwd(true);
              setLoader(false);
            }
          }
        }
      } catch (error) {
        if (error && error.response) {
          setLoader(false);
          if (error.response.data.err) {
            setToast({
              type: "info",
              msg: error.response.data.err,
              open: true,
            });
          }
        }
      }
    }
    setLoader(false);
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container-fluid bg-slate-50 py-10 h-svh content-center">
      {loader && <Loading />}
      <div className="w-80 mt-5 absolute right-5 z-20 px-0 shadow-lg">
        <Collapse in={toast.open}>
          <Alert
            severity={toast.type}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setToast({ ...toast, open: false });
                  setTimeout(() => {
                    setToast({ type: "", msg: "", open: true });
                  }, 1000);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {toast.msg}
          </Alert>
        </Collapse>
      </div>
      <div className="container-row justify-center content-center flex-start items-center m-auto">
        <div className="col-lg-1 max-md:block hidden max-sm:block mt-0">
          {" "}
          <h3 className="text-[50px] font-serif font-bold text-slate-800 mb-10 mt-8">
            OrderNow
          </h3>
        </div>
        <div className="col-lg-5 col-md-9 max-sm:w-full">
          <div className="login-form bg-base-100 max-sm:p-10  p-16 border rounded-xl shadow-lg  ">
            <h3 className="text-3xl font-semibold text-slate-800 ">
              Reset Password
            </h3>
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
              {!resetPwd && (
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
              )}
              {active && !resetPwd && (
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

              {resetPwd && (
                <div>
                  <TextField
                    disabled={active && false}
                    fullWidth
                    className="!border-slate-700 "
                    label="Password"
                    name="pwd"
                    type="password"
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
                  <TextField
                    disabled={active && false}
                    fullWidth
                    className="!border-slate-700 "
                    label="Confirm Password"
                    name="conPwd"
                    type="password"
                    value={formData.conPwd}
                    onChange={handleChange}
                    error={Boolean(errors.conPwd)}
                    helperText={errors.conPwd}
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
                </div>
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
