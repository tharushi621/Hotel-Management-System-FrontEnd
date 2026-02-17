import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash, FaUserShield, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminUser() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch users
  const fetchUsers = async (page = currentPage, limit = pageSize) => {
    setLoading(true);
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/all",
        { page, limit },
        { headers: { Authorization: "Bearer " + token } }
      );
      setUsers(res.data.users || []);
      setTotalUsers(res.data.totalUsers || 0);
    } catch (err) {
      toast.error("Failed to load users");
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, pageSize]);

  // Delete user by ID
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/api/users/admin-delete/" + id,
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("User deleted successfully");
      fetchUsers(); // refresh
    } catch (err) {
      toast.error("Error deleting user");
      console.error("Delete user error:", err);
    }
  };

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">👥</span>
            User Management
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">Manage system users</p>
        </div>

        {/* Stats Card */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Users</p>
              <p className="text-3xl font-bold text-indigo-600">{totalUsers}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-full">
              <FaUsers className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 gap-6 pb-6">
          {loading ? (
            <p className="text-center text-indigo-600 font-semibold">Loading users...</p>
          ) : users.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-indigo-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Users Found</h3>
              <p className="text-gray-500">There are currently no registered users.</p>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-indigo-100 hover:border-indigo-300 p-6"
              >
                <div className="flex items-center justify-between">

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </span>

                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
                      <p className="text-gray-500">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <FaUserShield className="text-indigo-500" />
                        <span className="text-sm font-medium text-indigo-600">{user.type}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    title="Delete User"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-white rounded shadow">{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
