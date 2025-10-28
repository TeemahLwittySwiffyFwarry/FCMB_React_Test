import React, { useState, useMemo, useCallback } from "react";
import Sidebar from "../component/Sidebar";
import Loader from "../component/Loader";
import { FaBars } from "react-icons/fa";
import { usePaginatedUsers, User } from "../hooks/usePaginatedUsers";

const sanitize = (value: string): string => {
  const temp = document.createElement("div");
  temp.textContent = value;
  return temp.innerHTML;
};

const PaginatedList: React.FC = () => {
  const { users, totalPages, loading, error, page, setPage } = usePaginatedUsers();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [exception, setException] = useState<string | null>(null);

  const handlePageChange = useCallback(
    (newPage: number): void => {
      try {
        if (newPage < 1 || newPage > totalPages) {
          throw new Error("Invalid page number");
        }
        setPage(newPage);
      } catch (err) {
        console.error("Pagination error:", err);
        setException("Something went wrong while changing pages.");
      }
    },
    [totalPages, setPage]
  );

  const userDetails = useMemo(() => {
    if (!selectedUser) return null;
    try {
      return (
        <div className="flex flex-col items-center">
          <img
            src={selectedUser.avatar}
            alt={sanitize(selectedUser.first_name)}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl mb-4 border border-gray-200 shadow-sm mt-8"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/fallback-avatar.png";
            }}
          />
          <div className="w-full max-w-xs space-y-3 text-left leading-relaxed">
            <p className="text-sm text-gray-700">
              <strong>Email:</strong> {sanitize(selectedUser.email)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>First Name:</strong> {sanitize(selectedUser.first_name)}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Last Name:</strong> {sanitize(selectedUser.last_name)}
            </p>

            <button
              className="bg-gradient-to-r from-purple-800 via-purple-700 to-pink-700 hover:opacity-90 text-white font-semibold py-2 rounded w-full transition-all duration-300"
              onClick={() => alert(`Proceeding with ${selectedUser.first_name}`)}
            >
              Proceed
            </button>
          </div>
        </div>
      );
    } catch (err) {
      console.error("Error rendering user details:", err);
      setException("Error displaying user details.");
      return null;
    }
  }, [selectedUser]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row font-sans relative">
      {/* 🔄 Full-screen loader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">
          <Loader text="Loading users..." size="2xl" color="text-purple-700" />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 bg-white z-20 w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 shadow-lg`}
      >
        <Sidebar />
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-white md:ml-0">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-700 text-2xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
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
        </header>

        {/* Exception display */}
        {exception && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 border border-red-300">
            {exception}
          </div>
        )}

        {/* User Grid Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User list */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4 space-y-3 overflow-y-auto min-h-[400px]">
            {error ? (
              <p className="text-red-600 text-center">{sanitize(error)}</p>
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
                      alt={sanitize(user.first_name)}
                      className="w-16 h-16 rounded-3xl border border-gray-200 shadow-sm"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback-avatar.png";
                      }}
                    />
                    <div className="border-l-2 border-purple-200 pl-4 space-y-2 leading-relaxed">
                      <p className="text-sm text-gray-700">
                        <strong>Email:</strong> {sanitize(user.email)}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>First Name:</strong> {sanitize(user.first_name)}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Last Name:</strong> {sanitize(user.last_name)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              !loading && <p className="text-gray-500 text-center">No users found.</p>
            )}
          </div>

          {/* User details */}
          {selectedUser && (
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col min-h-[400px] justify-center">
              {userDetails}
            </div>
          )}
        </section>

        {/* Pagination */}
        <footer className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 gap-3 text-sm sm:text-base">
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
        </footer>
      </main>
    </div>
  );
};

export default PaginatedList;
