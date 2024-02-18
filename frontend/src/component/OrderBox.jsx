import React from "react";
import * as Mui from "@mui/material";
import FoodItem from "./FoodItem";
import OrderMenuBox from "./OrderMenuBox";
import FooterMenu from "./FooterMenu";

export default function OrderBox() {
  return (
    <section className="order-section">
      <div className="container">
        <div className="order-box bg-white p-10 my-10">
          <div className="container-row">
            <div className="col-lg-3 max-md:hidden">
              <OrderMenuBox />
            </div>
            <div className="col-lg-9 col-md-9">
              <FoodItem />
            </div>
          </div>
        </div>
      </div>

      <FooterMenu />
    </section>
  );
}
