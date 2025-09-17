import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLostItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the item
      let imageData = null;
      if (image) {
        imageData = await readFileAsDataURL(image);
      }

      const item = {
        id: Date.now(),
        title,
        description,
        location,
        image: imageData,
        createdAt: Date.now(),
      };

      const raw = localStorage.getItem("lostItems");
      const arr = raw ? JSON.parse(raw) : [];
      arr.push(item);
      localStorage.setItem("lostItems", JSON.stringify(arr));

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setImage(null);

      // Navigate to items dashboard
      navigate("/items");
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  return (
    <div className="item-form">
      <h2>Add Lost Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddLostItem;
