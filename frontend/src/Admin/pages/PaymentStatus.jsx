import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import axios from "axios";
import Cookies from "js-cookie";
import Toast from "../Alert/Toast";
import { Link } from "react-router-dom";

export default function PaymentStatus() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [edit, setEdit] = useState(false);
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState(null);
  const [success, setSuccess] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getOrder();
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/order/all`, {
        headers: {
          token: Cookies.get("auth"),
        },
      });
      if (response && response.status === 200) {
        setOrder(response.data.order);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  const handlePaid = async (id) => {
    const updateData = {
      id: id,
      paymentStatus: true,
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
        setSuccess({ type: "success", msg: response.data.mess });
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };
  const handleUnPaid = async (id) => {
    console.log(id);
    const updateData = {
      id: id,
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
        setSuccess({ type: "success", msg: response.data.mess });
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };
  const handleSuccess = () => {
    setSuccess(null);
  };

  const handleSearch = (e) => {
    if (e.key === "Backspace" && !e.target.value.trim().length) {
      setSearch("");
    }
    if (e.target.value.trim().length) {
      setSearch(e.target.value.trim());
    }
  };

  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          {/* Toast */}
          {success && <Toast msg={success} control={handleSuccess} />}
          {/* Toast End */}
          <dialog id="view_product" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Order Info!</h3>
              <p className="py-4">Product List</p>
              <div className="modal-action">
                <form method="dialog" className="w-full">
                  <div className="grid grid-cols-2 gap-3">
                    {product &&
                      product.map((val, key) => (
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
                  <div className="w-full flex justify-end mt-5">
                    <button className="btn  rounded-full bg-transparent text-slate-700 border-slate-700 border hover:bg-red-500  hover:text-slate-50">
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
          <div className="pym-box content-center">
            <div className="flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                Payment Status
              </h3>
              <label className="input mr-3 max-sm:w-3/6 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                  onKeyUpCapture={handleSearch}
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
            </div>
            <div className="overflow-x-auto mt-10 border rounded-lg">
              <table className="table table-zebra  text-slate-800 table-fixed max-sm:w-max">
                {/* head */}
                <thead>
                  <tr className="bg-base-300 text-slate-600 uppercase text-sm ">
                    <th>Transaction No.</th>
                    <th>Product</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {order &&
                    order
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.orderNumber.toLowerCase().includes(search) ||
                              item._id.toLowerCase().includes(search) ||
                              item.user.fName.toLowerCase().includes(search) ||
                              item.user.lName.toLowerCase().includes(search) ||
                              item.user._id.toLowerCase().includes(search);
                      })
                      .sort((e) => e.orderStatus == "Pending")
                      .map((val, key) => (
                        <tr className="hover ">
                          <td>
                            <span
                              onClick={() => {
                                setProduct(JSON.parse(val.products));
                                document
                                  .getElementById("view_product")
                                  .showModal();
                              }}
                              className="cursor-pointer hover:text-emerald-800 font-semibold text-sky-800"
                            >
                              {val.orderNumber}
                            </span>
                          </td>
                          <td>
                            {JSON.parse(val.products).length > 1
                              ? JSON.parse(val.products).length + ", Products"
                              : JSON.parse(val.products).name}
                          </td>
                          <td className="hover:text-sky-900 ">
                            <Link to="/view" state={val.user._id}>
                              {" "}
                              {val.user &&
                                val.user.fName + " " + val.user.lName}
                            </Link>
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
                              ,{" "}
                            </span>
                            {new Date(val.orderDate).toLocaleTimeString(
                              "en-us",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                          <td className="flex gap-5 justify  ">
                            <div className="tooltip" data-tip="Paid">
                              <button
                                onClick={() => {
                                  if (!val.paymentStatus) handlePaid(val._id);
                                }}
                                className={`btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden ${
                                  val.paymentStatus ? "btn-disabled" : ""
                                }`}
                              >
                                <Mui.ListItemButton className="!flex !justify-center !items-center">
                                  <CheckIcon sx={{ fontSize: 18 }} />
                                </Mui.ListItemButton>
                              </button>
                            </div>
                            <div className="tooltip" data-tip="Unpaid">
                              <button
                                onClick={() => {
                                  if (val.paymentStatus) handleUnPaid(val._id);
                                }}
                                className={`btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden ${
                                  !val.paymentStatus ? "btn-disabled" : ""
                                }`}
                              >
                                <Mui.ListItemButton className="!flex !justify-center !items-center">
                                  <HighlightOffIcon sx={{ fontSize: 18 }} />
                                </Mui.ListItemButton>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
            <Mui.TablePagination
              sx={{ margin: 0, padding: 0 }}
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </Animation>
  );
}
