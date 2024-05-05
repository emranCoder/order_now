import React from "react";

export default function Loading() {
  return (
    <div className="absolute z-50 flex items-center justify-center  w-full left-0  h-dvh !bg-gray-100">
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
}
