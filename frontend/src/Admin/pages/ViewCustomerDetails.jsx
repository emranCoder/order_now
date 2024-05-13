import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import Animation from "../spinner/Animation";
import EditIcon from "@mui/icons-material/Edit";
import Toast from "../Alert/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Cookies from "js-cookie";

export default function ViewCustomerDetails() {
  const [previewFile, setPreviewFIle] = useState(null);
  const [err, setErr] = useState(false);
  const [data, setData] = useState();
  const [customer, setCustomer] = useState(null);
  const [success, setSuccess] = useState(null);
  const [order, setOrder] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) navigate("/product");

    getCustomer();
    getOrder();
  }, [success]);

  const getCustomer = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/user`, {
        headers: {
          token: Cookies.get("auth"),
          id: state,
          form: "Admin",
        },
      });
      if (response && response.status === 200) {
        setCustomer(response.data.user);
      }
    } catch (error) {
      if (error.response.data.err) {
        setErr(error.response.data.err);
      }
    }
  };

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/order/user/${state}`,
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
      if (error.response.data.err) {
        setErr(error.response.data.err);
      }
    }
  };
  return (
    customer && (
      <Animation>
        <div className="rounded-xl border shadow-lg mb-28 p-10 max-sm:px-0 px-5 max-sm:py-5">
          <div className="container overflow-hidden">
            <div className="view-product">
              <div className="head flex justify-between content-center">
                <h3 className="text-2xl font-semibold text-slate-600">
                  Customer Details
                </h3>
              </div>
              <div className="container">
                <div className="container-row justify-center my-10">
                  <div className="col-lg-4">
                    <div>
                      <figure className="w-auto  btn h-full !border-none !bg-transparent">
                        <img
                          src={`http://localhost:5000/avatar/${customer.avatar}`}
                          alt="Movie"
                          className="rounded-3xl"
                        />
                      </figure>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12 max-sm:w-full">
                    <div className="card max-sm:px-2  gap-y-2 lg:px-8">
                      <h2 className="card-title text-3xl">
                        {customer.fName + " " + customer.lName}
                      </h2>
                      <p className="text-slate-600 text-lg ">
                        Phone No: {customer.mobile}
                      </p>
                      <p className="text-slate-600 text-lg ">
                        Email: {customer.email}
                      </p>
                      <p className="text-slate-600 text-lg ">
                        Country: {customer.country}
                      </p>
                      <p className="text-slate-600 text-lg ">
                        Address: {customer.addr}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="container-row">
                  <div className="overflow-x-auto mt-10 border rounded-lg">
                    <table className="table table-zebra  text-slate-800 table-fixed max-sm:w-max">
                      {/* head */}
                      <thead>
                        <tr className="bg-base-300 text-slate-600 uppercase text-sm ">
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        {order && order.length <= 0 && (
                          <tr>
                            <td>No Data</td>
                          </tr>
                        )}
                        {order &&
                          order.map((val, key) => (
                            <tr className="hover ">
                              <td>{val.orderNumber}</td>
                              <td>{customer.fName + " " + customer.lName}</td>
                              <td>
                                <span
                                  className={`uppercase px-3 py-1  font-medium text-xs bg-opacity-30 rounded-full ${
                                    val.orderStatus === "Pending"
                                      ? "text-orange-800 bg-orange-200"
                                      : val.orderStatus === "Delivered"
                                      ? "text-green-800 bg-green-200"
                                      : "text-red-800 bg-red-200"
                                  } `}
                                >
                                  {val.orderStatus}
                                </span>
                              </td>
                              <td>
                                {new Date(val.orderDate).toLocaleDateString(
                                  "en-US"
                                )}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Animation>
    )
  );
}
