import React, { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../component/Loading";
import { addToast } from "../redux/ToastSlice";
import { useDispatch } from "react-redux";

export default function ChangePwd() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const id = Cookies.get("id");
  const token = Cookies.get("auth");

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);

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

  const handleSubmit = async () => {
    setLoader(true);
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
          dispatch(addToast({ type: "success", msg: message }));
          setLoader(false);
          setTimeout(() => {
            Cookies.remove("auth");
            Cookies.remove("id");
            localStorage.clear();
            window.location.replace("/login");
          }, 2000);
        }
      } catch (error) {
        if (error && error.response.data) {
          console.log(error.response.data);
          if (error.response.data.mess) {
            dispatch(
              addToast({ type: "error", msg: error.response.data.mess })
            );
          }
        }
      }
    }
    setLoader(false);
  };

  return (
    <section className="order-section">
      {loader && <Loading />}
      <div className="container rounded-xl px-10 py-16 max-sm:p-5 max-md:px-5 bg-white m-5">
        <div className="container-row">
          <div className="col-lg-12">
            <form
              className="mx-auto px-5 "
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h3 className="mb-3 text-4xl ">Change password</h3>
              <div className="container my-10">
                <div className="container-row max-sm:gap-5 gap-10 justify-center">
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="currentpwd" className="text-slate-700">
                      Current Password*
                    </label>
                    <label
                      className={`!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3 ${
                        error.currentPwd.length > 0 && "!border-red-600 "
                      }`}
                    >
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="Current Password"
                        name="currentPwd"
                        onChange={handleOnChange}
                        required
                      />
                    </label>
                    {error.currentPwd.length > 0 && (
                      <span className="text-sm text-red-600">
                        {error.currentPwd}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="newpwd" className="text-slate-700">
                      New Password*
                    </label>
                    <label
                      className={`!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3 ${
                        error.pwd.length > 0 && "!border-red-600 "
                      }`}
                    >
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="New Password"
                        name="pwd"
                        onChange={handleOnChange}
                        required
                      />
                    </label>
                    {error.pwd.length > 0 && (
                      <span className="text-sm text-red-600">{error.pwd}</span>
                    )}
                  </div>{" "}
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="conpwd" className="text-slate-700">
                      Confirm Password*
                    </label>
                    <label
                      className={`!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3 ${
                        error.conPwd.length > 0 && "!border-red-600 "
                      }`}
                    >
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="Confirm Password"
                        name="conPwd"
                        onChange={handleOnChange}
                        required
                      />
                    </label>
                    {error.conPwd.length > 0 && (
                      <span className="text-sm text-red-600">
                        {error.conPwd}
                      </span>
                    )}
                    <div className="justify-end flex my-10">
                      <button
                        onClick={handleSubmit}
                        type="submit"
                        className={`text-slate-50 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 cursor-pointer  ${
                          info.conPwd && info.currentPwd && info.pwd
                            ? ""
                            : "btn-disabled"
                        }`}
                        aria-disabled={`${
                          info.conPwd && info.currentPwd && info.pwd
                            ? "false"
                            : "true"
                        }`}
                      >
                        Save & Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
