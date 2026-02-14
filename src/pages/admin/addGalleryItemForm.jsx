import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaUpload, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddGalleryItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!image) {
        toast.error("Please select an image");
        setIsLoading(false);
        return;
      }

      // Upload image to Cloudinary with folder "gallery/<ItemName>"
      setImageUploading(true);
      const folderName = `gallery/${name}`;
      const imageUrl = await uploadMedia(image, folderName);
      setImageUploading(false);

      if (!imageUrl) {
        toast.error("Image upload failed");
        setIsLoading(false);
        return;
      }

      const formData = {
        name,
        description,
        image: imageUrl,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`,
        formData,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      toast.success("Gallery item added successfully");
      setName("");
      setDescription("");
      setImage(null);
      navigate("/admin/gallery"); // Redirect to gallery list after adding
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setImageUploading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="w-full max-w-2xl">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-t-2xl shadow-xl p-6">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">➕</span>
            Add New Gallery Item
          </h2>
          <p className="text-emerald-100 mt-2">Fill in the details to create a new gallery item</p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-xl p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Gallery Item Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg transition-all outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              placeholder="Describe the gallery item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg transition-all outline-none resize-none"
              rows="4"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Image
              <span className="text-red-500 ml-1">*</span>
            </label>
            {!image ? (
              <label className="block w-full border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-lg p-8 text-center cursor-pointer bg-emerald-50/30 hover:bg-emerald-50 transition-all group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  required
                />
                <div className="flex flex-col items-center">
                  <div className="bg-emerald-100 p-4 rounded-full mb-3 group-hover:bg-emerald-200 transition-colors">
                    <FaUpload className="text-emerald-600 text-2xl" />
                  </div>
                  <p className="text-emerald-700 font-semibold mb-1">Click to upload image</p>
                  <p className="text-gray-500 text-sm">PNG, JPG or WEBP (Max 5MB)</p>
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
                  title="Remove image"
                >
                  <FaTimes />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{image.name}</p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || imageUploading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
          >
            {isLoading || imageUploading ? (
              <>
                <div className="border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
                <span>{imageUploading ? "Uploading Image..." : "Adding Item..."}</span>
              </>
            ) : (
              <>
                <FaUpload />
                <span>Add Gallery Item</span>
              </>
            )}
          </button>

          {/* Info Message */}
          {(isLoading || imageUploading) && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-emerald-700 text-sm text-center">
                Please wait while we process your request...
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
