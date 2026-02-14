import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Category Management
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Features</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category, index) => (
                <tr
                  key={category.name}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium">{index + 1}</td>

                  <td className="px-6 py-4">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-14 h-14 object-cover rounded-lg border"
                      />
                    ) : (
                      <span className="text-gray-400 italic">No Image</span>
                    )}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {category.name}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    Rs. {Number(category.price).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside space-y-1">
                      {category.features?.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </td>

                  <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                    {category.description}
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                      onClick={() =>
                        navigate("/admin/edit-category/" + category.name)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                      onClick={() => handleDelete(category.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-gray-400">
                    No Categories Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate("/admin/add-category")}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl transition transform hover:scale-105"
      >
        <FaPlus />
      </button>
    </div>
  );
}
