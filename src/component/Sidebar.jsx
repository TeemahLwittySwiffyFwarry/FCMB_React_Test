import React from "react";
import { FaHome, FaUsers, FaStar, FaBriefcase, FaSignOutAlt } from "react-icons/fa";
import { CiHome } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { PiGraduationCapLight } from "react-icons/pi";
import { CiStar } from "react-icons/ci";
import { FaChartLine } from "react-icons/fa";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 py-8 pl-8 flex flex-col shadow-lg min-h-screen">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-12">
        <img
          src="fcmb_logo.png"
          alt="Logo"
          className="w-10 h-10"
        />
        <span className="font-bold text-gray-800 text-lg">Career Portal</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col space-y-8 text-gray-700">
        <div className="flex items-center gap-4 pl-2 hover:text-purple-700 cursor-pointer transition-all duration-200">
          <CiHome /> <span>Home</span>
        </div>

        <div className="flex items-center gap-4 text-purple-700 font-semibold border-r-4 bg-purple-100 py-2 border-purple-600 pl-2">
          <FiUser /> <span>Users</span>
        </div>

        <div className="flex items-center gap-4 hover:text-purple-700 cursor-pointer transition-all duration-200 pl-2">
          <PiGraduationCapLight /> <span>Career Interest</span>
        </div>

        <div className="flex items-center gap-4 hover:text-purple-700 cursor-pointer transition-all duration-200 pl-2">
          <CiStar /> <span>My Assessments</span>
        </div>

        <div className="flex items-center gap-4 hover:text-purple-700 cursor-pointer transition-all duration-200 pl-2">
          <FaBriefcase /> <span>Jobs & Vacancies</span>
        </div>

        <div className="flex items-center gap-4 hover:text-purple-700 cursor-pointer transition-all duration-200 pl-2">
          <FaChartLine /> <span>Appraisal</span>
        </div>
      </nav>

      {/* Sign Out */}
      <div className="mt-auto flex items-center gap-4 text-red-500 cursor-pointer pt-10 border-t border-gray-200 hover:text-red-600 transition-all duration-200">
        <FaSignOutAlt /> <span>Sign out</span>
      </div>
    </aside>
  );
};

export default Sidebar;
