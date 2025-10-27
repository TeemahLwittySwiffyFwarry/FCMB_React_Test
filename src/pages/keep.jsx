import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaMobileAlt,
} from "react-icons/fa";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { BsQrCode } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");

    try {
      const response = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "reqres-free-v1",
        },
        body: JSON.stringify({ name, job }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Success! User ${data.name} created with ID: ${data.id}`);

        // Reset form
        setName("");
        setJob("");

        // ⏩ Redirect after short delay
        setTimeout(() => {
          navigate("/list");
        }, 1500);
      } else {
        setMessage("❌ Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Background Image */}
      <div
        className="w-1/2 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('/public/bg.png')",
        }}
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
            <div className="flex justify-between items-center bg-[rgba(34,40,35,1)] bg-opacity-60 rounded-[20px] w-[290px] h-[45px] p-1 shadow-inner">
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
              className="w-full py-3 bg-gradient-to-r from-purple-800 through-purple-700 to-pink-800 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300"
            >
              Proceed →
            </button>
          </form>

          {/* API message */}
          {message && (
            <p className="text-center text-sm mt-3 text-purple-700 font-medium">
              {message}
            </p>
          )}

          {/* Bottom Nav Toggle */}
          <div className="flex justify-center mt-8 space-x-10 border-t pt-5">
            {/* Transfers */}
            <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
              <CiLocationArrow1 className="text-2xl mb-1" />
              <span className="text-xs font-medium">Transfers</span>
            </button>

            {/* Airtime Top-up */}
            <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
              <FaMobileAlt className="text-2xl mb-1" />
              <span className="text-xs font-medium">Airtime Top-up</span>
            </button>

            {/* QR Scanner */}
            <div className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition relative">
              <div className="absolute -top-6 left-8">
                <span className="bg-yellow-200 text-[10px] text-black px-2 py-[1px] rounded-full font-semibold shadow-sm">
                  NEW
                </span>
              </div>
              <BsQrCode className="text-2xl mb-1" />
              <span className="text-xs font-medium">QR Scanner</span>
            </div>

            {/* Location */}
            <button className="flex flex-col items-center text-purple-800 hover:text-purple-600 transition">
              <CiLocationOn className="text-2xl mb-1" />
              <span className="text-xs font-medium">Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
