import React, { useRef, useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import { IoCloseOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import axios from "axios";

export default function Category() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const closeBtn = useRef(null);

  const handleOnChange = (e) => {
    if (error && error.name) {
      setError({ ...error, name: null });
    } else {
      setError({ ...error, description: null });
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    const response = await axios
      .post("http://localhost:5000/api/category/", data)
      .catch((error) => setError(error.response.data.err));
    console.log(response);
    if (response && response.status === 200) {
      setSuccess(response.data);
      setData(null);
      closeBtn.current.click();
    }
  };
  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container ">
          {/* Toast */}
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="w-full flex justify-center absolute top-1 left-0 z-20">
              <div
                class={`-translate-y-20 opacity-0 transition duration-300 max-w-xs bg-white border  rounded-xl shadow-lg border-success ${
                  success ? "-translate-y-0 !opacity-100" : ""
                }`}
                role="alert"
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0 ">
                    <TiTick className="flex-shrink-0 size-4 rounded-full bg-success text-white mt-0.5 " />
                  </div>
                  <div className="ms-3">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      Category Created Successfully!
                    </p>
                  </div>
                  <div className="ms-auto">
                    <button
                      onClick={() => {
                        setSuccess(null);
                      }}
                      className="btn btn-sm h-auto min-h-[auto] hover:text-slate-900 text-slate-600 text-lg !border-none !bg-transparent"
                    >
                      <IoCloseOutline />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Toast End */}
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
                      name="name"
                      value={(data && data.name) || ""}
                      className={`input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        error && error.name ? "border-error text-error" : ""
                      }`}
                      onChange={handleOnChange}
                    />
                    {error && error.name && (
                      <span className="label-text-alt ml-2 text-error">
                        {error.name.msg}
                      </span>
                    )}
                    <textarea
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={(data && data.description) || ""}
                      className={`rounded-lg h-24 mt-5 w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered ${
                        error && error.description
                          ? "border-error text-error"
                          : ""
                      }`}
                      onChange={handleOnChange}
                    />
                    {error && error.description && (
                      <span className="label-text-alt ml-2 text-error">
                        {error.description.msg}
                      </span>
                    )}
                    <div className="grid grid-cols-2 gap-1 my-5 mt-10">
                      <button
                        type="btn"
                        onClick={handleOnSubmit}
                        className="rounded-full bg-slate-800 btn hover:bg-slate-700 text-white"
                      >
                        GO
                      </button>
                      <button
                        ref={closeBtn}
                        className="btn rounded-full bg-slate-500 text-white hover:bg-red-500 "
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
          <div className="overflow-x-auto my-11 max-w-full w-auto max-h-full block relative box-border rounded-lg">
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
