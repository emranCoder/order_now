import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";

import { GiCookie } from "react-icons/gi";
import { LuSoup, LuSalad, LuSandwich } from "react-icons/lu";
import { FaHotjar, FaPlateWheat } from "react-icons/fa6";

export default function OrderMenuBox() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  // selected={selectedIndex === 0}
  // onClick={(event) => handleListItemClick(event, 0)}

  return (
    <div className="container  bg-red-50 rounded-box ">
      <ul className="menu text-lg menu-horizontal w-full container justify-center flex">
        <Swiper
          freeMode
          grabCursor={true}
          modules={[FreeMode]}
          slidesPerView={5}
          spaceBetween={5}
        >
          <SwiperSlide>
            <li
              className={
                selectedIndex === 0 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <a>
                <GiCookie />
                <span>Appetizers/Snacks</span>
              </a>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li
              className={
                selectedIndex === 1 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <a>
                <LuSoup />
                <span>Soups</span>
              </a>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li
              className={
                selectedIndex === 2 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <a>
                <LuSalad />
                <span>Salads</span>
              </a>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li
              className={
                selectedIndex === 3 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <a>
                <LuSandwich />
                <span>Sandwiches</span>
              </a>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li
              className={
                selectedIndex === 4 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <a>
                <FaHotjar />
                <span>Hot Entrees</span>
              </a>
            </li>
          </SwiperSlide>
          <SwiperSlide>
            <li
              className={
                selectedIndex === 5 ? "bg-red-600 rounded-lg text-white" : ""
              }
              onClick={(event) => handleListItemClick(event, 5)}
            >
              <a>
                <FaPlateWheat />
                <span>Biryani</span>
              </a>
            </li>
          </SwiperSlide>
        </Swiper>
      </ul>
    </div>
  );
}
