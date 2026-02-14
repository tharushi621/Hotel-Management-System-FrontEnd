import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaImage } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminCategory() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [categories, setCategories] = useState([]);
  const [categoriesIsLoaded, setCategoriesIsLoaded] = useState(false);

  useEffect(() => {
    if (!categoriesIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          setCategories(res.data.categories || []);
          setCategoriesIsLoaded(true);
        })
        .catch(() => {
          toast.error("Failed to load categories");
        });
    }
  }, [categoriesIsLoaded]);

  // Delete category
  function handleDelete(name) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (!confirmDelete) return;

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Category deleted successfully");
        setCategoriesIsLoaded(false);
      })
      .catch(() => {
        toast.error("Error deleting category");
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <span className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              🏷️
            </span>
            Category Management
          </h1>
          <p className="text-emerald-100 mt-2 text-lg">
            Manage your product categories
          </p>
        </div>

        {/* Stats Card */}
        <div className="mb-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">
                Total Categories
              </p>
              <p className="text-3xl font-bold text-emerald-600">
                {categories.length}
              </p>
            </div>
            <div className="bg-emerald-100 p-4 rounded-full">
              <svg
                className="w-8 h-8 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 pb-24">
          {categories.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaImage className="text-emerald-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No Categories Found
              </h3>
              <p className="text-gray-500 mb-6">
                Start by adding your first category
              </p>
              <button
                onClick={() => navigate("/admin/add-category")}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
              >
                Add Category
              </button>
            </div>
          ) : (
            categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-emerald-100 hover:border-emerald-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="md:w-1/4 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center p-6">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
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
                    {/* Header with Index */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md">
                          {index + 1}
                        </span>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {category.name}
                          </h2>
                          <p className="text-emerald-600 font-semibold text-xl mt-1">
                            ${Number(category.price).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate("/admin/update-category", {
                              state: category,
                            })
                          }
                          className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Edit"
                        >
                          <FaEdit className="text-lg" />
                        </button>

                        <button
                          onClick={() => handleDelete(category.name)}
                          className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                          title="Delete"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    {category.features && category.features.length > 0 && (
                      <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                        <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                          <span className="bg-emerald-200 p-1 rounded">✓</span>
                          Key Features
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {category.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <span className="text-emerald-600 mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => navigate("/admin/add-category")}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-50"
          title="Add New Category"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
