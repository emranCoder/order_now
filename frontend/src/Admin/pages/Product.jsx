import React, { useEffect, useRef, useState } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Toast from "../Alert/Toast";
import Animation from "../spinner/Animation";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Product() {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState();
  const [category, setCategory] = useState(null);
  const [product, setProduct] = useState(null);
  const [previewFile, setPreviewFIle] = useState(null);
  const [success, setSuccess] = useState(null);
  const [inputErr, setInputErr] = useState(null);

  const closeBtn = useRef(null);

  useEffect(() => {
    getCategory();
    getProduct();
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
    const productUpload = new FormData(form);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/product/",
        productUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: Cookies.get("auth-token"),
          },
        }
      );
      if (response && response.status === 200) {
        setSuccess({ type: "success", msg: response.data.message });
        setData(null);
        closeBtn.current.click();
      }
    } catch (error) {
      if (error.response.data.err) {
        setInputErr(error.response.data.err);
      }
    }
  };
  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/category/all",
        {
          headers: {
            token: Cookies.get("auth-token"),
          },
        }
      );
      if (response && response.status === 200) {
        setCategory(response.data.category);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/product/all");
      if (response && response.status === 200) {
        setProduct(response.data.products);
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
        "http://localhost:5000/api/product/",
        { data: id },
        {
          headers: {
            token: Cookies.get("auth-token"),
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
          <div className="product-box ">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">Product</h3>
              <label className="input mr-3  w-2/5 max-sm:h-9  h-10 rounded-full  input-bordered input-md flex focus-within:outline-none focus-within:border-sky-800  items-center gap-2">
                <input
                  type="text"
                  className="grow max-sm:w-0 "
                  placeholder="Search"
                />
                <SearchIcon sx={{ fontSize: 20 }} />
              </label>
              <div className="tooltip " data-tip="Add Product">
                <button
                  className="bg-transparent btn-sm btn btn-circle   mr-5 border-dotted border-slate-500  border-2 rounded-full text-slate-500 cursor-pointer overflow-hidden flex justify-center !content-center"
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
                  <form
                    id="form"
                    method="dialog"
                    className="grid w-full gap-y-2"
                    encType="multipart/form-data"
                  >
                    <select
                      onChange={handleOnChange}
                      name="category"
                      className={`select select-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc mb-2 ${
                        inputErr && inputErr.category && "border-red-500"
                      }`}
                      defaultValue="default"
                      required
                    >
                      <option disabled value="default">
                        Choose Category
                      </option>
                      {category &&
                        category.map((val, key) => (
                          <option key={key}>{val.name}</option>
                        ))}
                    </select>
                    {inputErr && inputErr.category && (
                      <small className="text-red-500">
                        {inputErr.category.msg}
                      </small>
                    )}
                    <input
                      type="text"
                      name="name"
                      placeholder="Product Name"
                      className={`input input-bordered rounded-lg w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.name && "border-red-500"
                      }`}
                      onChange={handleOnChange}
                    />
                    {inputErr && inputErr.name && (
                      <small className="text-red-500">
                        {inputErr.name.msg}
                      </small>
                    )}
                    <div
                      className={`input mt-2 flex items-center input-bordered rounded-lg w-full focus:outline-none focus-within:border-sky-800 !outline-none focus-within:ring-sky-500 focus:ring-1oc ${
                        inputErr && inputErr.price && "border-red-500"
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        className="grow"
                        onChange={handleOnChange}
                      />
                      <span>USD ($)</span>
                    </div>
                    {inputErr && inputErr.price && (
                      <small className="text-red-500">
                        {inputErr.price.msg}
                      </small>
                    )}
                    <textarea
                      type="text"
                      name="description"
                      placeholder="Description"
                      className="rounded-lg h-24 my-2 w-full focus:outline-none focus:border-sky-800 focus:ring-sky-500 focus:ring-1oc textarea textarea-bordered"
                      onChange={handleOnChange}
                    />
                    <input
                      type="file"
                      name="image"
                      placeholder="Upload Product Image"
                      className="file-input w-full file-input-sm"
                      onChange={(e) => {
                        let fileName = e.target.files[0];
                        setPreviewFIle(fileName);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-1 my-5 mt-10">
                      <button
                        onClick={handleOnSubmit}
                        type="btn"
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

                {product &&
                  product.map((val, key) => (
                    <tr key={key}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={`http://localhost:5000/products/img/${val.image}`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <Link
                              to="/viewproduct"
                              state={val._id}
                              className="font-bold"
                            >
                              {val.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className=" max-sm:hidden">
                        <p className="text-sm opacity-80">{val.description}</p>
                      </td>
                      <td>
                        <p>{val.price}$</p>
                      </td>
                      <td className="p-0">
                        <span className="uppercase px-3 py-1 text-red-800 font-medium text-xs bg-opacity-40 bg-red-200 rounded-full">
                          {val.discount} %
                        </span>
                      </td>
                      <td className="flex gap-3">
                        <Link
                          to="/viewproduct"
                          state={val._id}
                          className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden"
                        >
                          <Mui.ListItemButton className="!flex !justify-center !items-center">
                            <EditIcon sx={{ fontSize: 18 }} />
                          </Mui.ListItemButton>
                        </Link>
                        <button
                          onClick={() => {
                            let chk = window.confirm(
                              "Attention! You want to delete this data!"
                            );
                            if (chk === true) handleDelete(val._id);
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
