import React, { useEffect, useRef, useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import axios from "axios";
import Toast from "../Alert/Toast";
import defaultImg from "../../img/default-avatar.png";
import Cookies from "js-cookie";

export default function Staffs() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [previewFile, setPreviewFIle] = useState(null);
  const [data, setData] = useState();
  const [success, setSuccess] = useState(null);
  const [inputErr, setInputErr] = useState(null);
  const [staff, setStaff] = useState(null);
  const [edit, setEdit] = useState(null);

  const closeBtn = useRef(null);

  useEffect(() => {
    getStaff();
  }, [success]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#form");
    const staffUpload = new FormData(form);

    try {
      let response;
      if (edit) {
        staffUpload.append("id", edit._id);
        staffUpload.append("oldImg", edit.image);
        response = await axios.put(
          `http://localhost:5000/${process.env.API_KEY}/api/staff/auth/updatestaff`,
          staffUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: Cookies.get("auth"),
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:5000/${process.env.API_KEY}/api/staff/auth/addstaff`,
          staffUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: Cookies.get("auth"),
            },
          }
        );
      }

      if (response && response.status === 200) {
        setSuccess({ type: "success", msg: response.data.message });
        setData(null);
        setPreviewFIle(null);
        setEdit(null);
        closeBtn.current.click();
      }
    } catch (error) {
      if (error.response.data.err) {
        setInputErr(error.response.data.err);
      }
    }
  };

  const getStaff = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/${process.env.API_KEY}/api/staff/auth/getstaff`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setStaff(response.data.staff);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  const handleDelete = async (delId) => {
    let id = { id: delId };
    const response = await axios
      .delete(
        ` http://localhost:5000/${process.env.API_KEY}/api/staff/auth/removestaff`,
        { data: id },
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      )
      .catch((error) => console.error(error.response.data.err));
    if (response && response.status === 200) {
      setSuccess({ type: "del", msg: response.data.message });
    }
  };

  const handleSuccess = () => {
    setSuccess(null);
  };

  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container overflow-hidden">
          {/* Toast */}
          {success && <Toast msg={success} control={handleSuccess} />}
          {/* Toast End */}
          <dialog id="delete_modal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                Are You Sure You want to delete this staff?
              </h3>
              <p className="py-4">
                This will delete permanently. You can not undo this action.
              </p>
              <div className="modal-action">
                <form method="dialog" className="grid grid-cols-2 w-full gap-3">
                  <button className="btn rounded-full bg-transparent border-slate-700 border text-slate-700 hover:bg-slate-700 hover:text-slate-50">
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(edit);
                    }}
                    className="btn rounded-full  border-red-500 bg-red-500 border text-slate-50 hover:bg-red-700 "
                  >
                    Confirm
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="staff-box ">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                My Staffs
              </h3>
              <label className="input mr-3  w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
              <div className="tooltip" data-tip="Add Staffs">
                <button
                  className="bg-transparent btn-sm btn btn-circle  mr-5 border-dotted border-slate-500  border-2 rounded-full text-slate-500 cursor-pointer overflow-hidden flex justify-center !content-center"
                  onClick={() => {
                    setEdit(null);
                    setData(null);
                    setSuccess(null);
                    setPreviewFIle(null);
                    document.getElementById("my_modal_1").showModal();
                  }}
                >
                  <Mui.ListItemButton className="!p-1 !m-0 !flex !justify-center !items-center">
                    <AddIcon sx={{ fontSize: 25 }} />
                  </Mui.ListItemButton>
                </button>
              </div>
            </div>

            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  {(edit && "Edit") || "New"} Staff!
                </h3>

                <div className="modal-action justify-center">
                  <form method="dialog" encType="multipart/form-data" id="form">
                    <input
                      onChange={handleOnChange}
                      type="text"
                      name="fullName"
                      placeholder="Staff Name"
                      defaultValue={edit && edit.fullName ? edit.fullName : ""}
                      className={`input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.fullName && "border-red-500"
                      }`}
                    />
                    {inputErr && inputErr.fullName && (
                      <small className="text-red-500">
                        {inputErr.fullName.msg}
                      </small>
                    )}
                    <input
                      onChange={handleOnChange}
                      type="text"
                      placeholder="Phone Number (01........)"
                      name="mobile"
                      defaultValue={edit && edit.mobile ? edit.mobile : ""}
                      className={`input mt-2 input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.mobile && "border-red-500"
                      }`}
                    />
                    {inputErr && inputErr.mobile && (
                      <small className="text-red-500">
                        {inputErr.mobile.msg}
                      </small>
                    )}
                    <input
                      onChange={handleOnChange}
                      type="text"
                      placeholder="NID No."
                      name="nidNo"
                      defaultValue={edit && edit.nidNo ? edit.nidNo : ""}
                      className={`input mt-2 input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.nidNo && "border-red-500"
                      }`}
                    />
                    {inputErr && inputErr.nidNo && (
                      <small className="text-red-500">
                        {inputErr.nidNo.msg}
                      </small>
                    )}
                    <select
                      onChange={handleOnChange}
                      value={
                        data && data.role
                          ? data.role
                          : edit && edit.role
                          ? edit.role
                          : 1
                      }
                      className="select select-bordered  input mt-2  rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc"
                      name="role"
                    >
                      <option disabled value="1">
                        Choose Staff Role
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="Head. Chef">Head. Chef</option>
                      <option value="Assistant Chef">Assistant Chef</option>
                      <option value="Steward">Steward</option>
                      <option value="Cleaner">Cleaner</option>
                      <option value="Guard">Guard</option>
                    </select>
                    <input
                      onChange={handleOnChange}
                      defaultValue={edit && edit.wages ? edit.wages : ""}
                      type="text"
                      placeholder="Salary Amount (in hr/USD)"
                      name="wages"
                      className={`input mt-2 input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.wages && "border-red-500"
                      }`}
                    />
                    {inputErr && inputErr.wages && (
                      <small className="text-red-500">
                        {inputErr.wages.msg}
                      </small>
                    )}

                    <div className="my-2">
                      <label
                        onClick={() => {
                          document.getElementById("fileInput").click();
                        }}
                        htmlFor="files"
                        className="h-auto btn border-dotted border-slate-600 hover:bg-slate-200 text-slate-500   rounded-lg flex p-3"
                      >
                        {previewFile && (
                          <div className="avatar mr-5">
                            <div className="mask mask-squircle w-20 h-20">
                              <img src={previewFile} id="preview" />
                            </div>
                          </div>
                        )}
                        Upload Staff Image
                      </label>
                      <input
                        type="file"
                        name="staffImage"
                        id="fileInput"
                        placeholder="Upload Staff Image"
                        className="file-input w-full file-input-sm  hidden"
                        accept="image/*"
                        onChange={(e) => {
                          let fileName = e.target.files[0];
                          let preview = URL.createObjectURL(fileName);
                          setPreviewFIle(preview);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-1 my-5 ">
                      <button
                        onClick={handleOnSubmit}
                        type="btn"
                        className="rounded-full bg-slate-800 btn hover:bg-slate-700 text-white"
                      >
                        GO
                      </button>
                      <button
                        ref={closeBtn}
                        className="btn rounded-full bg-transparent text-slate-700 border-slate-700 border hover:bg-red-500  hover:text-slate-50"
                      >
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
                  <th>Phone Number</th>
                  <th>Role</th>
                  <th>Salary Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staff &&
                  staff.map((val, key) => (
                    <tr key={key}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`http://localhost:5000/staff/img/${val.avatar}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{val.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="text-sm opacity-80">{val.mobile}</p>
                      </td>
                      <td>
                        <p>{val.role}</p>
                      </td>
                      <td>
                        <span className="uppercase px-3 py-1 text-green-800 font-medium text-xs bg-opacity-40 bg-green-200 rounded-full">
                          {val.wages} h/USD
                        </span>
                      </td>
                      <td className="flex gap-3">
                        <button
                          onClick={() => {
                            setEdit(val);
                            setPreviewFIle(
                              `http://localhost:5000/staff/img/${val.avatar}`
                            );
                            document.getElementById("my_modal_1").showModal();
                          }}
                          className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                        >
                          <Mui.ListItemButton className="!flex !justify-center !items-center">
                            <EditIcon sx={{ fontSize: 18 }} />
                          </Mui.ListItemButton>
                        </button>
                        <button
                          onClick={() => {
                            setEdit(val._id);
                            document.getElementById("delete_modal").showModal();
                          }}
                          className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                        >
                          <Mui.ListItemButton className="!flex !justify-center !items-center">
                            <HighlightOffIcon sx={{ fontSize: 18 }} />
                          </Mui.ListItemButton>
                        </button>
                      </td>
                    </tr>
                  ))}
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
