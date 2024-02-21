import React from "react";

import FoodItem from "./FoodItem";

import FooterMenu from "./FooterMenu";
import OrderMenuBox from "./OrderMenuBox";

export default function OrderBox() {
  return (
    <section className="order-section py-5">
      <div className="container">
        <div className="order-box bg-white max-sm:px-2 rounded-xl p-10 ">
          <div className="container-row">
            <div className="col-lg-12 max-lg:hidden !sticky top-2 mb-5">
              <OrderMenuBox />
              
            </div>
            <div className="col-lg-12 col-md-12 max-w-full max-lg:w-full ">
              <FoodItem />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
