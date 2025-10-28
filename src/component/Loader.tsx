import React from "react";
import { FaSpinner } from "react-icons/fa6";

interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({
  text = "Loading...",
  size = "2xl",
  color = "text-purple-700",
}) => {
  const sizeClasses: Record<NonNullable<LoaderProps["size"]>, string> = {
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
