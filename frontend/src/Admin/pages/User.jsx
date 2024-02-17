import React, { useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";

export default function User() {
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
          <div className="category-box">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                All Users
              </h3>
              <label className="input mr-3  w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
              <div className="tooltip" data-tip="Add Product">
                <button
                  className="bg-transparent btn-sm btn btn-circle  mr-5 border-dotted border-slate-500  border-2 rounded-full text-slate-500 cursor-pointer overflow-hidden flex justify-center !content-center"
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  <Mui.ListItemButton className="!p-1 !m-0 !flex !justify-center !items-center">
                    <AddIcon sx={{ fontSize: 25 }} />
                  </Mui.ListItemButton>
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-10 rounded-lg">
            <table className="table  max-sm:w-max ">
              {/* head */}
              <thead>
                <tr className="bg-base-300 text-slate-600 uppercase text-sm">
                  <th>Image</th>
                  <th>email</th>
                  <th>Phone No.</th>
                  <th>Addr</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm opacity-80"> mail@example.com</p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>+8801....</td>
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
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://daisyui.com/tailwind-css-component-profile-3@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Brice Swyre</div>
                        <div className="text-sm opacity-50">China</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm opacity-80"> mail@example.com</p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>+88019.....</td>
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
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://daisyui.com/tailwind-css-component-profile-4@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Marjy Ferencz</div>
                        <div className="text-sm opacity-50">Russia</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm opacity-80"> mail@example.com</p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>+88.012...</td>
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
                {/* row 4 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="https://daisyui.com/tailwind-css-component-profile-5@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Yancy Tear</div>
                        <div className="text-sm opacity-50">Brazil</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-sm opacity-80"> mail@example.com</p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>+88.12</td>
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
              {/* foot */}
            </table>
          </div>
          <Mui.TablePagination
            component="div"
            count={100}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </Animation>
  );
}
