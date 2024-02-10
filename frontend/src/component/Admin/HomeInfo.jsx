import React, { useState } from "react";
import * as Mui from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SellIcon from "@mui/icons-material/Sell";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SegmentIcon from "@mui/icons-material/Segment";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import PeopleIcon from "@mui/icons-material/People";

const Item = Mui.styled(Mui.Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: "none",
  padding: 0,
  margin: 0,
}));

export default function HomeInfo() {
  return (
    <div className="py-10 info-box box-right">
      <div className=" overflow-x-auto rounded-xl m-0  snap-x max-md:mb-10">
        <div className="flex w-max gap-2">
          <div className="bg-purple-900 border rounded-lg shadow-md p-10 px-5 pt-3 w-56 snap-center">
            <div className="flex justify-between relative">
              <div className="text-left">
                <p className="text-md font-medium uppercase text-white">
                  Income
                </p>
                <h3 className="text-4xl font-bold leading-loose text-white">
                  $24k
                </h3>
              </div>
              <h3 className="icon ml-12 ">
                <MonetizationOnIcon sx={{ fontSize: 50 }} />
              </h3>
            </div>
          </div>

          <div className="bg-green-800 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 snap-center">
            <div className="flex justify-between relative">
              <div className="text-left">
                <p className="text-md font-medium uppercase text-white">
                  Orders
                </p>
                <h3 className="text-4xl font-bold leading-loose text-white">
                  ! 200
                </h3>
              </div>
              <h3 className="icon ml-12 ">
                <SellIcon sx={{ fontSize: 50 }} />
              </h3>
            </div>
          </div>

          <div className="bg-blue-900 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 snap-center">
            <div className="flex justify-between relative">
              <div className="text-left">
                <p className="text-md font-medium uppercase text-white">
                  Products
                </p>
                <h3 className="text-4xl font-bold leading-loose text-white">
                  # 100
                </h3>
              </div>
              <h3 className="icon ml-12 ">
                <SegmentIcon sx={{ fontSize: 50 }} />
              </h3>
            </div>
          </div>
          <div className="bg-yellow-600 border rounded-lg shadow-md p-10 px-5 pt-3 w-60 snap-center ">
            <div className="flex justify-between relative">
              <div className="text-left">
                <p className="text-md font-medium uppercase text-white">
                  Users
                </p>
                <h3 className="text-4xl font-bold leading-loose text-white">
                  1K
                </h3>
              </div>
              <h3 className="icon ml-12">
                <PeopleIcon sx={{ fontSize: 50 }} />
              </h3>
            </div>
          </div>
        </div>
      </div>

      <Mui.Grid container spacing={0} padding={0} margin={0}>
        <Mui.Grid item lg={4}>
          <Item></Item>
        </Mui.Grid>
        <Mui.Grid item lg={8} xs={12}>
          <Item>
            <div className="my-5">
              <h3 className="text-left text-xl capitalize text-slate-800 my-2 font-semibold">
                Latest Orders
              </h3>
              <div className="overflow-x-auto">
                <table className="table text-slate-800 ">
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
              <a className="m-5 ease-out mr-14 float-end px-3 py-2 text-center  text-sm text-slate-800 font-medium bg-opacity-40 rounded-full cursor-pointer hover:bg-slate-100">
                View all <ArrowRightAltIcon />
              </a>
            </div>
          </Item>
        </Mui.Grid>
      </Mui.Grid>
    </div>
  );
}
