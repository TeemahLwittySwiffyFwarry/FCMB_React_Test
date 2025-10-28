import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import BottomNav from "../component/BottomNav";
import { useRegisterUser } from "../hooks/useRegister";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const navigate = useNavigate();
  const { registerUser, message } = useRegisterUser(navigate);

  // ✅ Redirect if already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) navigate("/list");
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(name, job);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Background Image */}
      <div
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/public/bg.png')" }}
      ></div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 lg:px-28 py-6">
        <div className="w-full max-w-md rounded-2xl p-8 space-y-8 relative">
          {/* FCMB Logo */}
          <div className="flex justify-center mb-20">
            <img
              src="/fcmb_logo.png"
              alt="FCMB Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* Personal / Business Toggle */}
          <div className="flex justify-center mt-2">
            <div className="flex justify-between items-center bg-gray-500 bg-opacity-60 rounded-[20px] w-[290px] h-[45px] p-1 shadow-inner">
              <button className="flex-1 py-2 px-3 rounded-full bg-white text-purple-800 font-semibold text-sm shadow-md transition-all duration-300">
                Personal
              </button>
              <button className="flex-1 mx-1 py-1 rounded-full text-white/80 hover:text-white font-semibold text-sm transition-all duration-300">
                Business
              </button>
            </div>
          </div>

          {/* Input fields */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Full Name */}
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
                <FiUser className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Job Field */}
            <div>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
                <FaBriefcase className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Job"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  required
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Proceed Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-800 via-purple-700 to-pink-800 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
            >
              Proceed
            </button>
          </form>

          {/* API message */}
          {message && (
            <p className="text-center text-sm mt-3 text-purple-700 font-medium">
              {message}
            </p>
          )}

          {/* Bottom Nav */}
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
