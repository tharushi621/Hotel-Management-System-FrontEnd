import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateGalleryForm() {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if no state is passed
  if (!location.state) {
    navigate("/admin/gallery");
  }

  // Pre-fill form with existing gallery item data
  const [name, setName] = useState(location.state?.name || "");
  const [description, setDescription] = useState(location.state?.description || "");
  const [image, setImage] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";

  // Remove selected new image
  const removeImage = () => setImage(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // If a new image is selected, upload it
      let imageUrl = location.state.image; // default to existing image
      if (image) {
        setImageUploading(true);
        const folderName = `gallery/${name}`;
        imageUrl = await uploadMedia(image, folderName);
        setImageUploading(false);

        if (!imageUrl) {
          toast.error("Image upload failed");
          setIsLoading(false);
          return;
        }
      }

      const formData = {
        name,
        description,
        image: imageUrl,
      };

      // Use PUT request to update gallery item
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${location.state._id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Gallery item updated successfully");

      navigate("/admin/gallery"); // redirect back to gallery list
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setImageUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-t-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">✏️</span>
            Update Gallery Item
          </h2>
          <p className="text-emerald-100 mt-2">
            Update the details of your gallery item
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Item Name <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., River Sunset"
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this gallery item..."
              rows="4"
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg outline-none transition-all resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gallery Image
            </label>
            {!image ? (
              <label className="block w-full border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-lg p-8 text-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50 transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-100 p-4 rounded-full mb-3 group-hover:bg-emerald-200 transition-colors">
                    <FaUpload className="text-emerald-600 text-2xl" />
                  </div>
                  <p className="text-emerald-700 font-semibold mb-1">
                    Click to upload new image (optional)
                  </p>
                  <p className="text-gray-500 text-sm">
                    PNG, JPG or WEBP (Max 5MB)
                  </p>
                </div>
              </label>
            ) : (
              <div className="relative rounded-lg overflow-hidden border-2 border-emerald-200 bg-emerald-50">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all"
                >
                  <FaTimes />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || imageUploading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white p-4 rounded-lg font-semibold shadow-lg flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isLoading || imageUploading ? (
              <>
                <div className="border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
                <span>{imageUploading ? "Uploading Image..." : "Updating..."}</span>
              </>
            ) : (
              <>
                <FaUpload />
                <span>Update Gallery Item</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
