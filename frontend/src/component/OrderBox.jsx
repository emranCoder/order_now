import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import FooterMenu from "./FooterMenu";
import OrderMenuBox from "./OrderMenuBox";
import Loading from "../component/Loading";

export default function OrderBox() {
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  return (
    <section className="order-section py-5">
      {loader && <Loading />}
      <div className="container">
        <div className="order-box bg-white max-sm:px-2 rounded-xl p-10 max-sm:p-4">
          <div className="container-row">
            <div className="col-lg-12 max-lg:hidden !sticky top-2 mb-5">
              <OrderMenuBox />
            </div>
            <div className="col-lg-12 col-md-12 max-w-full max-lg:w-full max-sm:px-4  ">
              <FoodItem />
            </div>
          </div>
        </div>
      </div>
      <FooterMenu />
    </section>
  );
}
