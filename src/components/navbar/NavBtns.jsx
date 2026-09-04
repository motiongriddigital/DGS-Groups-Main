"use client";
import React from "react";

const Navbtns = ({ text, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`px-3 lg:px-3.5 xl:px-5 py-1.5 lg:py-2 rounded-lg lg:rounded-xl text-xs lg:text-xs xl:text-sm font-medium tracking-wide uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
        isActive
          ? "bg-primary/15 text-primary shadow-xs font-semibold"
          : "text-neutral-700 hover:text-black hover:bg-black/5"
      }`}
    >
      {text}
    </button>
  );
};

export default Navbtns;
