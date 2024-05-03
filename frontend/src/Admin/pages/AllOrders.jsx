import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import axios from "axios";
import Cookies from "js-cookie";

export default function AllOrders() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState(null);

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
      const response = await axios.get("http://localhost:5000/api/order/all", {
        headers: {
          token: Cookies.get("auth-token"),
        },
      });
      if (response && response.status === 200) {
        setOrder(response.data.order);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 pt-5 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          <div className="all-order-box mt-5 ">
            <div className="flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                All Orders
              </h3>

              <label className="input mr-3 max-sm:w-3/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
            </div>
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
                  {order &&
                    order.map((val, key) => (
                      <tr className="hover " key={key}>
                        <td>{val.orderNumber}</td>
                        <td>
                          {val.user && val.user.fName + " " + val.user.lName}
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
                        <td>{val.orderDate}</td>
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
