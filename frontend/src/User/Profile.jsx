import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import Page404 from "../component/Page404";
import { addToast } from "../redux/ToastSlice";
import Loading from "../component/Loading";
import { fetchUser } from "../redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const [previewFile, setPreviewFIle] = useState(null);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState({ product: "", order: "" });
  const dispatch = useDispatch();
  const { isLoading, user, err } = useSelector((state) => state.user);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchUser());
    setTimeout(() => {
      setLoader(isLoading);
    }, 500);
    getOrder();
  }, [0]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdate({ ...update, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (update || previewFile) {
      setLoader(true);
      let userUpdate = new FormData(e.target);
      userUpdate.append("id", user._id);
      userUpdate.append("oldImg", user.avatar);

      try {
        const response = await axios.put(
          `http://localhost:5000/api/auth/updateuser`,
          userUpdate,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: Cookies.get("auth"),
            },
          }
        );

        if (response && response.status === 200) {
          const { message, user } = response.data;
          dispatch(addToast({ type: "success", msg: message }));
          setUpdate(null);
          dispatch(fetchUser());
          setLoader(false);
        }
      } catch (error) {
        if (error && error.response.data) {
          setError(error.response.data.err);
          console.log(error.response.data);
        }
      }
    }
  };

  const getOrder = async () => {
    const id = Cookies.get("id");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/order/user/${id}`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setOrder(response.data.order);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  return (
    (user && (
      <section className="order-section ">
        {loader && <Loading />}
        <form
          className="p-5 "
          encType="multipart/form-data"
          method="dialog"
          onSubmit={handleSubmit}
        >
          <div className="container rounded-xl px-10 py-16 max-sm:p-5 max-md:px-5 bg-white">
            <div className="container-row justify-center gap-4">
              <div className="col-lg-4 col-md-12 col-sm-12 max-sm:w-full pr-2  lg:border border-dotted border-slate-600 rounded-2xl flex items-center justify-center">
                <div className="profile-box flex flex-col items-center ">
                  <div className="avatar">
                    <div className="w-32 mask mask-squircle">
                      <img
                        src={
                          previewFile
                            ? previewFile
                            : `http://localhost:5000/avatar/${
                                (user && user.avatar) || "default-avatar.png"
                              }`
                        }
                      />
                    </div>
                  </div>
                  <div className="w-full overflow-hidden mt-5 rounded-lg  max-sm:mt-0">
                    <Mui.ListItemButton
                      sx={{
                        width: "100%",
                        height: "100%",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <label
                        onClick={() => {
                          document.getElementById("fileInput").click();
                        }}
                        htmlFor="files"
                        className="btn w-full !bg-transparent !outline-none !border-0 font-semibold text-slate-600 rounded-lg"
                      >
                        Upload Picture
                      </label>
                      <input
                        type="file"
                        name="staffImage"
                        id="fileInput"
                        placeholder="Upload Image"
                        className="file-input w-full file-input-sm  hidden"
                        accept="image/*"
                        onChange={(e) => {
                          let fileName = e.target.files[0];
                          let preview = URL.createObjectURL(fileName);
                          setPreviewFIle(preview);
                        }}
                      />
                    </Mui.ListItemButton>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12 pl-2 max-sm:w-full max-sm:mt-5">
                <h3 className="mb-5 text-4xl text-slate-600">Profile</h3>

                <div>
                  <div className="grid md:grid-cols-2 md:gap-6 ">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="fName"
                        id="floating_first_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                        placeholder=" "
                        defaultValue={user.fName}
                        required
                      />
                      <label
                        onChange={handleOnChange}
                        htmlFor="floating_first_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        First name
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        onChange={handleOnChange}
                        name="lName"
                        id="floating_last_name"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                        defaultValue={user.lName}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_last_name"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        {" "}
                        Last name
                      </label>
                    </div>
                  </div>
                  <div className="relative z-0 w-full mb-5 group mt-5">
                    <input
                      disabled
                      type="email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-600 peer bg-zinc-100 "
                      defaultValue={user.email}
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 0"
                    >
                      Email address
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6 pt-5">
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="mobile"
                        id="floating_phone"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                        defaultValue={user.mobile}
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone number (123-456-7890)
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        onChange={handleOnChange}
                        type="text"
                        name="addr"
                        id="floating_company"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-slate-600 peer"
                        placeholder=" "
                        defaultValue={user.addr}
                        required
                      />
                      <label
                        htmlFor="floating_company"
                        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus :translate-x-1/4 peer-focus:text-slate-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Address
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-slate-50 bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 w-max"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>

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
                            {/^-?[0-9]+$/.test(product.order.currentPrice)
                              ? product.order.currentPrice
                              : product.order.currentPrice.toFixed(2)}{" "}
                            $
                          </span>
                        </div>
                        <div className="w-full border-b">
                          <span>Discount:</span>
                          <span className="float-right">
                            {/^-?[0-9]+$/.test(
                              (product.order.currentPrice *
                                product.order.discount) /
                                100
                            )
                              ? (product.order.currentPrice *
                                  product.order.discount) /
                                100
                              : (
                                  (product.order.currentPrice *
                                    product.order.discount) /
                                  100
                                ).toFixed(2)}
                            $
                          </span>
                        </div>
                        <div className="w-full">
                          <span>Total: </span>
                          <span className="float-right">
                            {/^-?[0-9]+$/.test(
                              product.order.currentPrice -
                                (product.order.currentPrice *
                                  product.order.discount) /
                                  100
                            )
                              ? product.order.currentPrice -
                                (product.order.currentPrice *
                                  product.order.discount) /
                                  100
                              : (
                                  product.order.currentPrice -
                                  (product.order.currentPrice *
                                    product.order.discount) /
                                    100
                                ).toFixed(2)}{" "}
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
                </tr>
              </thead>
              <tbody>
                {order &&
                  order
                    .filter((e) => e.orderStatus == "Pending")
                    .map((val, key) => (
                      <tr
                        className="hover "
                        key={key}
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
                        <td>{val.orderNumber}</td>
                        <td>
                          <div className="avatar-group -space-x-6 rtl:space-x-reverse ">
                            {val.products &&
                              JSON.parse(val.products).map((val, key) => (
                                <div className="avatar ">
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
                          <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
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
                            {new Date(val.orderDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="max-sm:hidden">
                            ,{" "}
                            {new Date(val.orderDate).toLocaleTimeString(
                              "en-us",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    )) || <Page404 />
  );
}
