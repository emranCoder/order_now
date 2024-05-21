import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export default function OrderHistory(props) {
  const [order, setOrder] = useState(null);
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

  return (
    <section>
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
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order
                  .filter((e) => e.orderStatus == "Pending")
                  .map((val, key) => (
                    <tr className="hover " key={key}>
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
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
