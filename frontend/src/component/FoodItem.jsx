import * as React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function FoodItem() {
  return (
    <div className="container pl-3 m-0">
      <div className="grid grid-cols-2 gap-4  max-md:grid-cols-1 max-lg:grid-cols-2 max-md:gap-0 max-lg:space-x-1">
        {/* Food items */}
        <div className="list border-b-2">
          <div className="py-8 px-2 max-w-sm mx-auto bg-white rounded-xl space-y-2 max-lg:py-4 max-lg:flex max-lg:items-center max-lg:space-y-0 max-lg:space-x-6 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 max-lg:p-0 max-lg:m-0 max-lg:">
            <img
              className="block  h-24 rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="text-center space-y-2 max-lg:text-left sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 max-lg:hidden">
                Add To Cart <AddShoppingCartIcon />
              </button>
            </div>
            <button className="hidden max-lg:block px-5 py-5 text-sm text-white font-semibold bg-purple-600 rounded-md border border-purple-600 hover:text-purple hover:bg-purple-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
              <AddShoppingCartIcon />
            </button>
          </div>
        </div>
        {/* Food items end */}
        <div className="list border-b-2">
          <div className="py-8 px-2 max-w-sm mx-auto bg-white rounded-xl space-y-2 max-lg:py-4 max-lg:flex max-lg:items-center max-lg:space-y-0 max-lg:space-x-6 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 max-lg:p-0 max-lg:m-0 max-lg:">
            <img
              className="block  h-24 rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="text-center space-y-2 max-lg:text-left sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 max-lg:hidden">
                Add To Cart <AddShoppingCartIcon />
              </button>
            </div>
            <button className="hidden max-lg:block px-5 py-5 text-sm text-white font-semibold bg-purple-600 rounded-md border border-purple-600 hover:text-purple hover:bg-purple-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
              <AddShoppingCartIcon />
            </button>
          </div>
        </div>
        <div className="list border-b-2">
          <div className="py-8 px-2 max-w-sm mx-auto bg-white rounded-xl space-y-2 max-lg:py-4 max-lg:flex max-lg:items-center max-lg:space-y-0 max-lg:space-x-6 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 max-lg:p-0 max-lg:m-0 max-lg:">
            <img
              className="block  h-24 rounded max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
              alt="Woman's Face"
            />
            <div className="text-center space-y-2 max-lg:text-left sm:text-left">
              <div className="space-y-0.5">
                <p className="text-lg text-black font-semibold">
                  Vegetables Salad{" "}
                </p>
                <p className="text-slate-500 font-medium">8.99$</p>
              </div>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 max-lg:hidden">
                Add To Cart <AddShoppingCartIcon />
              </button>
            </div>
            <button className="hidden max-lg:block px-5 py-5 text-sm text-white font-semibold bg-purple-600 rounded-md border border-purple-600 hover:text-purple hover:bg-purple-300 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
              <AddShoppingCartIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
