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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminBooking() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [bookings, setBookings]       = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize]                    = useState(10);
  const [isLoaded, setIsLoaded]       = useState(false);

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  // FIX: GET /api/bookings — route now exists in bookingRouter
  useEffect(() => {
    if (!isLoaded && token && token !== "null") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setBookings(res.data.result || []);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("Session expired or access denied.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            toast.error("Failed to load bookings.");
          }
        });
    }
  }, [isLoaded, token]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Booking deleted.");
      setBookings((prev) => prev.filter((b) => b.bookingId !== bookingId));
    } catch {
      toast.error("Error deleting booking.");
    }
  };

  // Pagination
  const indexOfFirst    = (currentPage - 1) * pageSize;
  const indexOfLast     = indexOfFirst + pageSize;
  const currentBookings = bookings.slice(indexOfFirst, indexOfLast);
  const totalPages      = Math.max(1, Math.ceil(bookings.length / pageSize));

  const statusBadge = (status) => {
    if (status === "Confirmed") return "text-teal-700 bg-teal-50 border border-teal-100";
    if (status === "Cancelled") return "text-red-500 bg-red-50 border border-red-100";
    return "text-amber-600 bg-amber-50 border border-amber-100";
  };

  const fmt = (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm">
            <FaCalendarAlt className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Booking Management</h1>
            <p className="text-xs text-slate-400">View and manage all room reservations</p>
          </div>
        </div>

        {/* Total pill */}
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2 ml-auto">
          <span className="text-xs text-teal-600 font-medium">Total</span>
          <span className="text-xl font-black text-teal-700 leading-none">{bookings.length}</span>
        </div>
      </div>

      {/* Table area */}
      <div className="flex-1 overflow-auto px-4 py-3">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-semibold w-10">#</th>
                  <th className="px-4 py-3 text-left font-semibold">Booking ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Room</th>
                  <th className="px-4 py-3 text-left font-semibold">Email</th>
                  <th className="px-4 py-3 text-left font-semibold">Check-in</th>
                  <th className="px-4 py-3 text-left font-semibold">Check-out</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                  <th className="px-4 py-3 text-left font-semibold">Notes</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoaded ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16">
                      <div className="w-7 h-7 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-slate-400 text-xs mt-2">Loading bookings…</p>
                    </td>
                  </tr>
                ) : currentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-slate-400">
                      <FaCalendarAlt className="text-3xl mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No bookings found</p>
                    </td>
                  </tr>
                ) : (
                  currentBookings.map((b, index) => (
                    <tr
                      key={b.bookingId}
                      className="border-b border-slate-100 hover:bg-slate-50/70 transition-colors"
                    >
                      {/* # */}
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {String(indexOfFirst + index + 1).padStart(3, "0")}
                      </td>

                      {/* Booking ID */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-teal-700 text-xs bg-teal-50 border border-teal-100 px-2 py-1 rounded-lg">
                          #{b.bookingId}
                        </span>
                      </td>

                      {/* Room */}
                      <td className="px-4 py-3 text-slate-700 font-mono text-xs font-medium">
                        {b.roomId}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-slate-500 max-w-[180px]">
                        <span className="flex items-center gap-1.5 text-xs">
                          <FaEnvelope className="text-slate-400 shrink-0" style={{ fontSize: 10 }} />
                          <span className="truncate">{b.email}</span>
                        </span>
                      </td>

                      {/* Check-in */}
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                        {fmt(b.start)}
                      </td>

                      {/* Check-out */}
                      <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">
                        {fmt(b.end)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusBadge(b.status)}`}>
                          {b.status || "Pending"}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3 text-slate-500 max-w-[160px]">
                        <span className="block truncate text-xs" title={b.notes || ""}>
                          {b.notes || <span className="text-slate-300">—</span>}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          {/* FIX: navigate passes booking state; route is registered in admin.jsx */}
                          <button
                            onClick={() => navigate("/admin/bookings/update", { state: b })}
                            title="Edit booking"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-sky-50 text-sky-500 hover:bg-sky-100 border border-sky-100 transition-all text-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(b.bookingId)}
                            title="Delete booking"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-50 text-red-400 hover:bg-red-100 border border-red-100 transition-all text-xs"
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
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing {indexOfFirst + 1}–{Math.min(indexOfLast, bookings.length)} of {bookings.length}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-500 rounded-lg disabled:opacity-30 hover:bg-slate-100 transition-all"
            >
              <FaChevronLeft className="text-xs" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg font-semibold transition-all text-xs
                  ${pg === currentPage
                    ? "bg-teal-500 text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-200"}`}
              >
                {pg}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="w-8 h-8 flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-500 rounded-lg disabled:opacity-30 hover:bg-slate-100 transition-all"
            >
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}