import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBed,
  FaImage,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminRoom() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [rooms, setRooms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [filterCat, setFilterCat] = useState("all");

  useEffect(() => {
    if (!token || token === "null") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    if (!isLoaded && token && token !== "null") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const roomData = res.data.rooms || [];
          setRooms(roomData);
          const uniqueCategories = [...new Set(roomData.map((r) => r.category))];
          setCategories(uniqueCategories);
          setIsLoaded(true);
        })
        .catch((err) => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            toast.error("Session expired or access denied.");
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            toast.error("Failed to load rooms.");
          }
        });
    }
  }, [isLoaded, token]);

  const handleDelete = async (roomId) => {
    if (!window.confirm("Delete this room? This cannot be undone.")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${roomId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Room deleted.");
      setRooms((prev) => prev.filter((r) => r.roomId !== parseInt(roomId)));
    } catch {
      toast.error("Error deleting room.");
    }
  };

  // Filter by category
  const filteredRooms = filterCat === "all"
    ? rooms
    : rooms.filter((r) => r.category === filterCat);

  // Pagination
  const indexOfFirst     = (currentPage - 1) * pageSize;
  const indexOfLast      = indexOfFirst + pageSize;
  const currentRooms     = filteredRooms.slice(indexOfFirst, indexOfLast);
  const totalPages       = Math.max(1, Math.ceil(filteredRooms.length / pageSize));

  // Reset to page 1 when filter changes
  const handleFilterChange = (cat) => {
    setFilterCat(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1e2d16] flex items-center justify-center shadow-sm">
            <FaBed className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-800 leading-tight">Room Management</h1>
            <p className="text-xs text-slate-400">Manage all rooms under categories</p>
          </div>
        </div>

        {/* Stats pill */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2 ml-auto">
          <span className="text-xs text-[#1e2d16] font-medium">Total</span>
          <span className="text-xl font-black text-[#1e2d16] leading-none">{rooms.length}</span>
        </div>
      </div>

      {/* Category filter tabs */}
      {categories.length > 0 && (
        <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-2 flex-wrap">
          <button
            onClick={() => handleFilterChange("all")}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all
              ${filterCat === "all"
                ? "bg-[#1e2d16] text-white shadow-sm"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
          >
            All Rooms
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all capitalize
                ${filterCat === cat
                  ? "bg-[#1e2d16] text-white shadow-sm"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Table area */}
      <div className="flex-1 overflow-auto px-4 py-3">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-semibold w-10">#</th>
                  <th className="px-4 py-3 text-left font-semibold">Photo</th>
                  <th className="px-4 py-3 text-left font-semibold">Room ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Category</th>
                  <th className="px-4 py-3 text-center font-semibold">Max Guests</th>
                  <th className="px-4 py-3 text-center font-semibold">Available</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                  <th className="px-4 py-3 text-left font-semibold">Notes</th>
                  <th className="px-4 py-3 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoaded ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16">
                      <div className="w-7 h-7 border-2 border-[#1e2d16] border-t-transparent rounded-full animate-spin mx-auto" />
                      <p className="text-slate-400 text-xs mt-2">Loading rooms…</p>
                    </td>
                  </tr>
                ) : currentRooms.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-16 text-slate-400">
                      <FaBed className="text-3xl mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No rooms found</p>
                      <button
                        onClick={() => navigate("/admin/add-room")}
                        className="mt-4 bg-[#1e2d16] text-white px-5 py-2 rounded-lg text-xs font-semibold hover:bg-[#1e2d16] transition-colors"
                      >
                        Add First Room
                      </button>
                    </td>
                  </tr>
                ) : (
                  currentRooms.map((room, index) => (
                    <tr
                      key={room.roomId}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/70"
                    >
                      {/* # */}
                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        {String(indexOfFirst + index + 1).padStart(3, "0")}
                      </td>

                      {/* Photo */}
                      <td className="px-4 py-3">
                        {room.photos?.length > 0 ? (
                          <img
                            src={room.photos[0]}
                            alt={`Room ${room.roomId}`}
                            className="w-14 h-14 object-cover rounded-xl border border-slate-200"
                          />
                        ) : (
                          <div className="w-14 h-14 flex items-center justify-center bg-slate-100 rounded-xl border border-slate-200">
                            <FaImage className="text-slate-400 text-lg" />
                          </div>
                        )}
                      </td>

                      {/* Room ID */}
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-[#1e2d16] text-sm bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                          #{room.roomId}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 capitalize border border-slate-200">
                          {room.category}
                        </span>
                      </td>

                      {/* Max Guests */}
                      <td className="px-4 py-3 text-center">
                        <span className="flex items-center justify-center gap-1.5 text-slate-600 text-xs">
                          <FaUsers className="text-slate-400" style={{ fontSize: 10 }} />
                          {room.maxGuests}
                        </span>
                      </td>

                      {/* Available */}
                      <td className="px-4 py-3 text-center">
                        {room.available ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1e2d16] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                            <FaCheckCircle style={{ fontSize: 9 }} /> Available
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                            <FaTimesCircle style={{ fontSize: 9 }} /> Unavailable
                          </span>
                        )}
                      </td>

                      {/* Description */}
                      <td className="px-4 py-3 max-w-[180px]">
                        <span className="block truncate text-xs text-slate-500" title={room.specialDescription}>
                          {room.specialDescription || <span className="text-slate-300">—</span>}
                        </span>
                      </td>

                      {/* Notes */}
                      <td className="px-4 py-3 max-w-[150px]">
                        <span className="block truncate text-xs text-slate-500" title={room.notes}>
                          {room.notes || <span className="text-slate-300">—</span>}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => navigate("/admin/update-room", { state: room })}
                            title="Edit room"
                            className="w-7 h-7 flex items-center justify-center rounded-lg bg-teal-50 text-[#1e2d16] hover:bg-teal-100 border border-[#1e2d16] transition-all text-xs"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(room.roomId)}
                            title="Delete room"
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
            Showing {indexOfFirst + 1}–{Math.min(indexOfLast, filteredRooms.length)} of {filteredRooms.length}
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
                    ? "bg-[#1e2d16] text-white shadow-sm"
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

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/admin/add-room")}
        className="fixed bottom-8 right-8 bg-[#1e2d16] hover:bg-[#1e2d16] text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all"
        title="Add new room"
      >
        <FaPlus className="text-lg" />
      </button>
    </div>
  );
}