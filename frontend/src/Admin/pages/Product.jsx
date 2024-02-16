import React, { useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";

export default function Product() {
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
          <div className="product-box ">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">Product</h3>
              <label className="input mr-3  w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-500  items-center gap-2">
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

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">New Product!</h3>

                <div className="modal-action justify-center">
                  <form method="dialog">
                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      className="input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1oc"
                    />
                    <input
                      type="text"
                      placeholder="Price"
                      name="price"
                      className="input mt-2 input-bordered rounded-lg w-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1oc"
                    />
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="rounded-lg h-24 my-2 w-full focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered"
                    />
                    <input
                      type="file"
                      name="image"
                      placeholder="Upload Product Image"
                      className="file-input w-full file-input-sm  "
                    />
                    <div className="grid grid-cols-2 gap-1 my-5 mt-10">
                      <button
                        type="btn"
                        className="rounded-full bg-slate-800 btn hover:bg-slate-700 text-white"
                      >
                        GO
                      </button>
                      <button className="btn rounded-full bg-slate-500 text-white hover:bg-red-500 ">
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <div className="overflow-x-auto mt-10">
            <table className="table  max-sm:w-max ">
              {/* head */}
              <thead>
                <tr className="bg-base-300 text-slate-600 uppercase text-sm">
                  <th>Image</th>
                  <th className="max-sm:hidden">Description</th>
                  <th>Price</th>
                  <th>Offer</th>
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
                  <td className="w-1/2 max-sm:hidden">
                    <p className="text-sm opacity-80">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatem porro quaerat ut beatae quisquam non a?
                    </p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>
                    <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                      0%
                    </span>
                  </td>
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
                  <td className="w-1/2 max-sm:hidden">
                    <p className="text-sm opacity-80">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatem porro quaerat ut beatae quisquam non a?
                    </p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>
                    <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                      0%
                    </span>
                  </td>
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
                  <td className="w-1/2 max-sm:hidden">
                    <p className="text-sm opacity-80">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatem porro quaerat ut beatae quisquam non a?
                    </p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>
                    <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                      0%
                    </span>
                  </td>
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
                  <td className="w-1/2 max-sm:hidden">
                    <p className="text-sm opacity-80">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatem porro quaerat ut beatae quisquam non a?
                    </p>
                  </td>
                  <td>
                    <p>50$</p>
                  </td>
                  <td>
                    <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                      0%
                    </span>
                  </td>
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
