import React, { useState } from "react";
import * as Mui from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SellIcon from "@mui/icons-material/Sell";
import SegmentIcon from "@mui/icons-material/Segment";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PeopleIcon from "@mui/icons-material/People";
import ReactApexChart from "react-apexcharts";

export default function HomeInfo() {
  const [pieData, setPieData] = useState([25, 5, 8]);
  const options = {
    colors: ["#3856ae", "#df9f16", "#30aa5e"],
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  total: {
                    fontSize: "20px",
                  },
                },
              },
            },
          },
        },
      },
    ],

    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    labels: ["Products", "Users", "Orders"],
    plotOptions: {
      pie: {
        selection: {
          enabled: false,
        },
        expandOnClick: false,
        select: false,
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total",
              fontSize: "35px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#373d3f",
            },
          },
        },
      },
    },
  };

  return (
    <div className="py-10 box-right mb-12 col-md-9 col-lg-9 col-sm-12">
      <div className="container">
        <div className="container-fluid">
          <div className="max-sm:overflow-x-auto rounded-xl">
            <div className="container-row max-sm:w-max max-sm:gap-2">
              <div className="col-md-3 col-lg-3 max-sm:w-60">
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
              <div className="col-md-3 col-lg-3 max-sm:w-60">
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
              <div className="col-md-3 col-lg-3 max-sm:w-60">
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
              <div className="col-md-3 col-lg-3 max-sm:w-60">
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
        <section className="chart my-11  ">
          <div className="container">
            <div className="container-row">
              <div className="col-lg-7 col-md-7 col-sm-12"></div>
              <div className="col-lg-5 col-md-5 col-sm-12 max-sm:w-full">
                <div className="pi-chart border-b">
                  <h3 className="mb-5 text-left text-xl capitalize text-slate-800 font-semibold">
                    Traffic Source
                  </h3>
                  <div className="mx-auto w-full flex justify-center">
                    <ReactApexChart
                      series={pieData}
                      options={options}
                      type="donut"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-10">
          <div className="container">
            <div className="container-row">
              <div className="col-md-4 col-lg-4 ">
                <div className="p-2">
                  <h3 className="text-left text-xl capitalize text-slate-800 my-2 font-semibold">
                    Reviews
                  </h3>
                  <div className="review-box">
                    <div className="review-product flex mb-5">
                      <div className="avatar mr-4">
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
                      <div className="avatar mr-4">
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
                      <div className="avatar mr-4">
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

              <div className="col-md-8 col-lg-8 ">
                <div className="my-5">
                  <h3 className="text-left text-xl capitalize text-slate-800 my-2 font-semibold">
                    Latest Orders
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="table text-slate-800 table-fixed">
                      {/* head */}
                      <thead>
                        <tr className="bg-base-200 text-slate-600 uppercase text-sm font-thin">
                          <th>Order</th>
                          <th>Customer</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* row 1 */}
                        <tr className="hover:bg-base-200">
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
                        <tr>
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
                        <tr>
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
                <a
                  href="#"
                  className="m-5 ease-out mr-14 float-end px-3 py-2 text-center  text-sm text-slate-800 font-medium bg-opacity-40 rounded-full cursor-pointer hover:bg-slate-100"
                >
                  View all <ArrowRightAltIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
