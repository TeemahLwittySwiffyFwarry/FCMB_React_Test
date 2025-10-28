import React from "react";
import { FaSpinner } from "react-icons/fa6";

const Loader = ({ text = "Loading...", size = "2xl", color = "text-purple-700" }) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <FaSpinner className={`animate-spin ${color} ${sizeClasses[size]}`} />
      <p className={`mt-3 font-semibold ${color}`}>{text}</p>
    </div>
  );
};

export default Loader;
