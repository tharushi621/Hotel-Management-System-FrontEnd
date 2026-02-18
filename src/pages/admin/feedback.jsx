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
  FaCommentAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminFeedback() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!isLoaded && token && token !== "null") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/feedbacks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setFeedbacks(res.data.result || []);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("Session expired or access denied.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            toast.error("Failed to load feedbacks.");
          }
        });
    }
  }, [isLoaded, token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback? This cannot be undone.")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Feedback deleted.");
      // FIX: update local state directly, no need to refetch
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
    } catch {
      toast.error("Error deleting feedback.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Visible" ? "Hidden" : "Visible";
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Feedback marked as ${newStatus}.`);
      // FIX: update local state directly instead of setIsLoaded(false) which triggers full refetch
      setFeedbacks((prev) =>
        prev.map((f) => (f._id === id ? { ...f, status: newStatus } : f))
      );
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // Pagination
  const indexOfFirst    = (currentPage - 1) * pageSize;
  const indexOfLast     = indexOfFirst + pageSize;
  const currentFeedbacks = feedbacks.slice(indexOfFirst, indexOfLast);
  const totalPages      = Math.max(1, Math.ceil(feedbacks.length / pageSize));

  const StarRow = ({ rating }) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={i < rating ? "text-amber-400" : "text-slate-200"}
          style={{ fontSize: 11 }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header — matches AdminUser / AdminBooking pattern */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center shadow-sm">
            <FaCommentAlt className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Feedback Management</h1>
            <p className="text-xs text-slate-400">Customer reviews & visibility control</p>
          </div>
        </div>

        {/* Stats pill */}
        <div className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2 ml-auto">
          <span className="text-xs text-teal-600 font-medium">Total</span>
          <span className="text-xl font-black text-teal-700 leading-none">{feedbacks.length}</span>
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
                  <th className="px-4 py-3 text-left font-semibold">Rating</th>
                  <th className="px-4 py-3 text-left font-semibold">Comment</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoaded ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16">
                      <div className="w-7 h-7 border-2 border-teal-400 border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-slate-400 text-xs mt-2">Loading feedbacks…</p>
                    </td>
                  </tr>
                ) : currentFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-16 text-slate-400">
                      <FaCommentAlt className="text-3xl mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No feedbacks found</p>
                    </td>
                  </tr>
                ) : (
                  currentFeedbacks.map((f, index) => (
                    <tr
                      key={f._id}
                      className={`border-b border-slate-100 transition-colors hover:bg-slate-50/70
                        ${f.status === "Hidden" ? "opacity-60" : ""}`}
                    >
                      {/* # */}
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {String(indexOfFirst + index + 1).padStart(3, "0")}
                      </td>

                      {/* Booking ID */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-semibold text-teal-700 text-xs bg-teal-50 border border-teal-100 px-2 py-1 rounded-lg">
                          #{f.bookingId}
                        </span>
                      </td>

                      {/* Room */}
                      <td className="px-4 py-3 text-slate-700 font-mono text-xs font-medium">
                        {f.roomId}
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-slate-500 max-w-[180px]">
                        <span className="flex items-center gap-1.5 text-xs">
                          <FaEnvelope className="text-slate-400 shrink-0" style={{ fontSize: 10 }} />
                          <span className="truncate">{f.email}</span>
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <StarRow rating={f.rating} />
                          <span className="text-xs text-slate-400">{f.rating}/5</span>
                        </div>
                      </td>

                      {/* Comment */}
                      <td className="px-4 py-3 text-slate-500 max-w-[220px]">
                        <span className="block truncate text-xs" title={f.comment}>
                          {f.comment || <span className="text-slate-300">—</span>}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3 text-center">
                        {f.status === "Visible" ? (
                          <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                            Visible
                          </span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            Hidden
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => toggleStatus(f._id, f.status)}
                            title={f.status === "Visible" ? "Hide feedback" : "Show feedback"}
                            className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all text-xs
                              ${f.status === "Visible"
                                ? "bg-amber-50 text-amber-500 hover:bg-amber-100 border border-amber-100"
                                : "bg-teal-50 text-teal-500 hover:bg-teal-100 border border-teal-100"}`}
                          >
                            {f.status === "Visible" ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <button
                            onClick={() => handleDelete(f._id)}
                            title="Delete feedback"
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
            Showing {indexOfFirst + 1}–{Math.min(indexOfLast, feedbacks.length)} of {feedbacks.length}
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