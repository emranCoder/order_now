import React, { useEffect, useState } from "react";
import Loading from "../component/Loading";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/ToastSlice";
import axios from "axios";

export default function ContactUs() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = () => {
    let valid = true;
    const newErrors = { email: "", subject: "", message: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    }
    if (!formData.subject) {
      newErrors.subject = "Subject is required";
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = "Message is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFormData()) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/message/`,
          formData
        );

        if (response && response.status === 200) {
          const { mess } = response.data;
          dispatch(addToast({ type: "info", msg: mess }));
          setFormData({
            email: "",
            subject: "",
            message: "",
          });
        }
      } catch (error) {
        if (error.response.data.err) {
          setFormData({
            email: "",
            subject: "",
            message: "",
          });
          dispatch(addToast({ type: "error", msg: error.response.data.err }));
        }
      }
    }
  };

  return (
    <section className="order-section p-5 ">
      {loader && <Loading />}
      <div className="container  rounded-xl px-10 py-10 max-sm:p-5 max-md:px-5 bg-white">
        <div className="container-row justify-center">
          <div className="col-lg-12 mb-5">
            <h3 className="flex justify-center text-4xl font-semibold text-slate-600">
              Contact Us
            </h3>
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 pr-1">
            <div className="contact-box p-10 flex items-center h-full ">
              <ul className="lg:space-y-12 lg:space-x-0 md:space-y-0 md:space-x-5 flex lg:flex-col md:flex-row space-y-12 flex-col">
                <li className="flex gap-x-5  items-center">
                  <div className="cnt-icon text-slate-600 text-2xl">
                    <FaPhoneAlt />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-slate-600 ">
                    <span className="ml-4"> +8801800000000</span>
                  </p>
                </li>
                <li className="flex gap-x-5 items-center">
                  <div className="cnt-icon text-slate-600 text-2xl">
                    <IoMdMail />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-slate-600 ">
                    <span className="ml-4">contact@mail.com</span>
                  </p>
                </li>
                <li className="flex gap-x-5 items-center">
                  <div className="cnt-icon text-slate-600 text-2xl ">
                    <FaLocationDot />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-slate-600 ">
                    <span className="ml-4">Sylhet,Bangladesh</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12 pl-1 md:mt-10">
            <form
              action="#"
              className="space-y-2 p-10 rounded-xl border shadow"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Your email
                </label>

                <input
                  type="email"
                  placeholder="Email.."
                  className={`input input-bordered w-full input-md text-slate-700 focus-within:border-slate-500 focus-within:outline-none 
                  bg-gray-50 ${errors.email ? "border-rose-500" : ""}`}
                  onChange={handleOnChange}
                  value={formData.email}
                  name="email"
                  required
                />
                {errors.email && (
                  <small className="text-rose-500">{errors.email}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300"
                >
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Subject..."
                  className={`input input-bordered w-full input-md text-slate-700 focus-within:border-slate-500 focus-within:outline-none 
                  bg-gray-50 ${errors.subject ? "border-rose-500" : ""}`}
                  onChange={handleOnChange}
                  value={formData.subject}
                  name="subject"
                  required
                />
                {errors.subject && (
                  <small className="text-rose-500">{errors.subject}</small>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  className={`textarea textarea-bordered w-full text-slate-700 focus-within:border-slate-500 !outline-none bg-gray-50 ${
                    errors.message ? "border-rose-500" : ""
                  }`}
                  rows={3}
                  placeholder="Leave Comment.."
                  onChange={handleOnChange}
                  value={formData.message}
                  name="message"
                  required
                ></textarea>
                {errors.message && (
                  <small className="text-rose-500">{errors.message}</small>
                )}
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="btn mt-5  min-h-full  h-full py-3 px-5 rounded-full border-slate-600 bg-transparent hover:bg-slate-800 hover:text-white text-slate-500"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
