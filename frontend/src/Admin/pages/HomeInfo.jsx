import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SellIcon from "@mui/icons-material/Sell";
import SegmentIcon from "@mui/icons-material/Segment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PeopleIcon from "@mui/icons-material/People";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import Animation from "../spinner/Animation";
import { NavLink } from "react-router-dom";

const pieData = [25, 5, 8];
const barData = [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65];

export default function HomeInfo() {
  return (
    <div className="container-fluid p-0 m-0">
      <Animation>
        <div className="container-fluid">
          <div className="max-sm:overflow-x-auto rounded-xl">
            <div className="container-row max-sm:w-max max-sm:gap-2">
              <div className="col-md-3 col-lg-3 max-sm:w-60 lg:pr-1 max-sm:p-0 md:pr-0.5">
                <div className="bg-purple-900 border  info-box rounded-lg shadow-md p-10 px-5 pt-3 snap-center">
                  <div className="flex justify-between relative">
                    <div className="text-left">
                      <p className="text-md font-medium uppercase text-white">
                        Income
                      </p>
                      <h3 className="text-4xl font-bold leading-loose text-white">
                        $24k
                      </h3>
                    </div>
                    <h3 className="icon">
                      <MonetizationOnIcon sx={{ fontSize: 50 }} />
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 max-sm:w-60 lg:px-1 max-sm:p-0 md:px-0.5">
                <div className="bg-green-800  info-box border rounded-lg shadow-md p-10 px-5 pt-3 snap-center">
                  <div className="flex justify-between relative">
                    <div className="text-left">
                      <p className="text-md font-medium uppercase text-white">
                        Orders
                      </p>
                      <h3 className="text-4xl font-bold leading-loose text-white">
                        ! 200
                      </h3>
                    </div>
                    <h3 className="icon">
                      <SellIcon sx={{ fontSize: 50 }} />
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 max-sm:w-60 lg:px-1 max-sm:p-0 md:px-0.5">
                <div className="bg-blue-900  info-box border rounded-lg shadow-md p-10 px-5 pt-3 snap-center">
                  <div className="flex justify-between relative">
                    <div className="text-left">
                      <p className="text-md font-medium uppercase text-white">
                        Products
                      </p>
                      <h3 className="text-4xl font-bold leading-loose text-white">
                        # 100
                      </h3>
                    </div>
                    <h3 className="icon">
                      <SegmentIcon sx={{ fontSize: 50 }} />
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-lg-3 max-sm:w-60 lg:pl-1 max-sm:p-0 md:pl-0.5">
                <div className="bg-yellow-600  info-box border rounded-lg shadow-md p-10 px-5 pt-3 snap-center ">
                  <div className="flex justify-between relative">
                    <div className="text-left">
                      <p className="text-md font-medium uppercase text-white">
                        Users
                      </p>
                      <h3 className="text-4xl font-bold leading-loose text-white">
                        1K
                      </h3>
                    </div>
                    <h3 className="icon">
                      <PeopleIcon sx={{ fontSize: 50 }} />
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="chart my-11 mb-1 ">
          <div className="container">
            <div className="container-row ">
              <div className="col-lg-8 col-md-8 col-sm-12 max-sm:w-full p-1">
                <div className="bar-chart border rounded-lg p-2">
                  <h3 className="mb-5 text-left text-xl capitalize text-slate-800 font-semibold">
                    Income
                  </h3>
                  <div className="mx-auto">
                    <BarChart data={barData} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 max-sm:w-full p-1">
                <div className="pi-chart border rounded-lg p-2 h-full grid items-center">
                  <h3 className="mb-5 text-left text-xl capitalize text-slate-800 font-semibold">
                    Traffic Source
                  </h3>
                  <div className="mx-auto w-full flex justify-center">
                    <PieChart data={pieData} />
                  </div>
                  <div className="dtl-box grid grid-cols-3 justify-items-center p-5 my-5">
                    <div className="dtl-1 flex flex-col items-center">
                      <SegmentIcon
                        sx={{ fontSize: 40 }}
                        className="text-slate-900"
                      />
                      <p className="my-1 text-slate-900 font-bold">Products</p>
                      <p className=" text-slate-500">{pieData[0]}%</p>
                    </div>
                    <div className="dtl-2 flex flex-col items-center">
                      <PeopleIcon
                        sx={{ fontSize: 40 }}
                        className="text-slate-900"
                      />
                      <p className="my-1 text-slate-900 font-bold">Users</p>
                      <p className=" text-slate-500">{pieData[1]}%</p>
                    </div>

                    <div className="dtl-3 flex flex-col items-center">
                      <SellIcon
                        sx={{ fontSize: 40 }}
                        className="text-slate-900"
                      />
                      <p className="my-1 text-slate-900 font-bold">Orders</p>
                      <p className=" text-slate-500">{pieData[2]}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-12 ">
          <div className="container">
            <div className="container-row ">
              <div className="col-md-3 col-lg-3 p-1 max-sm:w-full ">
                <div className="p-2 border rounded-lg lg:h-[inherit]">
                  <h3 className="mb-3 text-left text-xl capitalize text-slate-800 my-2 font-semibold">
                    Reviews
                  </h3>
                  <div className="review-box h-[250px] max-sm:h-auto">
                    <div className="review-product flex mb-5">
                      <div className="avatar lg:mr-4 md:mr-2 mr-4">
                        <div className="w-10 rounded">
                          <img
                            alt="null"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>
                      <div className="w-8">
                        <div className="rating">
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                        </div>
                        <p className="block">salad</p>
                      </div>
                    </div>
                    <div className="review-product flex mb-5">
                      <div className="avatar lg:mr-4 md:mr-2 mr-4">
                        <div className="w-10 rounded">
                          <img
                            alt="null"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>
                      <div className="w-8">
                        <div className="rating">
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                        </div>
                        <p className="block">salad</p>
                      </div>
                    </div>
                    <div className="review-product flex mb-5">
                      <div className="avatar lg:mr-4 md:mr-2 mr-4">
                        <div className="w-10 rounded">
                          <img
                            alt="null"
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                          />
                        </div>
                      </div>
                      <div className="w-8">
                        <div className="rating">
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                            defaultChecked
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                          <input
                            type="radio"
                            name="rating-2"
                            className="mask mask-star-2 bg-orange-400"
                          />
                        </div>
                        <p className="block">salad</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-9 col-lg-9 p-1 overflow-hidden">
                <div className="p-2 border rounded-lg  ">
                  <h3 className="mb-3 text-left text-xl capitalize text-slate-800 my-2 font-semibold">
                    Latest Orders
                  </h3>
                  <div className="overflow-x-auto h-[250px] max-sm:h-auto">
                    <table className="table text-slate-800 table-fixed max-sm:w-max">
                      {/* head */}
                      <thead>
                        <tr className="bg-base-200 text-slate-600 uppercase text-sm font-thin  ">
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="hover">
                          <td>Cy Ganderton</td>
                          <td>Quality Control Specialist</td>
                          <td>Blue</td>
                          <td>
                            <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                              pending
                            </span>
                          </td>
                        </tr>
                        {/* row 2 */}
                        <tr className="hover">
                          <td>Hart Hagerty</td>
                          <td>Desktop Support Technician</td>
                          <td>Purple</td>
                          <td>
                            <span className="uppercase px-3 py-1 text-green-800 font-medium text-xs bg-opacity-40 bg-green-200 rounded-full">
                              Delivered
                            </span>
                          </td>
                        </tr>
                        {/* row 3 */}
                        <tr className="hover">
                          <td>Brice Swyre</td>
                          <td>Tax Accountant</td>
                          <td>Red</td>
                          <td>
                            <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                              refunded
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <NavLink
                  to="/current-order"
                  className="m-5 ease-out mr-14 float-end px-3 py-1 text-center  text-sm text-slate-800 font-medium bg-opacity-40 rounded-full cursor-pointer hover:bg-slate-800 hover:text-white max-sm:mr-3"
                >
                  View all <ArrowRightAltIcon />
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </Animation>
    </div>
  );
}
