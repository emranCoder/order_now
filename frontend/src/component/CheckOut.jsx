import React from "react";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function CheckOut() {
  return (
    <div role="presentation" className="p-5 pt-0  ">
      <h3 className="capitalize font-medium text-2xl pt-5 text-red-800">
        Order Details:
      </h3>
      <div className="grid grid-cols-3 gap-0 py-2 space-x-0 max-md:grid-cols-1">
        <div className="grid col-span-2 grid-cols-2 lg:grid-cols-3 max-md:grid-cols-none  justify-start gap-0 space-x-0  border-r-2 overflow-y-scroll h-64 max-md:h-52">
          <div className="h-24 mx-auto bg-white space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-red hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>

          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-red hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-red hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-red hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>

          <div className="h-24 mx-auto bg-white rounded-xl space-y-0 py-4 flex items-center space-x-6  ">
            <img
              className="block h-full rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="space-y-2 text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
            </div>
            <button className="md:!m-auto md:!ml-2  px-2 text-sm text-red-400 font-semibold  hover:text-red hover:text-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
              <HighlightOffIcon />
            </button>
          </div>
        </div>
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
                inputProps={{ "aria-label": "search" }}
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
  );
}
