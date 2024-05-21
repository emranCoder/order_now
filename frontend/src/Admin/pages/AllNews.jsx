import React, { useEffect, useRef, useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import Toast from "../Alert/Toast";
import axios from "axios";
import Cookies from "js-cookie";

export default function AllNews() {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [news, setNews] = useState(null);
  const [success, setSuccess] = useState(null);
  const [edit, setEdit] = useState(false);
  const closeBtn = useRef(null);
  const [search, setSearch] = useState("");
  const [activate, setActivate] = useState(false);
  const [previewFile, setPreviewFIle] = useState(null);
  const [del, setDel] = useState("");
  const inputFile = useRef(null);

  useEffect(() => {
    getNews();
  }, [success]);

  const handleOnChange = (e) => {
    setActivate(true);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    try {
      const form = document.querySelector("#form");
      const dataUpload = new FormData(form);

      let response;
      if (edit) {
        dataUpload.append("id", data.id);
        dataUpload.append("oldImg", data.image);
        response = await axios.put(
          `http://localhost:5000/api/news/`,
          dataUpload,
          {
            headers: {
              token: Cookies.get("auth"),
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:5000/api/news/`,
          dataUpload,
          {
            headers: {
              token: Cookies.get("auth"),
            },
          }
        );
      }
      if (response && response.status === 200) {
        setSuccess({ type: "success", msg: response.data.message });
        inputFile.current.value = "";
        setPreviewFIle(null);
        setData(null);
        closeBtn.current.click();
      }
    } catch (error) {
      if (error.response.data.err) {
        setError(error.response.data.err);
      }
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  const handleDelete = async (delId) => {
    let id = { id: delId };
    const response = await axios
      .delete(`http://localhost:5000/api/news/`, {
        headers: {
          token: Cookies.get("auth"),
        },
        data: id,
      })
      .catch((error) => console.error(error.response.data.err));
    console.log(response);
    if (response && response.status === 200) {
      setSuccess({ type: "del", msg: response.data.message });
    }
  };
  const handleSuccess = () => {
    setSuccess(null);
  };

  const getNews = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/news/all`);
      if (response && response.status === 200) {
        console.log();
        setNews(response.data.news);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
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

  return (
    <Animation>
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5">
        <div className="container ">
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
                  <button
                    onClick={() => {
                      if (del) {
                        handleDelete(del);
                      }
                    }}
                    className="btn rounded-full bg-transparent  border-rose-500  text-rose-500 hover:bg-rose-700 hover:text-slate-50 "
                  >
                    Confirm
                  </button>
                  <button className="btn rounded-full  bg-slate-700 border-slate-700 border text-slate-50 hover:bg-slate-800 hover:text-slate-50">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <div className="news-box">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">News</h3>
              <label className="input mr-3 w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                  onKeyUpCapture={handleSearch}
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
              <div className="tooltip" data-tip="Add News">
                <button
                  className="bg-transparent btn-sm btn btn-circle  mr-5 border-dotted border-slate-500  border-2 rounded-full text-slate-500 cursor-pointer overflow-hidden flex justify-center !content-center"
                  onClick={() => {
                    document.getElementById("my_modal_1").showModal();
                    setData(null);
                    setSuccess(null);
                    inputFile.current.value = "";
                    setPreviewFIle(null);
                    setError(null);
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
                  {(!edit && "New") || "Edit"} News!
                </h3>
                <p className="pt-4 ">
                  Press ESC key or click the button below to close
                </p>
                <div className="modal-action justify-center">
                  <form
                    id="form"
                    method="dialog"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <input
                      type="text"
                      placeholder="News Title"
                      name="title"
                      value={(data && data.title) || ""}
                      className={`input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        error && error.title ? "border-error text-error" : ""
                      }`}
                      onChange={handleOnChange}
                    />
                    {error && error.title && (
                      <span className="label-text-alt ml-2 text-error">
                        {error.title.msg}
                      </span>
                    )}
                    <textarea
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={(data && data.description) || ""}
                      maxLength={255}
                      className={`h-32 rounded-lg  mt-5 w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered ${
                        error && error.description
                          ? "border-error text-error"
                          : ""
                      }`}
                      onChange={handleOnChange}
                    />
                    <label className="text-xs text-red-400">
                      *Description should be in 255 character
                    </label>
                    {error && error.description && (
                      <span className="label-text-alt ml-2 text-error">
                        {error.description.msg}
                      </span>
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
                        Upload Image
                      </label>
                      <input
                        type="file"
                        name="staffImage"
                        id="fileInput"
                        placeholder="Upload Staff Image"
                        className="file-input w-full file-input-sm  hidden"
                        ref={inputFile}
                        accept="image/*"
                        onChange={(e) => {
                          setActivate(true);
                          let fileName = e.target.files[0];
                          let preview = URL.createObjectURL(fileName);
                          setPreviewFIle(preview);
                        }}
                      />
                      {error && error.image && (
                        <small className="text-red-500">
                          {error.image.msg}
                        </small>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-1 my-5 mt-10">
                      <button
                        type="btn"
                        onClick={() => {
                          if (activate) {
                            handleOnSubmit();
                          }
                        }}
                        className={`rounded-full bg-slate-800 btn hover:bg-slate-700 text-white ${
                          activate ? "" : "btn-disabled"
                        }`}
                      >
                        GO
                      </button>
                      <button
                        ref={closeBtn}
                        onClick={() => {
                          setEdit(false);
                          document.getElementById("my_modal_1").close();
                        }}
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
                  <td className="table-cell align-[inherit]">Image</td>
                  <td className="table-cell align-[inherit]">Title</td>
                  <td className="table-cell align-[inherit]">Description</td>
                  <td className="table-cell align-[inherit]">Action</td>
                </tr>
              </thead>
              <tbody className="table-row-group box-border">
                {news &&
                  news
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item._id.toLowerCase().includes(search) ||
                            item.title.toLowerCase().includes(search) ||
                            item.description.toLowerCase().includes(search);
                    })
                    .map((val, key) => (
                      <tr key={key} className="hover table-row align-middle">
                        <th className="table-cell align-[inherit]">
                          {key + 1}
                        </th>
                        <td>
                          <div className="avatar">
                            <div className=" h-16  mask mask-squircle">
                              <img
                                src={`http://localhost:5000/news/img/${
                                  val.image ? val.image : "default-product.png"
                                }`}
                              />
                            </div>
                          </div>
                        </td>
                        <td>{val.title}</td>
                        <td className="table-cell align-[inherit]">
                          {val.description}
                        </td>

                        <td className="flex gap-3">
                          <button
                            className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                            onClick={() => {
                              setData({
                                image: val.image,
                                description: val.description,
                                title: val.title,
                                id: val._id,
                              });
                              setEdit(true);
                              setPreviewFIle(
                                `http://localhost:5000/news/img/${
                                  val.image ? val.image : "default-product.png"
                                }`
                              );
                              document.getElementById("my_modal_1").showModal();
                            }}
                          >
                            <Mui.ListItemButton className="!flex !justify-center !items-center">
                              <EditIcon sx={{ fontSize: 18 }} />
                            </Mui.ListItemButton>
                          </button>
                          <button
                            className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                            onClick={() => {
                              setDel(val._id);
                              document
                                .getElementById("delete_modal")
                                .showModal();
                            }}
                          >
                            <Mui.ListItemButton className="!flex !justify-center !items-center">
                              <HighlightOffIcon sx={{ fontSize: 18 }} />
                            </Mui.ListItemButton>
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Animation>
  );
}
