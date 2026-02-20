import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadMedia } from "../utils/uploadMedia";

export default function UpdateCategoryForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    price: state?.price || "",
    features: state?.features?.join(", ") || "",
    description: state?.description || "",
    image: state?.image || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadMedia(
          imageFile,
          `categories/${state.name}`
        );
      }

      const token = localStorage.getItem("token");
      const payload = {
        price: Number(form.price),
        features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
        description: form.description,
        image: imageUrl,
      };

      // ✅ FIXED: was /api/category/:name (singular), now /api/categories/name/:name (plural, correct route)
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/categories/name/${state.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      navigate("/admin/categories");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-emerald-700 mb-6">
          Update Category
        </h2>

        {/* Category name is locked */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Category Name (locked)
          </label>
          <input
            type="text"
            value={state?.name || ""}
            disabled
            className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (per night)
            </label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (comma-separated)
            </label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="e.g. WiFi, Pool, AC"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image (leave empty to keep current)
            </label>
            {form.image && (
              <img
                src={form.image}
                alt="Current"
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
}