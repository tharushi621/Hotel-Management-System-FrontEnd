// utils/uploadMedia.js
const uploadMedia = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  // Optional: specify a folder dynamically (Cloudinary will create it)
  // e.g., folder by category name or current date
  const folderName = `categories/${Date.now()}`; // change as needed
  formData.append("folder", folderName);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url; // URL of uploaded image
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export default uploadMedia;
