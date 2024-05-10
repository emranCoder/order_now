import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { GiCookie } from "react-icons/gi";
import { LuSoup, LuSalad, LuSandwich } from "react-icons/lu";
import { FaHotjar, FaPlateWheat } from "react-icons/fa6";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setCategory } from "../redux/ProductFetch";

export default function OrderMenuBox() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [category, setCategories] = useState(0);
  const dispatch = useDispatch();
  const [icon, setIcon] = useState([
    <GiCookie />,
    <LuSoup />,
    <LuSalad />,
    <LuSandwich />,
    <FaHotjar />,
    <FaPlateWheat />,
  ]);

  useEffect(() => {
    getCategory();
  }, [0]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/category/all`,
        {
          headers: {
            token: Cookies.get("auth"),
          },
        }
      );
      if (response && response.status === 200) {
        setCategories(response.data.category);
        dispatch(setCategory(response.data.category[0].name));
      }
    } catch (error) {
      if (error.message === "Network Error")
        return console.error(error.message);
    }
  };

  return (
    <div className="container  bg-slate-50 rounded-box ">
      <ul className="menu text-lg menu-horizontal w-full container justify-center flex">
        <Swiper
          freeMode
          grabCursor={true}
          modules={[FreeMode]}
          slidesPerView={5}
          spaceBetween={5}
        >
          {category &&
            category.map((val, key) => (
              <SwiperSlide key={key}>
                <li
                  className={
                    selectedIndex === key
                      ? "bg-slate-600 rounded-lg text-white"
                      : ""
                  }
                  onClick={(event) => {
                    handleListItemClick(event, key);
                    dispatch(setCategory(val.name));
                  }}
                >
                  <a>
                    {icon[key]}
                    <span>{val.name}</span>
                  </a>
                </li>
              </SwiperSlide>
            ))}
        </Swiper>
      </ul>
    </div>
  );
}
