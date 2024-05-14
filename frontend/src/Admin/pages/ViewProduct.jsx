import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import Animation from "../spinner/Animation";
import EditIcon from "@mui/icons-material/Edit";
import Toast from "../Alert/Toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewProduct(props) {
  const [previewFile, setPreviewFIle] = useState(null);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState();
  const [product, setProduct] = useState(null);
  const [success, setSuccess] = useState(null);
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (state === null) navigate("/product");

    getProduct();
  }, [success]);

  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = document.querySelector("#form");
    const newData = new FormData(form);
    newData.append("id", product._id);
    newData.append("oldImg", product.image);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/product/`,
        newData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setSuccess({ type: "success", msg: response.data.message });
        setData(null);
        setEdit(false);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product/${state}`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setProduct(response.data.product);
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
      console.log(error.response.data.message);
    }
  };
  const handleSuccess = () => {
    setSuccess(null);
  };
  return (
    product && (
      <Animation>
        <div className="rounded-xl border shadow-lg mb-28 p-10 max-sm:px-0 px-5 max-sm:py-5">
          <div className="container overflow-hidden">
            {/* Toast */}
            {success && <Toast msg={success} control={handleSuccess} />}
            {/* Toast End */}
            <div className="view-product">
              <div className="head flex justify-between content-center">
                <h3 className="text-2xl font-semibold text-slate-600">
                  <span className="text-green-800">
                    {" "}
                    {(edit && "Edit ") || ""}
                  </span>
                  Product
                </h3>

                <div className="tooltip" data-tip="Add Product">
                  <button
                    onClick={() => {
                      edit ? setEdit(false) : setEdit(true);
                    }}
                    className="bg-transparent btn-sm btn btn-circle  mr-5 border-dotted border-slate-500  border-2 rounded-full text-slate-500 cursor-pointer overflow-hidden flex justify-center !content-center"
                  >
                    <Mui.ListItemButton className="!p-1 !m-0 !flex !justify-center !items-center">
                      <EditIcon sx={{ fontSize: 16 }} />
                    </Mui.ListItemButton>
                  </button>
                </div>
              </div>
              <form
                id="form"
                encType="multipart/form-data"
                method="dialog"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="container">
                  <div className="container-row justify-center my-10">
                    <div className="col-lg-4">
                      <div>
                        <figure
                          className="w-auto  btn h-full !border-none !bg-transparent"
                          onClick={() => {
                            if (edit)
                              document.getElementById("fileInput").click();
                          }}
                        >
                          <img
                            src={
                              previewFile
                                ? previewFile
                                : `http://localhost:5000/products/img/${product.image}`
                            }
                            alt="Movie"
                            className="rounded-3xl"
                          />
                        </figure>
                        {edit && (
                          <div className="w-full overflow-hidden rounded-lg  max-sm:mt-0 my-5">
                            <Mui.ListItemButton
                              sx={{
                                width: "100%",
                                height: "100%",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              <label
                                onClick={() => {
                                  document.getElementById("fileInput").click();
                                }}
                                htmlFor="files"
                                className="btn w-full !bg-transparent !outline-none !border-0 font-semibold text-sky-800 rounded-lg"
                              >
                                Tap here to Change Picture
                              </label>
                              <input
                                type="file"
                                name="image"
                                id="fileInput"
                                placeholder="Upload Image"
                                className="file-input w-full file-input-sm  hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  let fileName = e.target.files[0];
                                  let preview = URL.createObjectURL(fileName);
                                  setPreviewFIle(preview);
                                }}
                              />
                            </Mui.ListItemButton>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 max-sm:w-full">
                      <div
                        className={`card max-sm:px-2  gap-y-2 ${
                          edit ? "lg:px-4" : "lg:px-8"
                        }`}
                      >
                        <h2 className="card-title text-3xl">
                          {(edit && (
                            <input
                              type="text"
                              className="rounded-lg w-full bg-gray-100 p-2 px-4 focus-within:border border-slate-600 !outline-none"
                              defaultValue={product.name}
                              onChange={handleOnChange}
                              name="name"
                            />
                          )) ||
                            product.name}
                        </h2>
                        <p className="text-slate-600 text-lg mb-5">
                          {(edit && (
                            <textarea
                              type="text"
                              className="rounded-lg w-full bg-gray-100 p-2 px-4 focus-within:border border-slate-600 !outline-none"
                              defaultValue={product.description}
                              onChange={handleOnChange}
                              name="description"
                            />
                          )) ||
                            product.description}
                        </p>
                        <table className="w-fit">
                          <tbody>
                            {!edit && (
                              <tr>
                                <td className="font-semibold">
                                  <span>Category</span>
                                </td>
                                <td className=" px-3">:</td>
                                <td>
                                  <span className="font-semibold text-slate-600">
                                    {product.category}
                                  </span>
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td className="font-semibold">
                                <span>Price</span>
                              </td>
                              <td className=" px-3">:</td>
                              <td>
                                <span className="line-through text-red-700">
                                  <span className="mr-1">$</span>

                                  {(edit && (
                                    <input
                                      type="text"
                                      className="rounded-lg bg-gray-100 p-2 px-4 focus-within:border border-slate-600 !outline-none"
                                      defaultValue={product.price}
                                      onChange={handleOnChange}
                                      name="price"
                                    />
                                  )) ||
                                    product.price}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td className="font-semibold">
                                <span c>Discount</span>
                              </td>
                              <td className=" px-3">:</td>
                              <td>
                                <span className="mr-1">%</span>
                                {(edit && (
                                  <input
                                    type="text"
                                    className="rounded-lg bg-gray-100 p-2 px-4 focus-within:border border-slate-600 !outline-none"
                                    onChange={handleOnChange}
                                    name="discount"
                                    defaultValue={
                                      (product.discount && product.discount) ||
                                      0
                                    }
                                  />
                                )) ||
                                  (product.discount && product.discount) ||
                                  0}
                              </td>
                            </tr>

                            <tr className={(edit && "hidden") || ""}>
                              <td className="font-semibold">
                                <span>Affter discount</span>
                              </td>
                              <td className=" px-3">:</td>
                              <td className="font-semibold text-green-700">
                                <span className="mr-1">$</span>
                                {parseInt(product.price) -
                                  (parseInt(product.price) *
                                    parseInt(product.discount)) /
                                    100}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          type="btn"
                          onClick={handleSubmit}
                          className="rounded-full w-fit outline-none btn-sm my-5  !border-none bg-slate-800 btn hover:bg-slate-700 text-white"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Animation>
    )
  );
}
