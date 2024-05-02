import React, { useEffect, useState } from "react";
import Loading from "../component/Loading";

export default function Blog() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [0]);

  const items = () => (
    <div className="card rounded-none card-side bg-base-100 border-b pb-2 mb-8">
      <div className="avatar">
        <div className="w-56">
          <img src="https://pinchofyum.com/cdn-cgi/image/width=360,height=360,fit=crop/wp-content/uploads/Crispy-Air-Fryer-Tofu.jpg" />
        </div>
      </div>
      <div className="card-body py-0 gap-y-5 ">
        <span className="text-slate-500 font-serif font-semibold">
          {" "}
          February 26, 2024
        </span>
        <h2 className="card-title text-slate-800 text-3xl font-serif">
          <a href="#" className="hover:underline">
            {" "}
            Ridiculously Good Air Fryer Tofu
          </a>
        </h2>
        <p className="text-slate-600">
          The crispiest air fryer tofu – in 15 minutes! Extremely easy,
          incredibly versatile, and an absolute weeknight go-to.
        </p>
        <div className="card-actions flex-auto">
          <button className="btn mt-0 h-auto min-h-[auto] text-lg !border-none hover:text-slate-800 !bg-transparent text-red-800 uppercase tracking-wide m-0 p-0 font-sans">
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <section className="order-section p-5 ">
      {loader && <Loading />}
      <div className="container  rounded-xl px-10 py-10 max-sm:p-5 max-md:px-5 bg-white">
        <div className="container-row">
          <div className="col-lg-8">
            <h5 className="mb-8 text-red-800 font-semibold uppercase font-serif">
              The Latest & Greatest
            </h5>
            {items()}
            {items()}
            {items()}
            {items()}
          </div>
          <div className="col-lg-4">
            <h5 className="mb-8 text-red-800 font-semibold uppercase font-serif">
              Recipe Collections
            </h5>
            <ul className="">
              <li className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700">
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  1
                </span>
                <a>Item 1</a> <span className="float-right mr-5">48</span>
              </li>
              <li className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700">
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  2
                </span>
                <a>Item 2</a> <span className="float-right mr-5">48</span>
              </li>
              <li className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700">
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  3
                </span>
                <a>Item 3</a> <span className="float-right mr-5">48</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
