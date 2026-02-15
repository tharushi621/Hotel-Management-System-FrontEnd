import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaUpload, FaTimes, FaImage } from "react-icons/fa";

export default function AddRoomForm() {
  const [roomId, setRoomId] = useState("");
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(3);
  const [available, setAvailable] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photosUploading, setPhotosUploading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (photos.length === 0) {
        toast.error("Please select at least one photo");
        setIsLoading(false);
        return;
      }

      // Upload all photos
      setPhotosUploading(true);
      const uploadedPhotos = [];
      for (let i = 0; i < photos.length; i++) {
        const folderName = `rooms/${roomId}`;
        const url = await uploadMedia(photos[i], folderName);
        if (!url) {
          toast.error("Photo upload failed");
          setPhotosUploading(false);
          setIsLoading(false);
          return;
        }
        uploadedPhotos.push(url);
      }
      setPhotosUploading(false);

      const formData = {
        roomId,
        category,
        maxGuests,
        available,
        photos: uploadedPhotos,
        specialDescription,
        notes,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/rooms`,
        formData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Room added successfully");

      // Reset form
      setRoomId("");
      setCategory("");
      setMaxGuests(3);
      setAvailable(true);
      setPhotos([]);
      setSpecialDescription("");
      setNotes("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setPhotosUploading(false);
    }
  };

  const handlePhotosChange = (e) => {
    setPhotos([...e.target.files]);
  };

  const removePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-t-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">➕</span>
            Add New Room
          </h2>
          <p className="text-emerald-100 mt-2">
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
              placeholder="e.g., 101"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none transition-all"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Deluxe"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none transition-all"
              required
            />
          </div>

          {/* Max Guests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Guests
            </label>
            <input
              type="number"
              min={1}
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none transition-all"
            />
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={available}
              onChange={() => setAvailable(!available)}
              id="available"
              className="w-5 h-5 accent-emerald-600"
            />
            <label htmlFor="available" className="text-gray-700 font-medium">
              Available
            </label>
          </div>

          {/* Special Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Description
            </label>
            <textarea
              placeholder="Highlight unique aspects of this room"
              value={specialDescription}
              onChange={(e) => setSpecialDescription(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none resize-none transition-all"
              rows={3}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              placeholder="Any internal notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none resize-none transition-all"
              rows={2}
            />
          </div>

          {/* Photos Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Room Photos <span className="text-red-500 ml-1">*</span>
            </label>

            {!photos.length ? (
              <label className="block w-full border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-lg p-8 text-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50 transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-100 p-4 rounded-full mb-3 group-hover:bg-emerald-200 transition-colors">
                    <FaUpload className="text-emerald-600 text-2xl" />
                  </div>
                  <p className="text-emerald-700 font-semibold mb-1">
                    Click to upload photos
                  </p>
                  <p className="text-gray-500 text-sm">
                    PNG, JPG, or WEBP (Max 5MB each)
                  </p>
                </div>
              </label>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Photo ${i + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-emerald-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-lg transition-all"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || photosUploading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
          >
            {isLoading || photosUploading ? (
              <>
                <div className="border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
                <span>{photosUploading ? "Uploading Photos..." : "Creating Room..."}</span>
              </>
            ) : (
              <>
                <FaUpload />
                <span>Add Room</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
