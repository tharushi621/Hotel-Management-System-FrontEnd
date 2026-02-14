import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMedia from "../../utils/uploadMedia";
import { FaImage, FaUpload, FaTimes } from "react-icons/fa";

export default function UpdateCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

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

      // Split features into array
      const featuresArray = features.split(",").map((f) => f.trim());

      // Upload image to Cloudinary with folder "categories/<CategoryName>"
      setImageUploading(true);
      const folderName = `categories/${name}`;
      const imageUrl = await uploadMedia(image, folderName);
      setImageUploading(false);

      if (!imageUrl) {
        toast.error("Image upload failed");
        setIsLoading(false);
        return;
      }

      const formData = {
        name,
        price,
        features: featuresArray,
        description,
        image: imageUrl,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Category added successfully");

      setName("");
      setPrice("");
      setFeatures("");
      setDescription("");
      setImage(null);
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
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              ➕
            </span>
            Add New Category
          </h2>
          <p className="text-emerald-100 mt-2">
            Fill in the details to create a new category
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-b-2xl shadow-xl p-8 space-y-6"
        >
          {/* Category Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Premium Package"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg transition-all outline-none"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 pl-8 rounded-lg transition-all outline-none"
                required
                step="0.01"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Features
            </label>
            <input
              type="text"
              placeholder="Feature 1, Feature 2, Feature 3"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg transition-all outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple features with commas
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe your category in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 p-3 rounded-lg transition-all outline-none resize-none"
              rows="4"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Image
              <span className="text-red-500 ml-1">*</span>
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
                    Click to upload image
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
                  title="Remove image"
                >
                  <FaTimes />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white text-sm font-medium">
                    {image.name}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || imageUploading}
            className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2"
          >
            {isLoading || imageUploading ? (
              <>
                <div className="border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
                <span>
                  {imageUploading ? "Uploading Image..." : "Creating Category..."}
                </span>
              </>
            ) : (
              <>
                <FaUpload />
                <span>Add Category</span>
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