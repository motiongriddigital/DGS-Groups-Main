import React from "react";
import Image from "next/image";

const Logo = ({ variant = "lg", className = "" }) => {
  const isLarge = variant === "lg";
  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      <div
        className={`relative ${
          isLarge ? "w-10 h-10 md:w-12 md:h-12" : "w-8 h-8"
        }`}
      >
        <Image
          src="/Logo.svg"
          alt="DGS Group Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-cinzel font-bold text-neutral-900 text-lg md:text-xl tracking-wider leading-none">
          DGS GROUP
        </span>
        <span className="text-[9px] md:text-[10px] font-semibold text-primary tracking-[0.25em] uppercase">
          Build & Retail
        </span>
      </div>
    </div>
  );
};

export default Logo;
