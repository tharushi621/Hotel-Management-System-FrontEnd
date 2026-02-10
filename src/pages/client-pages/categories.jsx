import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCategories() {
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
        .catch((err) => {
          console.error(err);
        });
    }
  }, [categoriesIsLoaded]);

  function deleteItem(name) {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    axios
      .delete(
        import.meta.env.VITE_BACKEND_URL +
          "/api/category/" +
          encodeURIComponent(name)
      )
      .then(() => {
        setCategoriesIsLoaded(false); // reload list
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Categories</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-pink-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Features</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id || cat.name} className="border-t">
                <td className="py-2 px-4">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="py-2 px-4">{cat.name}</td>

                <td className="py-2 px-4">Rs. {cat.price}</td>

                <td className="py-2 px-4">{cat.description}</td>

                <td className="py-2 px-4">
                  <ul className="list-disc list-inside text-sm">
                    {Array.isArray(cat.features) &&
                      cat.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                  </ul>
                </td>

                <td className="py-2 px-4 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteItem(cat.name)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-4 text-gray-500"
                >
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
