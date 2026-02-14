import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminGallery() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Redirect to login if no token
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  // Fetch gallery items
  useEffect(() => {
    if (!isLoaded) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/gallery`)
        .then((res) => {
          setGalleryItems(res.data.list || []);
          setIsLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load gallery items");
        });
    }
  }, [isLoaded]);

  // Delete gallery item
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery item?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Gallery item deleted successfully");
        setIsLoaded(false);
      })
      .catch(() => toast.error("Error deleting gallery item"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">🖼️</span>
            Gallery Management
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">
            Manage your gallery items
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Gallery Items</p>
              <p className="text-3xl font-bold text-emerald-600">{galleryItems.length}</p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-full">
              <FaImage className="text-emerald-600 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 gap-6 pb-24">
          {galleryItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaImage className="text-emerald-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Gallery Items Found</h3>
              <p className="text-gray-500 mb-6">Start by adding your first gallery item</p>
              <button
                onClick={() => navigate("/admin/add-gallery")}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
              >
                Add Gallery Item
              </button>
            </div>
          ) : (
            galleryItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/4 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center p-6">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                      />
                    ) : (
                      <div className="w-full h-48 bg-emerald-200 rounded-xl flex items-center justify-center">
                        <FaImage className="text-emerald-400 text-5xl" />
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="md:w-3/4 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/admin/update-gallery", { state: item })
                          }
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Delete"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/admin/add-gallery")}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-50"
          title="Add New Gallery Item"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
