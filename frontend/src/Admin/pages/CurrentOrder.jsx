import React, { useState } from "react";
import * as Mui from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";

export default function CurrentOrder() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          <div className="all-order-box content-center">
            <div className="flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                Current Order
              </h3>
              <label className="input mr-3 max-sm:w-3/6 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-500  items-center gap-2">
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="hover ">
                    <td>Cy Ganderton</td>
                    <td>Quality Control Specialist</td>
                    <td>
                      <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                        pending
                      </span>
                    </td>
                    <td>Blue</td>
                    <td className="flex gap-3">
                      <button className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <EditIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                      <button className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <HighlightOffIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                    </td>
                  </tr>
                  {/* row 2 */}
                  <tr className="hover">
                    <td>Hart Hagerty</td>
                    <td>Desktop Support Technician</td>

                    <td>
                      <span className="uppercase px-3 py-1 text-green-800 font-medium text-xs bg-opacity-40 bg-green-200 rounded-full">
                        Delivered
                      </span>
                    </td>
                    <td>Purple</td>
                    <td className="flex gap-3">
                      <button className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <EditIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                      <button className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <HighlightOffIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                    </td>
                  </tr>
                  {/* row 3 */}
                  <tr className="hover">
                    <td>Brice Swyre</td>
                    <td>Tax Accountant</td>

                    <td>
                      <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                        refunded
                      </span>
                    </td>
                    <td>Red</td>
                    <td className="flex gap-3">
                      <button className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <EditIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                      <button className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                        <Mui.ListItemButton className="!flex !justify-center !items-center">
                          <HighlightOffIcon sx={{ fontSize: 18 }} />
                        </Mui.ListItemButton>
                      </button>
                    </td>
                  </tr>
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
