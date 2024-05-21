import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";

export default function News() {
  const [loader, setLoader] = useState(true);
  const [news, setNews] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoader(false);
      getNews();
    }, 500);
  }, [0]);

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

  const items = (val, key) => (
    <div
      key={key}
      className="card rounded-none card-side bg-base-100 border-b pb-2 mb-8 max-sm:card"
    >
      <div className="avatar ">
        <div className="w-56 max-sm:w-auto max-sm:p-8">
          <img
            src={`http://localhost:5000/news/img/${
              val.image ? val.image : "default-product.png"
            }`}
          />
        </div>
      </div>
      <div className="card-body py-0 gap-y-5 ">
        <span className="text-slate-500 font-serif font-semibold">
          {new Date(val.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          ,{" "}
          {new Date(val.createdAt).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <h2 className="card-title text-slate-800 text-3xl font-serif">
          <a href="#" className="hover:underline">
            {val.title}
          </a>
        </h2>
        <p className="text-slate-600">{val.description}</p>
        {/* <div className="card-actions flex-auto">
          <button className="btn mt-0 h-auto min-h-[auto] text-lg !border-none hover:text-slate-800 !bg-transparent text-red-800 uppercase tracking-wide m-0 p-0 font-sans">
            Continue Reading
          </button>
        </div> */}
      </div>
    </div>
  );
  return (
    <section className="order-section p-5 ">
      {loader && <Loading />}
      <div className="container  rounded-xl px-10 py-10 max-sm:p-5 max-md:px-5 bg-white">
        <div className="container-row">
          <div className="col-lg-8 col-sm-12 col-md-12">
            <h5 className="mb-8 text-red-800 font-semibold uppercase font-serif">
              The Latest & Greatest
            </h5>
            {news &&
              news
                .filter((val) => {
                  return search
                    ? new Date(val.createdAt).getDate() === search
                    : val;
                })
                .map((val, key) =>
                  val ? (
                    items(val, key)
                  ) : (
                    <p className="grid justify-center content-center h-full text-slate-600 text-lg">
                      No Data Found
                    </p>
                  )
                )}
            {!news && (
              <p className="grid justify-center content-center h-full text-slate-600 text-lg">
                No Data Found
              </p>
            )}
          </div>
          <div className="col-lg-4 max-sm:hidden">
            <h5 className="mb-8 text-red-800 font-semibold uppercase font-serif">
              News Collections
            </h5>
            <ul className="">
              <li
                onClick={() => {
                  if (news) {
                    setSearch("");
                  }
                }}
                className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700"
              >
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  1
                </span>
                <a>Most Viewed</a>{" "}
                <span className="float-right mr-5"> {news && news.length}</span>
              </li>
              <li
                onClick={() => {
                  if (news) {
                    setSearch("");
                  }
                }}
                className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700"
              >
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  2
                </span>
                <a>Previous</a>{" "}
                <span className="float-right mr-5">{news && news.length}</span>
              </li>
              <li
                onClick={() => {
                  if (news) {
                    setSearch(new Date().getDate());
                  }
                }}
                className="bg-base-200 mb-1 p-2 font-serif hover:text-red-800 hover:bg-base-300  px-5 cursor-pointer text-slate-700"
              >
                <span className="mr-5 rounded-full !bg-red-800 text-white btn-circle btn btn-xs border-none">
                  3
                </span>
                <a>Today</a>{" "}
                <span className="float-right mr-5">
                  {news &&
                    news.filter((val) => {
                      return (
                        new Date(val.createdAt).getDate() ===
                        new Date().getDate()
                      );
                    }).length}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
