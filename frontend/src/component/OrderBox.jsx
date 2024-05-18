import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import FooterMenu from "./FooterMenu";
import OrderMenuBox from "./OrderMenuBox";
import Loading from "../component/Loading";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/ToastSlice";

export default function OrderBox() {
  const [loader, setLoader] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoader(false);
      if (urlParams.get("forget")) {
        dispatch(
          addToast({
            type: "info",
            msg: "We will miss you!",
          })
        );
      }
      if (urlParams.get("user")) {
        dispatch(
          addToast({
            type: "info",
            msg: `Hi! ${urlParams.get("user")}`,
          })
        );
      }
    }, 500);
  }, [0]);

  return (
    <section className="order-section py-5">
      {loader && <Loading />}
      <div className="container">
        <div className="order-box bg-white max-sm:px-2 rounded-xl p-10 max-sm:p-4">
          <div className="container-row">
            <div className="col-lg-12 max-lg:hidden !sticky top-2 mb-5 z-[11]">
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
