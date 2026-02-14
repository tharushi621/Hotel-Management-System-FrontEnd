import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// Cloudinary upload utility
const uploadMedia = async (file, folderName) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  );

  // Dynamic folder: categories/<Category Name>
  formData.append("folder", folderName || "default");

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dpacwtxcu/upload`,
      {
        method: "POST",
        body: formData,
      },
    );
    const data = await res.json();
    return data.secure_url; // URL of the uploaded image
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return null;
  }
};

export default function AddCategoryForm() {
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

      const featuresArray = features.split(",").map((f) => f.trim());

      setImageUploading(true);
      const imageUrl = await uploadMedia(image, `categories/${name}`);
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
        import.meta.env.VITE_BACKEND_URL + "/api/category",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
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
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Add Category</h2>

        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Features (comma separated)"
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows="3"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex justify-center"
        >
          {isLoading || imageUploading ? (
            <div className="border-t-2 border-white w-5 h-5 rounded-full animate-spin"></div>
          ) : (
            "Add Category"
          )}
        </button>
      </form>
    </div>
  );
}
