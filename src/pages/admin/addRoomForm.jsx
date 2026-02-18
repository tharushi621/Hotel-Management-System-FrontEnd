import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaUpload, FaTimes, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddRoomForm() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) navigate("/login");

  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(3);
  const [available, setAvailable] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // ✅ FIX 1: was /api/category (singular + wrong) → /api/categories
    // ✅ FIX 2: was res.data.categories → res.data.list (backend returns { list: result })
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => setCategories(res.data.list || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    const url = await uploadMedia(file, `rooms/${roomId || "temp"}`);
    if (url) { setPhotos((prev) => [...prev, url]); toast.success("Photo uploaded!"); }
    else toast.error("Photo upload failed");
    setPhotoUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roomId || !category) { toast.error("Room ID and Category are required"); return; }
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
        { roomId: Number(roomId), category, maxGuests: Number(maxGuests), available, photos, specialDescription, notes },
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Room created successfully");
      setRoomId(""); setCategory(""); setMaxGuests(3); setAvailable(true);
      setPhotos([]); setSpecialDescription(""); setNotes("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-100 placeholder-emerald-600 rounded-xl px-4 py-3 outline-none focus:border-emerald-400 focus:bg-emerald-950/80 transition-all text-sm";
  const labelClass = "block text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2";

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-green-800 to-teal-800 rounded-t-2xl shadow-2xl p-8 border border-emerald-700/40">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, #6ee7b7 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, #6ee7b7 40px)" }} />
          <div className="relative flex items-center gap-4">
            <span className="bg-emerald-600/40 p-3 rounded-xl text-2xl">🛏️</span>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Add New Room</h2>
              <p className="text-emerald-300 text-sm mt-0.5">Fill in the details to create a new room</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-emerald-950/80 border border-emerald-800/50 border-t-0 rounded-b-2xl shadow-2xl p-8 space-y-6">

          {/* Room ID + Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Room ID <span className="text-red-400">*</span></label>
              <input type="number" value={roomId} onChange={(e) => setRoomId(e.target.value)}
                placeholder="e.g. 101" className={inputClass} required />
            </div>
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
          </div>

          {/* Max Guests + Available */}
          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className={labelClass}>Max Guests</label>
              <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}
                min={1} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Availability</label>
              <button type="button" onClick={() => setAvailable(!available)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all
                  ${available
                    ? "bg-emerald-700/30 border-emerald-500/50 text-emerald-300 hover:bg-emerald-700/40"
                    : "bg-red-900/20 border-red-500/30 text-red-400 hover:bg-red-900/30"}`}>
                {available ? "✅ Available" : "❌ Unavailable"}
              </button>
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className={labelClass}>Photos</label>
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-emerald-700/60 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer bg-emerald-950/40 hover:bg-emerald-900/30 transition-all">
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              <div className="bg-emerald-800/40 p-4 rounded-full mb-3">
                <FaUpload className="text-emerald-400 text-xl" />
              </div>
              <p className="text-emerald-300 font-semibold text-sm">
                {photoUploading ? "Uploading..." : "Click to upload photo"}
              </p>
              <p className="text-emerald-600 text-xs mt-1">PNG, JPG or WEBP</p>
            </label>
            {photos.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-emerald-700/40">
                    <img src={p} alt={`Room ${idx}`} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                      className="absolute top-1 right-1 bg-red-500/80 hover:bg-red-500 text-white p-1 rounded-full transition-colors">
                      <FaTimes className="text-xs" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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

          <div className="h-px bg-emerald-800/50" />

          {/* Actions */}
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate("/admin/rooms")}
              className="flex-1 py-3 rounded-xl border border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/40 transition-all font-semibold text-sm">
              Cancel
            </button>
            <button type="submit" disabled={isLoading || photoUploading}
              className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/50">
              <FaPlusCircle />
              {isLoading || photoUploading ? "Saving..." : "Add Room"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}