import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import Sidebar from "../component/Sidebar";
import Loader from "../component/Loader"; // ✅ import reusable loader
import { FaBars } from "react-icons/fa";

const PaginatedList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${page}`, {
        headers: { "x-api-key": "reqres-free-v1" },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const userDetails = useMemo(() => {
    if (!selectedUser) return null;
    return (
      <>
        <img
          src={selectedUser.avatar}
          alt={selectedUser.first_name}
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl mb-4 border border-gray-200 shadow-sm mt-8"
        />
        <div className="w-full max-w-xs space-y-3 text-left leading-relaxed">
          <p className="text-sm text-gray-700">
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p className="text-sm text-gray-700">
            <strong>First Name:</strong> {selectedUser.first_name}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Last Name:</strong> {selectedUser.last_name}
          </p>

          <button className="bg-gradient-to-r from-purple-800 through-purple-700 to-pink-700 hover:opacity-90 text-white font-semibold py-2 rounded w-full transition-all duration-300">
            Proceed
          </button>
        </div>
      </>
    );
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 bg-white z-20 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 shadow-lg`}
      >
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white md:ml-0">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-700 text-2xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FaBars />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-700">Users</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Profile"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border mr-2"
              />
              <span className="text-xs sm:text-sm font-medium">
                Kelvin Olanrewaju
              </span>
            </div>
          </div>
        </div>

        {/* User grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: User list */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 space-y-3 overflow-y-auto min-h-[400px]">
            {loading ? (
              <Loader text="Loading users..." size="xl" color="text-purple-700" />
            ) : users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                    selectedUser?.id === user.id
                      ? "bg-purple-50 border-purple-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar}
                      alt={user.first_name}
                      className="w-16 h-16 rounded-3xl border border-gray-200 shadow-sm"
                    />
                    <div className="border-l-2 border-purple-200 pl-4 space-y-2 leading-relaxed">
                      <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>First Name:</strong> {user.first_name}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Last Name:</strong> {user.last_name}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No users found.</p>
            )}
          </div>

          {/* Right: User preview */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col min-h-[400px] justify-center">
            {userDetails || (
              <p className="text-gray-500 text-center">
                Select a user to view details
              </p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 gap-3 text-sm sm:text-base">
          <button
            disabled={page === 1 || loading}
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50 w-full sm:w-auto"
          >
            Previous
          </button>
          <span className="text-gray-700 font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages || loading}
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-purple-700 text-white rounded disabled:opacity-50 w-full sm:w-auto"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default PaginatedList;
