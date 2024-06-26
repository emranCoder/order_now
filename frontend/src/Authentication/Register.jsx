import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/ToastSlice";
import Loading from "../component/Loading";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loader, setLoader] = useState(true);
  const [conPwd, setConPwd] = useState("");
  const [err, setErr] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: state.email,
    mobile: "",
    dateOfBirth: "",
    pwd: "",
  });

  const [errors, setErrors] = useState({
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    pwd: "",
  });

  const handleConPwd = (e) => {
    setConPwd(e.target.value);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fName: "",
      lName: "",
      email: "",
      mobile: "",
      dateOfBirth: "",
      pwd: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!formData.fName) {
      newErrors.fName = "Field is empty!";
      valid = false;
    }
    if (!formData.lName) {
      newErrors.lName = "Field is empty!";
      valid = false;
    }
    if (!formData.mobile) {
      newErrors.mobile = "Field is empty!";
      valid = false;
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Field is empty!";
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
    if (!(conPwd == formData.pwd)) {
      setFormData({ ...formData, pwd: "" });
      setConPwd("");
      setErrors({ ...errors, pwd: true });
    }
    if (validateForm() && conPwd === formData.pwd) {
      const uploadData = { ...formData, mobile: "+88" + formData.mobile };
      try {
        let response = await axios.post(
          `http://localhost:5000/api/auth/createuser`,
          uploadData
        );

        if (response && response.status === 200) {
          dispatch(addToast({ type: "info", msg: response.data.message }));
          navigate("/login");
        }
      } catch (error) {
        if (error && error.response.data.err) {
          setErr(error.response.data.err);
          console.log(error.response.data.err);
          if (error.response.data.err.fName) {
            setErrors({ ...errors, fName: error.response.data.err.fName.msg });
          } else if (error.response.data.err.lName) {
            setErrors({ ...errors, lName: error.response.data.err.lName.msg });
          } else if (error.response.data.err.email) {
            setErrors({ ...errors, email: error.response.data.err.email.msg });
          } else if (error.response.data.err.mobile) {
            setErrors({ ...errors, email: error.response.data.err.mobile.msg });
          } else if (error.response.data.err.dateOfBirth) {
            setErrors({
              ...errors,
              dateOfBirth: error.response.data.err.dateOfBirth.msg,
            });
          } else if (error.response.data.err.pwd) {
            setErrors({ ...errors, pwd: error.response.data.err.pwd.msg });
          }
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleBob = (e) => {
    let { $y, $M, $D } = e;
    $M = $M + 1;
    $M = $M < 10 ? "0" + $M : $M;
    $D = $D < 10 ? "0" + $D : $D;
    const bob = $y + "-" + $M + "-" + $D;
    setFormData({
      ...formData,
      dateOfBirth: bob,
    });
  };

  return (
    <div className="container-fluid bg-slate-50 py-10 ">
      {loader && <Loading />}
      <div className="container-row justify-center content-center flex-start items-center m-auto">
        <div className="col-lg-1 max-md:block hidden max-sm:block mt-0">
          {" "}
          <h3 className="text-[50px] font-serif font-bold text-slate-800 mb-10 mt-8">
            OrderNow
          </h3>
        </div>
        <div className="col-lg-8 col-md-9 max-sm:w-full">
          <div className="login-form bg-base-100 max-sm:p-10  p-16 border rounded-xl shadow-lg  ">
            <h3 className="text-3xl font-semibold text-slate-800 ">Welcome!</h3>
            <p className="my-2 text-slate-500">
              Have an account?
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
              <div className="container">
                <div className="container-row">
                  <div className="col-lg-6 col-md-6 col-sm-12 pr-1 max-sm:pr-0 max-sm:w-full">
                    <TextField
                      fullWidth
                      className="!border-slate-700 "
                      label="First Name"
                      name="fName"
                      value={formData.fName}
                      onChange={handleChange}
                      error={Boolean(errors.fName)}
                      helperText={errors.fName}
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
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 pl-1 max-sm:pl-0 max-sm:w-full">
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lName"
                      value={formData.lName}
                      onChange={handleChange}
                      error={Boolean(errors.lName)}
                      helperText={errors.lName}
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
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 lg:pr-1 max-sm:w-full">
                    <TextField
                      disabled={formData.email && true}
                      className="bg-stone-100"
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
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12 lg:pr-1  max-sm:w-full">
                    <TextField
                      fullWidth
                      className="!border-slate-700 "
                      label="Phone NO. (E.g. +8801.....)"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      error={Boolean(errors.mobile)}
                      helperText={errors.mobile}
                      onKeyPress={(e) => {
                        if (!/^[0-9\b]+$/.test(e.key)) e.preventDefault();
                      }}
                      margin="normal"
                      inputProps={{ "ng-pattern": "/^(?:+88|01)?d{11}\r?$/" }}
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
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12 lg:pl-1 lg:flex items-center max-sm:w-full">
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      className="w-full"
                    >
                      <DemoContainer
                        components={["DatePicker"]}
                        className="w-full"
                      >
                        <DatePicker
                          type="date"
                          inputProps={{ "data-shrink": "true" }}
                          className="!border-slate-700 w-full"
                          label="Date Of Birth"
                          name="dateOfBirth"
                          onChange={handleBob}
                          error={Boolean(errors.dateOfBirth)}
                          helperText={errors.dateOfBirth}
                          margin="normal"
                          sx={{
                            "& legend": { display: "none" },
                            "& fieldset": { top: 0 },
                            "& .MuiInputBase-formControl": {
                              borderRadius: "10px",
                            },
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
                      </DemoContainer>
                    </LocalizationProvider>
                  </div>
                  <div className="col-lg-12  col-md-12 col-sm-12 pl-1 max-sm:w-full">
                    <TextField
                      fullWidth
                      type="password"
                      label="Password*"
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
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12  max-sm:w-full">
                    <TextField
                      onChange={handleConPwd}
                      fullWidth
                      type="password"
                      label="Confirm Password*"
                      name="conPwd"
                      value={conPwd}
                      margin="normal"
                      error={Boolean(errors.pwd)}
                      helperText={
                        Boolean(errors.pwd) && "Please confirm password!"
                      }
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
                  </div>
                </div>
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
