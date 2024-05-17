import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { IoAlert } from "react-icons/io5";
import DropANimation from "../spinner/DropANimation";

export default function Toast(props) {
  const [start, setStart] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 500);
  }, [0]);
  return (
    props.msg && (
      <div className="col-lg-12 col-md-12 col-sm-12 absolute h-full    left-0 ">
        <div className="w-full flex justify-center sticky top-0 z-20">
          {start && (
            <DropANimation>
              <div
                className={`transition duration-300 max-w-xs bg-white border  rounded-xl shadow-lg ${
                  props.msg.type === "del" ? "border-error" : "border-success"
                }`}
                role="alert"
              >
                <div className="flex p-4">
                  <div className="flex-shrink-0 ">
                    {props.msg.type === "del" ? (
                      <IoAlert
                        className={`flex-shrink-0 size-4 rounded-full  ${
                          props.msg.type === "del" ? "bg-error" : "bg-success"
                        } text-white mt-0.5  `}
                      />
                    ) : (
                      <TiTick
                        className={`flex-shrink-0 size-4 rounded-full  ${
                          props.msg.type === "del" ? "bg-error" : "bg-success"
                        } text-white mt-0.5  `}
                      />
                    )}
                  </div>
                  <div className="ms-3">
                    <p className="text-sm text-gray-700 dark:text-gray-400">
                      {props.msg.msg}
                    </p>
                  </div>
                  <div className="ms-auto">
                    <button
                      className="btn btn-sm h-auto min-h-[auto] hover:text-slate-900 text-slate-600 text-xl font-bold !border-none !bg-transparent pr-0 pl-5"
                      onClick={() => {
                        props.control();
                        setStart(false);
                      }}
                    >
                      <IoCloseOutline />
                    </button>
                  </div>
                </div>
              </div>
            </DropANimation>
          )}
        </div>
      </div>
    )
  );
}
