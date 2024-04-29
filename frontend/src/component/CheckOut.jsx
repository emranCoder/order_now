import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty } from "../redux/CartSlice";

export default function CheckOut(props) {
  const { size, cartProduct, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCart = (value) => {};

  return (
    <div className="container-fluid">
      <div className="container-row lg:px-10">
        <div className="col-lg-12 col-md-12 col-sm-12 max-sm:pt-4 pt-8  w-full">
          <div className="flex justify-between">
            <h3 className="capitalize font-medium text-2xl mb-5 text-slate-800 max-sm:px-3 ">
              Order Details:
            </h3>
            <button
              className="btn btn-circle mr-3 btn-sm border-slate-100 bg-transparent"
              onClick={props.closeBtn}
            >
              <CloseIcon className="!font-bold" sx={{ fontSize: 16 }} />
            </button>
          </div>
        </div>
        <div className="col-lg-12 col-md-12 col-sm-12 checkout-box  sm:px-3">
          <div className="container ">
            <div className="container-row">
              <div className="col-lg-8 col-md-6  max-sm:w-full max-md:w-full pb-10">
                <div className="container-fluid md:border-r">
                  <div className="container-row grid justify-center lg:grid-cols-2 gap-y-2  md:grid-cols-1  rounded-lg overflow-y-auto h-52 max-sm:h-40">
                    {cartProduct &&
                      cartProduct.map((val, key) => (
                        <div
                          key={key}
                          className="border-slate-100 pl-0 w-max h-max  border mb-0 rounded-lg flex justify-between px-1  flex-row items-center content-center"
                        >
                          <img
                            className="block rounded-l-lg h-20  mx-0 shrink-0 "
                            src={`http://localhost:5000/products/img/${
                              (val && val.image) || "default-product.png"
                            }`}
                            alt="Woman's Face"
                          />

                          <div className="ml-3 text-left ">
                            <p className="text-lg m-0  mt-3  my-1 text-slate-900">
                              {val.name}
                            </p>
                            <p className="my-1 font-semibold text-slate-900">
                              {val.price}
                            </p>
                          </div>
                          <div className="relative flex items-center max-w-[5rem] ml-5">
                            <button
                              onClick={() => {
                                if (val.frequency === 0) {
                                  removeFromCart(val);
                                }
                                dispatch(decQty(val.id));
                              }}
                              type="button"
                              id="decrement-button"
                              data-input-counter-decrement="quantity-input"
                              className="btn btn-sm rounded-none rounded-l-lg bg-slate-700  text-white dark:bg-gray-700 hover:bg-slate-600  border border-gray-300  p-2  focus:bg-slate-600 focus:ring-slate-100  focus:ring-2 focus:outline-none flex items-center  border-r-0"
                            >
                              <span>-</span>
                            </button>
                            <input
                              type="text"
                              id="quantity-input"
                              data-input-counter
                              aria-describedby="helper-text-explanation"
                              className="text-white border-x-0 p-0 bg-slate-700 border-slate-300 border-t border-b btn-sm text-center  text-sm focus:ring-slate-700 focus:border-slate-700  w-full  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-slate-700 dark:focus:border-slate-700 outline-none  block"
                              placeholder="20"
                              value={val.qty}
                              disabled={true}
                              required
                            />

                            <button
                              onClick={() => {
                                if (val.qty < 20) dispatch(incQty(val.id));
                              }}
                              type="button"
                              id="increment-button"
                              data-input-counter-increment="quantity-input"
                              className="btn btn-sm rounded-none rounded-r-lg bg-slate-700  text-white dark:bg-gray-700 hover:bg-slate-600  border border-gray-300 py-0 p-2  focus:bg-slate-600 focus:ring-slate-100  focus:ring-2 focus:outline-none flex items-center border-l-0"
                            >
                              <span>+</span>
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 max-sm:w-full max-md:w-full max-sm:mt-5">
                <div className="list px-5 ">
                  <div className="w-full ">
                    <div className="w-full border-b">
                      <span>Subtotal: </span>
                      <span className="float-right">100 $</span>
                    </div>
                    <div className="w-full border-b">
                      <span>Discount:</span>
                      <span className="float-right">0.0 %</span>
                    </div>
                    <div className="w-full border-b">
                      <span>Tax: </span>
                      <span className="float-right">1.5 %</span>
                    </div>
                    <div className="w-full">
                      <span>Total: </span>
                      <span className="float-right">110 $</span>
                    </div>
                    <div className="flex justify-center w-full my-5">
                      <input
                        className="border-spacing-0 w-full inline-block p-2 outline-none border-slate-600 focus:border-slate-700 border no-underline rounded-l-md"
                        placeholder="kupon code"
                        inputprops={{ "aria-label": "search" }}
                      />
                      <button className="p-2 m-0 text-sm inline-block  text-white font-semibold bg-slate-700 rounded-l-none rounded-md border border-slate-700 hover:text-red hover:bg-slate-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2">
                        <KeyboardArrowRightIcon />
                      </button>
                    </div>
                    <div className="w-full">
                      <button className=" w-full py-2 text-sm text-slate-700 font-semibold rounded-full border border-slate-700 focus:outline-none focus:ring-2 hover:text-white  hover:border-slate-300 hover:bg-slate-700   focus:ring-slate-300 focus:bg-slate-700 focus:text-white   focus:ring-offset-2 ease-out duration-300">
                        Check Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
