import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SearchIcon from "@mui/icons-material/Search";
import Animation from "../spinner/Animation";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
export default function Customer() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [success, setSuccess] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [err, setErr] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCustomer();
  }, [success]);

  const getCustomer = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/auth/getuser`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setCustomer(response.data.user);
      }
    } catch (error) {
      if (error.response.data.err) {
        setErr(error.response.data.err);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <div className="rounded-xl border shadow-lg p-10 max-sm:px-0 px-5 max-sm:py-5 mb-20">
        <div className="container overflow-hidden">
          <div className="customer-box">
            <div className="head flex justify-between content-center">
              <h3 className="text-2xl font-semibold text-slate-600">
                All Users
              </h3>
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
                {customer &&
                  customer
                    .slice(page, rowsPerPage)
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item._id.toLowerCase().includes(search) ||
                            item.fName.toLowerCase().includes(search) ||
                            item.lName.toLowerCase().includes(search) ||
                            item.email.toLowerCase().includes(search) ||
                            item.mobile.toLowerCase().includes(search);
                    })
                    .map((val, key) => (
                      <tr key={key}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img
                                  src={`http://localhost:5000/avatar/${val.avatar}`}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <Link to="/view" state={val._id}>
                                <div className="font-bold">
                                  {val.fName + " " + val.lName}
                                </div>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-sm opacity-80"> {val.email}</p>
                        </td>
                        <td>
                          <p>{val.mobile}</p>
                        </td>
                        <td>{val.addr}</td>
                        <td className="flex gap-3">
                          <Link to="/view" state={val._id}>
                            <button className="btn btn-sm btn-success text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
                              <Mui.ListItemButton className="!flex !justify-center !items-center">
                                <VisibilityIcon sx={{ fontSize: 18 }} />
                              </Mui.ListItemButton>
                            </button>
                          </Link>
                          <button className="btn btn-sm btn-error text-white btn-circle flex just-center overflow-  content-center !items-center overflow-hidden">
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
