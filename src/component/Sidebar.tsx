import React from "react";
import {
  FaBriefcase,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";
import { CiHome, CiStar } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { PiGraduationCapLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  // 🔹 Handle Logout using SweetAlert2
  const handleLogout = async (): Promise<void> => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33", // red
      cancelButtonColor: "#3085d6", // blue
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      // Remove user data
      localStorage.removeItem("user");

      // ✅ SweetAlert Success Message
      await Swal.fire({
        title: "Signed Out",
        text: "You have been signed out successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a", // green
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    }
  };

  return (
    <aside className="w-64 bg-gray-100 py-8 pl-8 flex flex-col shadow-lg min-h-screen">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-12">
        <img
          src="fcmb_logo.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="font-bold text-gray-800 text-lg">
          Career Portal
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-8 text-gray-700">
        <div className="flex items-center gap-4 pl-2 cursor-default">
          <CiHome /> <span>Home</span>
        </div>

        <div className="flex items-center gap-4 text-purple-700 font-semibold border-r-4 bg-purple-100 py-2 border-purple-600 pl-2 cursor-default">
          <FiUser /> <span>Users</span>
        </div>

        <div className="flex items-center gap-4 pl-2 cursor-default">
          <PiGraduationCapLight /> <span>Career Interest</span>
        </div>

        <div className="flex items-center gap-4 pl-2 cursor-default">
          <CiStar /> <span>My Assessments</span>
        </div>

        <div className="flex items-center gap-4 pl-2 cursor-default">
          <FaBriefcase /> <span>Jobs & Vacancies</span>
        </div>

        <div className="flex items-center gap-4 pl-2 cursor-default">
          <FaChartLine /> <span>Appraisal</span>
        </div>
      </nav>

      {/* 🔹 Sign Out */}
      <div
        onClick={handleLogout}
        className="mt-auto flex items-center gap-4 text-red-500 cursor-pointer pt-10 border-t border-gray-200 hover:text-red-600 transition-all duration-200"
      >
        <FaSignOutAlt /> <span>Sign out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
