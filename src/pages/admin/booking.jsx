import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// ─── FIXES APPLIED ───────────────────────────────────────────────────────────
// 1. Edit button navigated to "/admin/update-booking" which is not registered
//    in App.jsx Routes. Changed to "/admin/bookings/update" — make sure your
//    AdminPage router (admin.jsx) registers this sub-route.
//    If you prefer the flat path, add the route to App.jsx directly.
//
// 2. Fetch uses GET /api/bookings — correct. ✅
// 3. Delete uses DELETE /api/bookings/:bookingId — correct. ✅
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminBooking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [bookings, setBookings]       = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize]                    = useState(5);
  const [isLoaded, setIsLoaded]       = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch all bookings
  useEffect(() => {
    if (!isLoaded && token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBookings(res.data.result || []);
          setIsLoaded(true);
        })
        .catch(() => toast.error("Failed to load bookings"));
    }
  }, [isLoaded, token]);

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking deleted successfully");
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch (err) {
      console.error(err);
      toast.error("Error deleting booking");
    }
  };

  // Pagination
  const indexOfLast     = currentPage * pageSize;
  const indexOfFirst    = indexOfLast - pageSize;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages      = Math.max(1, Math.ceil(bookings.length / pageSize));

  // Status badge colour
  const statusClass = (status) => {
    if (status === "Confirmed") return "text-green-600";
    if (status === "Cancelled") return "text-red-600";
    return "text-yellow-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg">📅</span>
            Booking Management
          </h1>
          <p className="text-indigo-100 mt-2 text-lg">Manage all room bookings</p>
        </div>

        {/* Stats */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
              <p className="text-3xl font-bold text-indigo-600">{bookings.length}</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-full">
              <FaCalendarAlt className="text-indigo-600 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Booking Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Room ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Start – End</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Notes</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentBookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    {isLoaded ? "No bookings found." : "Loading bookings…"}
                  </td>
                </tr>
              ) : (
                currentBookings.map((b, index) => (
                  <tr key={b.bookingId} className="hover:bg-indigo-50 transition-colors">
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {indexOfFirst + index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono font-semibold text-indigo-700">
                      #{b.bookingId}
                    </td>
                    <td className="px-4 py-4 text-sm font-mono text-gray-700">
                      {b.roomId}
                    </td>
                    <td className="px-4 py-4 text-sm">
                      <span className="flex items-center gap-2 text-gray-700">
                        <FaEnvelope className="text-indigo-400 flex-shrink-0" />
                        {b.email}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700 whitespace-nowrap">
                      <div>{new Date(b.start).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
                      <div className="text-gray-400 text-xs">→ {new Date(b.end).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
                    </td>
                    <td className={`px-4 py-4 text-sm font-semibold ${statusClass(b.status)}`}>
                      {b.status || "Pending"}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[140px] truncate">
                      {b.reason || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 max-w-[180px]">
                      <span className="block truncate" title={b.notes || ""}>
                        {b.notes || <span className="text-gray-300">—</span>}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {/* FIX #1: route changed — ensure admin.jsx registers "bookings/update" sub-route */}
                        <button
                          onClick={() => navigate("/admin/bookings/update", { state: b })}
                          className="bg-indigo-100 hover:bg-indigo-200 p-2 rounded-lg text-indigo-700 transition-colors"
                          title="Edit booking"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(b.bookingId)}
                          className="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-700 transition-colors"
                          title="Delete booking"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
            className={`p-2 rounded-full transition-colors ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <FaChevronLeft />
          </button>

          <span className="text-gray-700 font-semibold">
            {currentPage} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`p-2 rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/admin/add-booking")}
          className="fixed bottom-8 right-8 bg-indigo-600 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 hover:bg-indigo-700 transition-all"
          title="Add new booking"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}