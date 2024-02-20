import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function CheckOut() {
  return (
    <div className="container">
      <div className="container-row">
        <div className="col-lg-12 checkout-box py-8">
          <h3 className="capitalize font-medium text-2xl mb-5 text-red-800">
            Order Details:
          </h3>
          <div className="container-fluid">
            <div className="container-row">
              <div className="col-lg-8">
                <div className="container-fluid">
                  <div className="container-row gap-2">
                    <div className="col-lg-5">
                      <div className="border-red-100 border mb-3 rounded-lg flex justify-between px-1 w-full flex-row items-center content-center">
                        <img
                          className="block h-20  mx-0 shrink-0 "
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                          alt="Woman's Face"
                        />

                        <div className="ml-3 text-left ">
                          <p className="text-lg m-0  mt-3  my-1 text-red-900">
                            Vegetables Salad{" "}
                          </p>
                          <p className="my-1 font-semibold text-red-900">
                            $ 8.99
                          </p>
                        </div>
                        <div className="relative flex items-center max-w-[5rem] ">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="btn btn-sm rounded-none rounded-l-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300  p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center  border-r-0"
                          >
                            <span>-</span>
                          </button>
                          <input
                            type="text"
                            id="quantity-input"
                            data-input-counter
                            aria-describedby="helper-text-explanation"
                            className="text-white border-x-0 p-0 bg-red-700 border-slate-300 border-t border-b btn-sm text-center  text-sm focus:ring-red-700 focus:border-red-700  w-full  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700 outline-none  block"
                            placeholder="100"
                            defaultValue={100}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="quantity-input"
                            className="btn btn-sm rounded-none rounded-r-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300 py-0 p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center border-l-0"
                          >
                            <span>+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="border-red-100 border mb-3 rounded-lg flex justify-between px-1 w-full flex-row items-center content-center">
                        <img
                          className="block h-20  mx-0 shrink-0 "
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                          alt="Woman's Face"
                        />

                        <div className="ml-3 text-left ">
                          <p className="text-lg m-0  mt-3  my-1 text-red-900">
                            Vegetables Salad{" "}
                          </p>
                          <p className="my-1 font-semibold text-red-900">
                            $ 8.99
                          </p>
                        </div>
                        <div className="relative flex items-center max-w-[5rem] ">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="btn btn-sm rounded-none rounded-l-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300  p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center  border-r-0"
                          >
                            <span>-</span>
                          </button>
                          <input
                            type="text"
                            id="quantity-input"
                            data-input-counter
                            aria-describedby="helper-text-explanation"
                            className="text-white border-x-0 p-0 bg-red-700 border-slate-300 border-t border-b btn-sm text-center  text-sm focus:ring-red-700 focus:border-red-700  w-full  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700 outline-none  block"
                            placeholder="100"
                            defaultValue={100}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="quantity-input"
                            className="btn btn-sm rounded-none rounded-r-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300 py-0 p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center border-l-0"
                          >
                            <span>+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="border-red-100 border mb-3 rounded-lg flex justify-between px-1 w-full flex-row items-center content-center">
                        <img
                          className="block h-20  mx-0 shrink-0 "
                          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                          alt="Woman's Face"
                        />

                        <div className="ml-3 text-left ">
                          <p className="text-lg m-0  mt-3  my-1 text-red-900">
                            Vegetables Salad{" "}
                          </p>
                          <p className="my-1 font-semibold text-red-900">
                            $ 8.99
                          </p>
                        </div>
                        <div className="relative flex items-center max-w-[5rem] ">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="quantity-input"
                            className="btn btn-sm rounded-none rounded-l-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300  p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center  border-r-0"
                          >
                            <span>-</span>
                          </button>
                          <input
                            type="text"
                            id="quantity-input"
                            data-input-counter
                            aria-describedby="helper-text-explanation"
                            className="text-white border-x-0 p-0 bg-red-700 border-slate-300 border-t border-b btn-sm text-center  text-sm focus:ring-red-700 focus:border-red-700  w-full  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-red-700 dark:focus:border-red-700 outline-none  block"
                            placeholder="100"
                            defaultValue={100}
                            required
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="quantity-input"
                            className="btn btn-sm rounded-none rounded-r-lg bg-red-700  text-white dark:bg-gray-700 hover:bg-red-600  border border-gray-300 py-0 p-2  focus:bg-red-600 focus:ring-red-100  focus:ring-2 focus:outline-none flex items-center border-l-0"
                          >
                            <span>+</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
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
                        className="border-spacing-0 w-full inline-block p-2 outline-none border-red-600 focus:border-red-700 border no-underline rounded-l-md"
                        placeholder="kupon code"
                        inputprops={{ "aria-label": "search" }}
                        onKeyDown={(e) => console.log(e.target.value)}
                      />
                      <button className="p-2 m-0 text-sm inline-block  text-white font-semibold bg-red-700 rounded-l-none rounded-md border border-red-700 hover:text-red hover:bg-red-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2">
                        <KeyboardArrowRightIcon />
                      </button>
                    </div>
                    <div className="w-full">
                      <button className=" w-full py-2 text-sm text-red-700 font-semibold rounded-full border border-red-700 focus:outline-none focus:ring-2 hover:text-white  hover:border-red-300 hover:bg-red-700   focus:ring-red-300 focus:bg-red-700 focus:text-white   focus:ring-offset-2 ease-out duration-300">
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
