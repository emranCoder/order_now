import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import Cookies from "js-cookie";
import Toast from "../Alert/Toast";
export default function Message() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [message, setMessage] = useState(null);
  const [viewMessage, setViewMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    getMessage();
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/message/all`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setMessage(response.data.message);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };
  const handleSearch = (e) => {
    if (e.key === "Backspace" && !e.target.value.trim().length) {
      setSearch("");
    }
    if (e.target.value.trim().length) {
      setSearch(e.target.value.trim());
    }
  };

  const handleSuccess = () => {
    setSuccess(null);
  };

  const handleUpdateStatus = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/message/`,
        { id: id, status: true },
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setSuccess({ type: "success", msg: response.data.mess });
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };
  return (
    <Animation>
      <div className="rounded-xl bmessage shadow-lg p-10 pt-5 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          {/* Toast */}
          {success && <Toast msg={success} control={handleSuccess} />}
          {/* Toast End */}
          <div className="all-message-box mt-5 ">
            <div className="flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                All Messages
              </h3>
              <dialog id="view_message" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Message Info!</h3>
                  <p className="pt-3">Product List</p>
                  <div className="modal-action justify-center mt-5">
                    {viewMessage && (
                      <form method="dialog">
                        <label htmlFor="">Email</label>
                        <input
                          type="disabled"
                          placeholder="Category Name"
                          name="name"
                          defaultValue={viewMessage.email}
                          className="input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc mb-3 bg-stone-100"
                          readOnly
                        />
                        <label htmlFor="">Subject</label>
                        <input
                          type="disabled"
                          placeholder="Category Name"
                          name="name"
                          defaultValue={viewMessage.subject}
                          className="input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc mb-3 bg-stone-100"
                          readOnly
                        />
                        <label htmlFor="">Message</label>
                        <textarea
                          type="disabled"
                          placeholder="Description"
                          name="description"
                          defaultValue={viewMessage.message}
                          className="rounded-lg h-36 mb-3 w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered bg-stone-100"
                          readOnly
                        />
                        <div className="grid justify-end my-3 mt-5">
                          <button className="btn rounded-full bg-slate-500 text-white hover:bg-rose-500 ">
                            Close
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </dialog>
              <label className="input mr-3 max-sm:w-3/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                  onKeyUpCapture={handleSearch}
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
            </div>
            <div className="overflow-x-auto mt-10 bmessage rounded-lg">
              <table className="table table-zebra  text-slate-800 table-fixed max-sm:w-max">
                {/* head */}
                <thead>
                  <tr className="bg-base-300 text-slate-600 uppercase text-sm justify-center">
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {message &&
                    message
                      .slice(page, rowsPerPage)
                      .filter((item) => {
                        return search.toLowerCase() === ""
                          ? item
                          : item.email.toLowerCase().includes(search) ||
                              item._id.toLowerCase().includes(search) ||
                              item.message.toLowerCase().includes(search) ||
                              item.subject.toLowerCase().includes(search);
                      })
                      .sort((el) => el.messageStatus === "Pending")
                      .map((val, key) => (
                        <tr
                          className={`hover  ${
                            val.status ? "" : "bg-rose-50 border-rose-300"
                          }`}
                          key={key}
                        >
                          <td className="hover:text-sky-900 ">{val.email}</td>
                          <td>{val.subject}</td>
                          <td>
                            <span className="text-stone-500">
                              {new Date(val.messageDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                              ,{" "}
                            </span>
                            {new Date(val.messageDate).toLocaleTimeString(
                              "en-us",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </td>
                          <td className="flex justify-center gap-5">
                            <div className="tooltip" data-tip="Mark as Read">
                              <button
                                className={`btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden ${
                                  val.status ? "btn-disabled" : ""
                                }`}
                                onClick={() => {
                                  handleUpdateStatus(val._id);
                                }}
                              >
                                <Mui.ListItemButton className="!flex !justify-center !items-center">
                                  <CheckIcon sx={{ fontSize: 18 }} />
                                </Mui.ListItemButton>
                              </button>
                            </div>
                            <div className="tooltip" data-tip="View">
                              <button
                                onClick={() => {
                                  setViewMessage(val);
                                  document
                                    .getElementById("view_message")
                                    .showModal();
                                }}
                                className="btn btn-sm bg-slate-700 border-slate-700 hover:bg-slate-800 text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                              >
                                <Mui.ListItemButton className="!flex !justify-center !items-center">
                                  <VisibilityIcon sx={{ fontSize: 18 }} />
                                </Mui.ListItemButton>
                              </button>
                            </div>
                          </td>
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
