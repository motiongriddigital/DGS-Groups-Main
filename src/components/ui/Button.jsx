import React from "react";

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-hover rounded-md font-bold text-xs tracking-widest uppercase group flex items-center justify-center gap-3",
  secondary:
    "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 rounded-md font-bold text-xs tracking-widest uppercase group flex items-center justify-center gap-3",
  ghost:
    "bg-transparent text-primary hover:text-primary-hover font-bold text-xs tracking-widest uppercase group flex items-center justify-center gap-3",
  outline:
    "border border-neutral-300 bg-transparent text-neutral-700 hover:bg-neutral-100 rounded-full disabled:opacity-40 disabled:pointer-events-none font-bold text-xs tracking-widest uppercase group flex items-center justify-center gap-2",
  icon:
    "bg-transparent text-neutral-700 hover:text-neutral-900 rounded-lg p-2 transition-colors flex items-center justify-center",
  page: "w-10 h-10 min-w-10 min-h-10 p-0 rounded-full flex items-center justify-center text-sm font-semibold bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-all shrink-0",
  pageActive:
    "w-10 h-10 min-w-10 min-h-10 p-0 rounded-full flex items-center justify-center text-sm font-bold bg-primary text-white shadow-md shadow-primary/30 border border-primary transition-all shrink-0",
  link: "bg-transparent text-primary hover:text-primary-hover underline underline-offset-4 p-0 font-semibold text-xs tracking-normal uppercase",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-xs",
  lg: "px-8 py-4 text-sm",
  full: "w-full px-6 py-3 text-xs",
  none: "p-0",
};

const Button = ({
  children,
  variant = "primary",
  size,
  active = false,
  className = "",
  type = "button",
  ...props
}) => {
  const isPageVariant = variant === "page";
  let computedVariant = variant;
  if (isPageVariant && active) {
    computedVariant = "pageActive";
  }

  const sizeClasses = size
    ? sizes[size] || ""
    : !isPageVariant && variant !== "link" && variant !== "icon"
    ? "px-6 py-3"
    : "";
  const widthClasses =
    size === "full"
      ? "w-full"
      : "w-fit";

  const baseStyles = isPageVariant
    ? "cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
    : `group flex items-center gap-3 font-bold text-xs tracking-widest uppercase transition-all ${widthClasses} cursor-pointer disabled:cursor-not-allowed`;

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[computedVariant] || variants.primary} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
