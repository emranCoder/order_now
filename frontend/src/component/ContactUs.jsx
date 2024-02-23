import React, { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="order-section p-5 ">
      <div className="container  rounded-xl px-10 py-10 max-sm:p-5 md:px-5 bg-white">
        <div className="container-row max-sm:justify-center">
          <div className="col-lg-6 col-md-6 col-sm-12 pr-1">
            <div className="contact-box p-10 flex items-center h-full ">
              <ul className="space-y-12 ">
                <li className="flex gap-x-5 items-center">
                  <div className="cnt-icon text-red-600 text-2xl">
                    <FaPhoneAlt />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-red-600">
                    <span className="ml-4"> +8801800000000</span>
                  </p>
                </li>
                <li className="flex gap-x-5 items-center">
                  <div className="cnt-icon text-red-600 text-2xl">
                    <IoMdMail />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-red-600">
                    <span className="ml-4">contact@mail.com</span>
                  </p>
                </li>
                <li className="flex gap-x-5 items-center">
                  <div className="cnt-icon text-red-600 text-2xl ">
                    <FaLocationDot />
                  </div>
                  <p className="text-slate-600 text-lg border-l-4 border-red-600">
                    <span className="ml-4">Sylhet,Bangladesh</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 pl-1">
            <form
              action="#"
              className="space-y-2 border rounded-xl shadow p-10"
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
                  className="input input-bordered w-full input-md text-slate-700 focus-within:border-red-500 focus-within:outline-none 
                  bg-gray-50"
                  required
                />
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
                  className="input input-bordered w-full input-md text-slate-700 focus-within:border-red-500 focus-within:outline-none 
                  bg-gray-50"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  Your message
                </label>
                <textarea
                  className="textarea textarea-bordered w-full text-slate-700 focus-within:border-red-500 !outline-none bg-gray-50"
                  placeholder="Leave Comment.."
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn  min-h-full  h-full py-3 px-5 rounded-full border-red-600 bg-transparent hover:bg-red-500 hover:text-white text-red-500"
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
