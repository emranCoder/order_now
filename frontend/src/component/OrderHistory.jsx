import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToast } from "../redux/ToastSlice";
import SyncIcon from "@mui/icons-material/Sync";

export default function OrderHistory(props) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState({ product: "", order: "" });

  const id = Cookies.get("id");
  useEffect(() => {
    if (id) {
      getOrder();
    } else {
      window.location.replace("/login");
    }
  }, [0]);
  const getOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/order/user/${id}`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      console.log(response);
      if (response && response.status === 200) {
        setOrder(response.data.order);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  const handleOrderStatus = async (id) => {
    const updateData = {
      id: id,
      orderStatus: "Refunded",
      paymentStatus: false,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/order/`,
        updateData,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        dispatch(addToast({ type: "success", msg: response.data.mess }));
        getOrder();
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  return (
    <section>
      <dialog id="view_product" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Info!</h3>
          <p className="py-4">Product List</p>
          <div className="modal-action">
            <form method="dialog" className="w-full">
              <div className="grid grid-cols-2 gap-3">
                {product.product &&
                  product.product.map((val, key) => (
                    <div
                      key={key}
                      className=" bg-white shadow-md py-5 max-sm:p-2 hover:border-slate-700 border-slate-700 border-opacity-20 border cursor-pointer ease-out duration-75  rounded-2xl hover:bg-[rgb(255,248,248)] "
                    >
                      <div className="flex max-sm:justify-between  max-sm:flex-row xl:px-2   flex-col items-center content-center justify-center">
                        <div className="mask mask-squircle z-10">
                          <img
                            className="block   h-24 rounded-box max-lg:mx-0 max-lg:shrink-0 sm:mx-0 sm:shrink-0"
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
                          <p className="font-semibold text-sky-900">
                            QTY: {val.qty}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                {!product && (
                  <p className="flex justify-center my-5">
                    "Product Not Found"
                  </p>
                )}
              </div>

              {product.order && (
                <div className="col-lg-12 col-md-12 max-sm:w-full max-md:w-full mt-5">
                  <div className="list px-5 ">
                    <div className="w-full ">
                      <div className="w-full border-b">
                        <span>Subtotal: </span>
                        <span className="float-right">
                          {/^-?[0-9]+$/.test(Number(product.order.currentPrice))
                            ? Number(product.order.currentPrice) +
                              Number(product.order.discount)
                            : (
                                Number(product.order.currentPrice) +
                                Number(product.order.discount)
                              ).toFixed(2)}{" "}
                          $
                        </span>
                      </div>
                      <div className="w-full border-b">
                        <span>Discount:</span>
                        <span className="float-right">
                          {/^-?[0-9]+$/.test(Number(product.order.discount))
                            ? Number(product.order.discount)
                            : Number(product.order.discount).toFixed(2)}
                          $
                        </span>
                      </div>
                      <div className="w-full">
                        <span>Total: </span>
                        <span className="float-right">
                          {/^-?[0-9]+$/.test(Number(product.order.currentPrice))
                            ? Number(product.order.currentPrice)
                            : Number(product.order.currentPrice).toFixed(
                                2
                              )}{" "}
                          $
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="w-full flex justify-end mt-5">
                <button className="btn  rounded-full bg-transparent text-slate-700 border-slate-700 border hover:bg-red-500  hover:text-slate-50">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <div className="container rounded-xl px-10 py-16 max-sm:p-5 max-md:px-5 bg-white">
        <h3 className="text-3xl text-center text-slate-600">Order History</h3>
        <div className="overflow-x-auto mt-10 border rounded-lg">
          <table className="table table-zebra  text-slate-800  ">
            {/* head */}
            <thead>
              <tr className="bg-base-300 text-slate-600 uppercase text-sm ">
                <th>Order</th>
                <th>Product</th>
                <th>Status</th>
                <th>Price</th>
                <th>Payment Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order
                  .sort((e) => e.orderStatus !== "Pending")
                  .map((val, key) => (
                    <tr className="hover " key={key}>
                      <td
                        onClick={() => {
                          setProduct({
                            product: JSON.parse(val.products),
                            order: {
                              currentPrice: val.orderPrice,
                              discount: val.discount,
                              orderDate: val.orderDate,
                            },
                          });
                          document.getElementById("view_product").showModal();
                          console.log(product);
                        }}
                      >
                        {val.orderNumber}
                      </td>
                      <td
                        onClick={() => {
                          setProduct({
                            product: JSON.parse(val.products),
                            order: {
                              currentPrice: val.orderPrice,
                              discount: val.discount,
                              orderDate: val.orderDate,
                            },
                          });
                          document.getElementById("view_product").showModal();
                          console.log(product);
                        }}
                      >
                        <div className="avatar-group -space-x-6 rtl:space-x-reverse ">
                          {val.products &&
                            JSON.parse(val.products).map((val, key) => (
                              <div className="avatar " key={key}>
                                <div className="w-12 ">
                                  <img
                                    src={`http://localhost:5000/products/img/${
                                      (val && val.image) ||
                                      "default-product.png"
                                    }`}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`uppercase px-3 py-1  font-medium text-xs bg-opacity-30  rounded-full ${
                            val.orderStatus == "Pending"
                              ? "text-orange-800 bg-orange-200"
                              : val.orderStatus === "Refunded"
                              ? "text-red-800 bg-red-200 "
                              : "text-green-800 bg-green-200"
                          }`}
                        >
                          {val.orderStatus}
                        </span>
                      </td>

                      <td className="font-semibold text-slate-600">
                        {val.orderPrice} USD
                      </td>
                      <td>
                        <span
                          className={`uppercase px-3 py-1  font-medium text-xs bg-opacity-30  rounded-full ${
                            val.paymentStatus == false
                              ? "text-red-800 bg-red-200 "
                              : "text-green-800 bg-green-200"
                          }`}
                        >
                          {val.paymentStatus ? "Paid" : "Un paid"}
                        </span>
                      </td>
                      <td>
                        <span className="text-stone-500">
                          {new Date(val.orderDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="max-sm:hidden">
                          ,{" "}
                          {new Date(val.orderDate).toLocaleTimeString("en-us", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td>
                        <div className="tooltip" data-tip="Revoke Delivery">
                          <button
                            onClick={() => {
                              if (val.orderStatus === "Pending")
                                handleOrderStatus(val._id);
                            }}
                            className={`btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden ${
                              val.orderStatus === "Pending"
                                ? ""
                                : "btn-disabled"
                            }`}
                          >
                            <Mui.ListItemButton className="!flex !justify-center !items-center">
                              <SyncIcon sx={{ fontSize: 18 }} />
                            </Mui.ListItemButton>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
