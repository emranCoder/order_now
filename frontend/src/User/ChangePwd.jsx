import React from "react";
import { FaKey } from "react-icons/fa";

export default function ChangePwd() {
  return (
    <section className="order-section p-5 ">
      <div className="container rounded-xl px-10 py-16 max-sm:p-5 max-md:px-5 bg-white">
        <div className="container-row">
          <div className="col-lg-12">
            <form class="mx-auto px-5 ">
              <h3 className="mb-3 text-4xl ">Change password</h3>
              <div className="container my-10">
                <div className="container-row gap-10 justify-center">
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="currentpwd">Current Password*</label>
                    <label className="input input-bordered text-slate-700 flex items-center gap-2">
                      <FaKey className="text-slate-700 text-xs" />
                      <input
                        type="password"
                        className="grow"
                        value="password"
                      />
                    </label>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="newpwd">New Password*</label>
                    <label className="input input-bordered text-slate-700 flex items-center gap-2">
                      <FaKey className="text-slate-700 text-xs" />
                      <input
                        type="password"
                        className="grow"
                        value="password"
                      />
                    </label>
                  </div>{" "}
                  <div className="col-lg-3 col-md-6">
                    <label htmlFor="conpwd">Confirm Password*</label>
                    <label className="input input-bordered text-slate-700 flex items-center gap-2">
                      <FaKey className="text-slate-700 text-xs" />
                      <input
                        type="password"
                        className="grow"
                        value="password"
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
