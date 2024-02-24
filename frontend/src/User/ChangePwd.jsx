import React from "react";
import { FaKey } from "react-icons/fa";

export default function ChangePwd() {
  return (
    <section className="order-section p-5 ">
      <div className="container rounded-xl px-10 py-16 max-sm:p-5 max-md:px-5 bg-white">
        <div className="container-row">
          <div className="col-lg-12">
            <form className="mx-auto px-5 ">
              <h3 className="mb-3 text-4xl ">Change password</h3>
              <div className="container my-10">
                <div className="container-row max-sm:gap-5 gap-10 justify-center">
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="currentpwd" className="text-slate-700">
                      Current Password*
                    </label>
                    <label className="!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3">
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="Current Password"
                      />
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="newpwd" className="text-slate-700">
                      New Password*
                    </label>
                    <label className="!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3">
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="New Password"
                      />
                    </label>
                  </div>{" "}
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="conpwd" className="text-slate-700">
                      Confirm Password*
                    </label>
                    <label className="!outline-none focus-within:border-slate-600 input input-bordered text-slate-700 flex items-center gap-2 mt-3">
                      <FaKey className="text-slate-500 text-xs" />
                      <input
                        type="password"
                        className="grow "
                        placeholder="Confirm Password"
                      />
                    </label>
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
