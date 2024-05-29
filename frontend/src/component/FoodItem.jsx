import React, { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import CheckOut from "./CheckOut";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/CartSlice";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { fetchProduct } from "../redux/ProductFetch";

export default function FoodItem() {
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const { size, total } = useSelector((state) => state.cart);
  const { product, category } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchProduct());
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [0]);

  const handleAddToCart = (data) => {
    let x = size + 1;
    let newPrice = data.price - (data.discount * data.price) / 100;
    let y = total + newPrice;
    data = {
      ...data,
      id: data._id,
      size: x,
      currentPrice: newPrice,
      total: y,
    };
    delete data._id;
    dispatch(addCart(data));
  };
  const [drawerActive, setDrawerActive] = useState({
    right: false,
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (anchor === "right") setDrawerActive({ right: open });
    if (anchor === "bottom") setDrawerActive({ bottom: open });
  };

  const listenToScroll = () => {
    let heightToHideFrom = 200;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <div className="justify-center mt-3">
      <div className="grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-1 gap-3">
        {product &&
          product
            .filter((val) => val.category === category)
            .map((val, key) => (
              <div
                key={key}
                className={`list bg-white shadow-md py-5 max-sm:p-2 hover:border-slate-700 border-slate-700 border-opacity-20 border cursor-pointer ease-out duration-75  rounded-2xl hover:bg-[rgb(255,248,248)] ${
                  val.stock
                    ? ""
                    : "bg-stone-200 hover:bg-stone-300 border-0 !text-[#d4d6d9]"
                }`}
              >
                <div className="flex max-sm:justify-between   max-sm:flex-row xl:px-2  w-full flex-col items-center content-center justify-center">
                  <div className=" w-24">
                    <img
                      className="block h-24  rounded-box max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
                      src={`http://localhost:5000/products/img/${
                        (val && val.image) || "default-product.png"
                      }`}
                      alt="Woman's Face"
                    />
                  </div>
                  <div className="max-sm:ml-3 text-center max-sm:text-left ">
                    <p className="text-lg max-sm:m-0  mt-3  my-1 text-slate-900">
                      {val.name}
                    </p>
                    <p className="my-1 font-semibold text-slate-900">
                      {val.discount > 0 && (
                        <span className="line-through mr-2 text-slate-500 font-normal">
                          {val.price}$
                        </span>
                      )}
                      {val.price - (val.discount * val.price) / 100}$
                    </p>
                    {!val.stock && (
                      <p className="my-1 font-semibold text-red-400 hidden max-sm:block">
                        Out of Stock
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (val.stock) {
                        handleAddToCart(val);
                      }
                    }}
                    className={`px-4 py-1 max-sm:ml-3 max-sm:rounded-lg max-sm:btn-md max-sm:px-6 max-sm:btn-square bg-transparent btn-sm btn  my-1 text-sm text-slate-700 font-semibold rounded-full border border-slate-600 hover:text-white hover:bg-slate-700 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 max-lg:bg-slate-700 max-lg:text-white ${
                      !val.stock && "btn-disabled"
                    }`}
                  >
                    {(val.stock && (
                      <p>
                        <span className="max-sm:hidden">Add To Cart</span>
                        <span className="lg:ml-1">
                          <AddShoppingCartIcon />
                        </span>
                      </p>
                    )) || (
                      <p>
                        <span className="hidden max-sm:block">
                          <RemoveShoppingCartIcon />
                        </span>
                        <span className="max-sm:hidden ">Out Of Stock</span>
                      </p>
                    )}
                  </button>
                </div>
              </div>
            ))}
      </div>
      {isVisible && (
        <div className="cart lg:block hidden">
          <SpeedDial
            ariaLabel="Cart"
            sx={{
              "& .MuiFab-circular": {
                backgroundColor: "#b91c1c !important",
              },
              position: "fixed",
              bottom: "10%",
              right: "5%",
              display: "flex",
            }}
            onClick={toggleDrawer("bottom", true)}
            icon={<ShoppingCartCheckoutIcon />}
          ></SpeedDial>
          <Drawer
            anchor={"bottom"}
            open={drawerActive["bottom"]}
            onClose={toggleDrawer("bottom", false)}
          >
            <CheckOut closeBtn={toggleDrawer("bottom", false)} />
          </Drawer>
        </div>
      )}
    </div>
  );
}
