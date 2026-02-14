const uploadMedia = async (file, folderName = "default") => {
  if (!file) return null;

  const safeFolderName = folderName.replace(/[^a-zA-Z0-9-_]/g, "_");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", safeFolderName);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.error) {
      console.error("Cloudinary error:", data.error);
      return null;
    }

    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }
};

export default uploadMedia;
