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

  if (!existingRoom) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
        .lv-up-page { font-family: 'Jost', sans-serif; background: #f5f0e8; min-height: 100vh; }
        .lv-up-display { font-family: 'Playfair Display', serif; }
        .lv-up-input {
          width: 100%; box-sizing: border-box;
          background: #fff;
          border: 1px solid #d4c9b0;
          color: #2d3b2e;
          border-radius: 8px;
          padding: 10px 14px;
          outline: none;
          font-family: 'Jost', sans-serif;
          font-size: 0.875rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lv-up-input:focus {
          border-color: #c9a84c;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
        }
        .lv-up-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #5a7a5c;
          margin-bottom: 6px;
        }
        .lv-up-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c55, transparent);
          margin: 22px 0;
        }
        .lv-up-cancel-btn:hover { background: #f5f0e8 !important; }
        .lv-up-submit-btn:hover { opacity: 0.88; }
        .lv-up-upload-zone:hover {
          border-color: #c9a84c !important;
          background: #fdf9f1 !important;
        }
        .lv-up-photo-wrap:hover .lv-up-photo-overlay { opacity: 1 !important; }
      `}</style>

      <div className="lv-up-page">
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 16px 60px" }}>

          {/* Page header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ height: 1, width: 28, background: "linear-gradient(90deg,#c9a84c,#d4891a)" }}></div>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#9a7c3c", fontFamily: "'Jost',sans-serif" }}>Admin · Room Management</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <h1 className="lv-up-display" style={{ fontSize: "1.9rem", color: "#1a3a1e", fontWeight: 500, margin: 0 }}>Update Room</h1>
              <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "0.85rem", color: "#9a7c3c", fontWeight: 500 }}>#{existingRoom.roomId}</span>
            </div>
            <p style={{ color: "#7a8c7a", fontSize: "0.83rem", marginTop: 5, fontFamily: "'Jost',sans-serif" }}>Edit the details for this retreat space.</p>
          </div>

          {/* Card */}
          <div style={{ background: "#fff", border: "1px solid #e2d9c8", borderRadius: 14, boxShadow: "0 2px 20px rgba(26,58,30,0.07)", overflow: "hidden" }}>

            {/* Card top strip */}
            <div style={{ background: "linear-gradient(135deg,#1a3a1e 0%,#2e5c35 100%)", padding: "18px 26px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.2rem" }}>✏️</span>
                <div>
                  <div className="lv-up-display" style={{ color: "#f5f0e8", fontSize: "1rem", fontWeight: 500 }}>Edit Room Details</div>
                  <div style={{ color: "rgba(201,168,76,0.7)", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif" }}>Leonine Villa & Sanctuary</div>
                </div>
              </div>
              {/* Room ID badge */}
              <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 8, padding: "6px 14px", textAlign: "right" }}>
                <div style={{ color: "rgba(201,168,76,0.6)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Jost',sans-serif" }}>Room ID</div>
                <div className="lv-up-display" style={{ color: "#f5f0e8", fontSize: "1.1rem", fontWeight: 700 }}>#{existingRoom.roomId}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "26px 28px" }}>

              {/* Category + Max Guests */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
                <div>
                  <label className="lv-up-label">Category <span style={{ color: "#c0392b" }}>*</span></label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="lv-up-input" required>
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="lv-up-label">Max Guests</label>
                  <input type="number" value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)}
                    min={1} className="lv-up-input" />
                </div>
              </div>

              {/* Availability */}
              <div style={{ marginBottom: 16 }}>
                <label className="lv-up-label">Availability</label>
                <button type="button" onClick={() => setAvailable(!available)} style={{
                  width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid",
                  fontFamily: "'Jost',sans-serif", fontSize: "0.83rem", fontWeight: 500, cursor: "pointer",
                  transition: "all 0.2s",
                  background: available ? "#edf7ee" : "#fff5f5",
                  borderColor: available ? "#7cad7a" : "#f5c6c6",
                  color: available ? "#2e5c35" : "#b91c1c",
                }}>
                  {available ? "✓  Available — Click to mark Unavailable" : "✗  Unavailable — Click to mark Available"}
                </button>
              </div>

              <div className="lv-up-divider"></div>

              {/* Photos */}
              <div style={{ marginBottom: 16 }}>
                <label className="lv-up-label">Room Photos ({photos.length} uploaded)</label>

                {photos.length > 0 && (
                  <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
                    {photos.map((p, idx) => (
                      <div key={idx} className="lv-up-photo-wrap" style={{ position: "relative", width: 84, height: 84, borderRadius: 8, overflow: "hidden", border: "1px solid #d4c9b0" }}>
                        <img src={p} alt={`Photo ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div className="lv-up-photo-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)", opacity: 0, transition: "opacity 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <button type="button" onClick={() => setPhotos((prev) => prev.filter((_, i) => i !== idx))}
                            style={{ background: "rgba(180,30,30,0.9)", border: "none", borderRadius: "50%", padding: "5px 7px", cursor: "pointer", color: "#fff", lineHeight: 1 }}>
                            <FaTimes style={{ fontSize: "0.6rem" }} />
                          </button>
                        </div>
                        <span style={{ position: "absolute", bottom: 3, left: 4, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "0.6rem", padding: "1px 5px", borderRadius: 4 }}>{idx + 1}</span>
                      </div>
                    ))}
                  </div>
                )}

                <label className="lv-up-upload-zone" style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  border: "2px dashed #d4c9b0", borderRadius: 10, padding: "18px", cursor: "pointer",
                  background: "#fafaf7", transition: "all 0.2s",
                }}>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
                  <div style={{ background: "#f0ebe0", borderRadius: "50%", padding: 9, marginBottom: 7 }}>
                    <FaUpload style={{ color: "#9a7c3c", fontSize: "0.9rem" }} />
                  </div>
                  <p style={{ color: "#5a7a5c", fontWeight: 500, fontSize: "0.8rem", margin: 0 }}>
                    {photoUploading ? "Uploading…" : "Add more photos"}
                  </p>
                  <p style={{ color: "#b0a890", fontSize: "0.68rem", marginTop: 2 }}>PNG, JPG or WEBP</p>
                </label>
              </div>

              {/* Special Description */}
              <div style={{ marginBottom: 16 }}>
                <label className="lv-up-label">Special Description</label>
                <textarea value={specialDescription} onChange={(e) => setSpecialDescription(e.target.value)}
                  rows={3} placeholder="Describe what makes this retreat special…"
                  className="lv-up-input" style={{ resize: "none" }} />
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 16 }}>
                <label className="lv-up-label">Internal Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                  rows={2} placeholder="Notes for admin reference only…"
                  className="lv-up-input" style={{ resize: "none" }} />
              </div>

              {/* Summary strip */}
              <div style={{ background: "#f7f4ee", border: "1px solid #e8e0d0", borderRadius: 8, padding: "12px 16px", marginBottom: 8 }}>
                <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9a7c3c", marginBottom: 8, fontWeight: 600 }}>Current Values</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", fontFamily: "'Jost',sans-serif", fontSize: "0.78rem", color: "#7a8c7a" }}>
                  <span>Room ID: <strong style={{ color: "#2d3b2e" }}>#{existingRoom.roomId}</strong> (locked)</span>
                  <span>Category: <strong style={{ color: "#2d3b2e" }}>{category || "—"}</strong></span>
                  <span>Max Guests: <strong style={{ color: "#2d3b2e" }}>{maxGuests}</strong></span>
                  <span>Status: <strong style={{ color: available ? "#2e5c35" : "#b91c1c" }}>{available ? "Available" : "Unavailable"}</strong></span>
                  <span>Photos: <strong style={{ color: "#2d3b2e" }}>{photos.length}</strong></span>
                </div>
              </div>

              <div className="lv-up-divider"></div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" onClick={() => navigate("/admin/rooms")}
                  className="lv-up-cancel-btn"
                  style={{
                    flex: 1, padding: "11px", borderRadius: 8,
                    border: "1px solid #d4c9b0", background: "#fff",
                    color: "#5a7a5c", fontFamily: "'Jost',sans-serif",
                    fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: "pointer", fontWeight: 500, transition: "all 0.2s"
                  }}>
                  Cancel
                </button>
                <button type="submit" disabled={isLoading || photoUploading}
                  className="lv-up-submit-btn"
                  style={{
                    flex: 2, padding: "11px", borderRadius: 8,
                    background: isLoading || photoUploading ? "#a8c8a0" : "linear-gradient(135deg,#1a3a1e 0%,#2e5c35 100%)",
                    border: "none", color: "#f5f0e8",
                    fontFamily: "'Jost',sans-serif", fontSize: "0.72rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    cursor: isLoading || photoUploading ? "not-allowed" : "pointer",
                    fontWeight: 600, display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 8, transition: "opacity 0.2s",
                    boxShadow: "0 3px 14px rgba(26,58,30,0.22)"
                  }}>
                  <FaSave style={{ fontSize: "0.8rem" }} />
                  {isLoading || photoUploading ? "Saving…" : "Save Changes"}
                </button>
              </div>

            </form>
          </div>

          <p style={{ textAlign: "center", color: "#c0b090", fontSize: "0.65rem", marginTop: 18, letterSpacing: "0.12em", fontFamily: "'Jost',sans-serif" }}>
            LEONINE VILLA & SANCTUARY · Admin Panel
          </p>
        </div>
      </div>
    </>
  );
}