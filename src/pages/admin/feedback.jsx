import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaTrash,
  FaStar,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminFeedback() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [isLoaded, setIsLoaded] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch feedbacks
  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedbacks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFeedbacks(res.data.result || []);
          setIsLoaded(true);
        })
        .catch(() => toast.error("Failed to load feedbacks"));
    }
  }, [isLoaded, token]);

  // Delete feedback
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this feedback?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Feedback deleted successfully");
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      toast.error("Error deleting feedback");
    }
  };

  // Toggle feedback visibility
  const toggleStatus = async (id, currentStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/${id}/status`,
        { status: currentStatus === "Visible" ? "Hidden" : "Visible" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Feedback status updated");
      setIsLoaded(false);
    } catch {
      toast.error("Failed to update status");
    }
  };

  // Pagination
  const indexOfLast = currentPage * pageSize;
  const indexOfFirst = indexOfLast - pageSize;
  const currentFeedbacks = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(feedbacks.length / pageSize);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg">⭐</span>
            Feedback Management
          </h1>
          <p className="text-amber-100 mt-2 text-lg">
            Manage customer feedback & reviews
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Feedbacks</p>
              <p className="text-3xl font-bold text-amber-600">
                {feedbacks.length}
              </p>
            </div>
            <div className="bg-amber-100 p-4 rounded-full">
              <FaStar className="text-amber-600 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Feedback Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-amber-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Booking ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Room ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Rating</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Comment</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {currentFeedbacks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No Feedback Found
                  </td>
                </tr>
              ) : (
                currentFeedbacks.map((f, index) => (
                  <tr key={f._id} className="hover:bg-amber-50">
                    <td className="px-6 py-4">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="px-6 py-4">{f.bookingId}</td>
                    <td className="px-6 py-4">{f.roomId}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FaEnvelope /> {f.email}
                    </td>
                    <td className="px-6 py-4 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < f.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </td>
                    <td className="px-6 py-4 max-w-sm truncate">
                      {f.comment}
                    </td>
                    <td
                      className={`px-6 py-4 font-semibold ${
                        f.status === "Visible"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {f.status}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(f._id, f.status)}
                        className="bg-amber-100 p-2 rounded-lg text-amber-700"
                      >
                        {f.status === "Visible" ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="bg-red-100 p-2 rounded-lg text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`p-2 rounded-full ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-600 text-white"
            }`}
          >
            <FaChevronLeft />
          </button>

          <span className="font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`p-2 rounded-full ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-amber-600 text-white"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
