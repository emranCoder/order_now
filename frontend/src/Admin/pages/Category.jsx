import React from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";

export default function Category() {
  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          <div className="category-box">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                Category
              </h3>
              <label className="input mr-3 w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
              <div className="tooltip" data-tip="Add Category">
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
                <h3 className="font-bold text-lg">New Category!</h3>
                <p className="pt-4 ">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action justify-center">
                  <form method="dialog">
                    <input
                      type="text"
                      placeholder="Category Name"
                      className="input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc"
                    />
                    <textarea
                      type="text"
                      placeholder="Description"
                      className="rounded-lg h-24 my-5 w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered"
                    />
                    <div className="grid grid-cols-2 gap-1 my-5">
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

          <div className="overflow-x-auto my-11 max-w-full w-auto max-h-full block relative box-border">
            <table className="table-pin-rows table-zebra lg:table-sm table-pin-cols max-sm:w-max table">
              <thead className="table-row-group">
                <tr className="bg-base-300 text-slate-600 uppercase text-sm ">
                  <td></td>
                  <td className="table-cell align-[inherit]">Name</td>
                  <td className="table-cell align-[inherit]">No.Product</td>
                  <td className="table-cell align-[inherit]">Action</td>
                </tr>
              </thead>
              <tbody className="table-row-group box-border">
                <tr className="hover table-row align-middle">
                  <th className="table-cell align-[inherit]">1</th>
                  <td className="table-cell align-[inherit]">Cy Ganderton</td>
                  <td className="table-cell align-[inherit]">
                    {" "}
                    <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                      52
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
                <tr className="hover table-row align-middle">
                  <th className="table-cell align-[inherit]">2</th>
                  <td className="table-cell align-[inherit]">Cy Ganderton</td>
                  <td className="table-cell align-[inherit]">
                    {" "}
                    <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                      52
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
                <tr className="hover table-row align-middle">
                  <th className="table-cell align-[inherit]">3</th>
                  <td className="table-cell align-[inherit]">Cy Ganderton</td>
                  <td className="table-cell align-[inherit]">
                    {" "}
                    <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                      52
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
                <tr className="hover table-row align-middle">
                  <th className="table-cell align-[inherit]">4</th>
                  <td className="table-cell align-[inherit]">Cy Ganderton</td>
                  <td className="table-cell align-[inherit]">
                    {" "}
                    <span className="uppercase px-3 py-1 text-orange-800 font-medium text-xs bg-opacity-30 bg-orange-200 rounded-full">
                      52
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
            </table>
          </div>
        </div>
      </div>
    </Animation>
  );
}
