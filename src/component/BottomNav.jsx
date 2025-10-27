import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { BsQrCode } from "react-icons/bs";

export default function BottomNav() {
  return (
    <div className="flex justify-center mt-8 space-x-10 pt-5 border-t md:border-none">
      <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
        <CiLocationArrow1 className="text-2xl mb-1" />
        <span className="text-xs font-medium">Transfers</span>
      </button>

      <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
        <FaMobileAlt className="text-2xl mb-1" />
        <span className="text-xs font-medium">Airtime Top-up</span>
      </button>

      <div className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition relative">
        <div className="absolute -top-6 left-8">
          <span className="bg-yellow-200 text-[10px] text-black px-2 py-[1px] rounded-full font-semibold shadow-sm">
            NEW
          </span>
        </div>
        <BsQrCode className="text-2xl mb-1" />
        <span className="text-xs font-medium">QR Scanner</span>
      </div>

      <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
        <CiLocationOn className="text-2xl mb-1" />
        <span className="text-xs font-medium">Location</span>
      </button>
    </div>
  );
}
