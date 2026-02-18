import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaUpload, FaTimes, FaSave } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

export default function UpdateRoomForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Room passed from AdminRoom via navigate("/admin/update-room", { state: room })
  const existingRoom = location.state;

  useEffect(() => {
    if (!token) navigate("/login");
    if (!existingRoom) {
      toast.error("No room data found. Please go back and try again.");
      navigate("/admin/rooms");
    }
  }, []);

  const [category, setCategory] = useState(existingRoom?.category || "");
  const [maxGuests, setMaxGuests] = useState(existingRoom?.maxGuests || 3);
  const [available, setAvailable] = useState(existingRoom?.available ?? true);
  const [photos, setPhotos] = useState(existingRoom?.photos || []);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [specialDescription, setSpecialDescription] = useState(existingRoom?.specialDescription || "");
  const [notes, setNotes] = useState(existingRoom?.notes || "");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ FIX: /api/categories (plural) + res.data.list to match backend
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => setCategories(res.data.list || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    const url = await uploadMedia(file, `rooms/${existingRoom?.roomId || "temp"}`);
    if (url) { setPhotos((prev) => [...prev, url]); toast.success("Photo uploaded!"); }
    else toast.error("Photo upload failed");
    setPhotoUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) { toast.error("Category is required"); return; }
    setIsLoading(true);
    try {
      // PATCH /api/rooms/:roomId — matches backend updateRoom route
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms/${existingRoom.roomId}`,
        { category, maxGuests: Number(maxGuests), available, photos, specialDescription, notes },
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Room updated successfully");
      navigate("/admin/rooms");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update room");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-100 placeholder-emerald-600 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 focus:bg-emerald-950/80 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2";

  if (!existingRoom) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-800 via-emerald-800 to-green-800 rounded-t-2xl shadow-2xl p-8 border border-emerald-700/40">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #6ee7b7 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #6ee7b7 40px)" }} />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="bg-teal-600/40 p-3 rounded-xl text-2xl">✏️</span>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Update Room</h2>
                <p className="text-emerald-300 text-sm mt-0.5">
                  Editing Room <span className="text-emerald-200 font-bold">#{existingRoom.roomId}</span>
                </p>
              </div>
            </div>
            {/* Room ID — read only */}
            <div className="bg-emerald-900/60 border border-emerald-700/40 rounded-xl px-4 py-2 text-right">
              <p className="text-emerald-500 text-xs uppercase tracking-widest">Room ID</p>
              <p className="text-emerald-200 font-black text-xl">#{existingRoom.roomId}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-emerald-950/80 border border-emerald-800/50 border-t-0 rounded-b-2xl shadow-2xl p-8 space-y-6">

          {/* Category + Max Guests */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category <span className="text-red-400">*</span></label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required>
                <option value="" className="bg-emerald-950">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name} className="bg-emerald-950">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Max Guests</label>
              <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}
                min={1} className={inputClass} />
            </div>
          </div>

          {/* Availability toggle */}
          <div>
            <label className={labelClass}>Availability</label>
            <button type="button" onClick={() => setAvailable(!available)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all
                ${available
                  ? "bg-emerald-700/30 border-emerald-500/50 text-emerald-300 hover:bg-emerald-700/40"
                  : "bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30"}`}>
              {available
                ? "✅ Available — Click to mark Unavailable"
                : "❌ Unavailable — Click to mark Available"}
            </button>
          </div>

          {/* Photos */}
          <div>
            <label className={labelClass}>Photos ({photos.length} uploaded)</label>

            {/* Existing photos */}
            {photos.length > 0 && (
              <div className="flex gap-3 mb-4 flex-wrap">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-emerald-700/40 group">
                    <img src={p} alt={`Room photo ${idx + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button type="button"
                        onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                        className="bg-red-500/90 hover:bg-red-500 text-white p-2 rounded-full transition-colors">
                        <FaTimes className="text-xs" />
                      </button>
                    </div>
                    <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-md">
                      {idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Upload more */}
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-emerald-700/60 hover:border-emerald-500 rounded-xl p-5 text-center cursor-pointer bg-emerald-950/40 hover:bg-emerald-900/30 transition-all">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <div className="bg-emerald-800/40 p-3 rounded-full mb-2">
                <FaUpload className="text-emerald-400 text-lg" />
              </div>
              <p className="text-emerald-300 font-semibold text-sm">
                {photoUploading ? "Uploading..." : "Add more photos"}
              </p>
              <p className="text-emerald-600 text-xs mt-0.5">PNG, JPG or WEBP</p>
            </label>
          </div>

          {/* Special Description */}
          <div>
            <label className={labelClass}>Special Description</label>
            <textarea value={specialDescription} onChange={(e) => setSpecialDescription(e.target.value)}
              rows={3} placeholder="Describe what makes this room special..."
              className={`${inputClass} resize-none`} />
          </div>

          {/* Notes */}
          <div>
            <label className={labelClass}>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              rows={3} placeholder="Internal notes about this room..."
              className={`${inputClass} resize-none`} />
          </div>

          {/* Summary */}
          <div className="rounded-xl p-4 bg-emerald-900/20 border border-emerald-800/40">
            <p className="text-xs text-emerald-500 uppercase tracking-widest mb-2 font-semibold">Current Values</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-emerald-400">
              <span>Room ID: <span className="text-emerald-200 font-bold">#{existingRoom.roomId}</span> (locked)</span>
              <span>Category: <span className="text-emerald-200">{category || "—"}</span></span>
              <span>Max Guests: <span className="text-emerald-200">{maxGuests}</span></span>
              <span>Status: <span className={available ? "text-emerald-300" : "text-red-400"}>{available ? "Available" : "Unavailable"}</span></span>
              <span>Photos: <span className="text-emerald-200">{photos.length}</span></span>
            </div>
          </div>

          <div className="h-px bg-emerald-800/50" />

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate("/admin/rooms")}
              className="flex-1 py-3 rounded-xl border border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/40 transition-all font-semibold text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isLoading || photoUploading}
              className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-900/50">
              <FaSave />
              {isLoading || photoUploading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}