import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import {FaUpload, FaTimes } from "react-icons/fa";
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

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/category`)
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  // Handle photo upload
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoUploading(true);
    const folderName = `rooms/${roomId || "temp"}`;
    const url = await uploadMedia(file, folderName);
    if (url) {
      setPhotos((prev) => [...prev, url]);
      toast.success("Photo uploaded!");
    } else {
      toast.error("Photo upload failed");
    }
    setPhotoUploading(false);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!roomId || !category) {
      toast.error("Room ID and Category are required");
      setIsLoading(false);
      return;
    }

    const roomData = {
      roomId: Number(roomId),
      category,
      maxGuests: Number(maxGuests),
      available,
      photos,
      specialDescription,
      notes,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/room`,
        roomData,
        { headers: { Authorization: "Bearer " + token } }
      );
      toast.success("Room created successfully");
      // Reset form
      setRoomId("");
      setCategory("");
      setMaxGuests(3);
      setAvailable(true);
      setPhotos([]);
      setSpecialDescription("");
      setNotes("");
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to create room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              ➕
            </span>
            Add New Room
          </h2>
          <p className="text-indigo-100 mt-2">
            Fill in the details to create a new room
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-xl p-8 space-y-6"
        >
          {/* Room ID */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Room ID <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="e.g., 101"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Guests
            </label>
            <input
              type="number"
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              min={1}
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none"
            />
          </div>

          {/* Available */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="w-5 h-5"
            />
            <label className="text-gray-700 font-medium">Available</label>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Photos
            </label>
            <label className="block w-full border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-lg p-6 text-center cursor-pointer bg-indigo-50/30 hover:bg-indigo-50 transition-all">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="flex flex-col items-center">
                <div className="bg-indigo-100 p-4 rounded-full mb-3">
                  <FaUpload className="text-indigo-600 text-2xl" />
                </div>
                <p className="text-indigo-700 font-semibold">Click to upload photo</p>
                <p className="text-gray-500 text-sm">PNG, JPG or WEBP (Max 5MB)</p>
              </div>
            </label>

            {/* Photo Previews */}
            {photos.length > 0 && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-indigo-200">
                    <img src={p} alt={`Room ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                      title="Remove photo"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Special Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Description
            </label>
            <textarea
              value={specialDescription}
              onChange={(e) => setSpecialDescription(e.target.value)}
              rows="3"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none resize-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 p-3 rounded-lg outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || photoUploading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-lg font-semibold shadow-lg flex justify-center items-center gap-2 transition-all duration-300"
          >
            {isLoading || photoUploading ? "Saving..." : "Add Room"}
          </button>
        </form>
      </div>
    </div>
  );
}
