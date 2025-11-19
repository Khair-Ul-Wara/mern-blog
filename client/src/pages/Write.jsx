import { useState } from "react";
import API from "../api/axios";
import "../styles/Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      alert("You must be logged in to create a post");
      return;
    }

    let imageName = "";

    // Upload image if selected
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadRes = await API.post("/upload", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        imageName = uploadRes.data.filename;
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Image upload failed");
        return;
      }
    }

    // Create post
    try {
      await API.post(
        "/posts/create",
        {
          title,
          desc,
          image: imageName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Post created successfully!");
      setTitle("");
      setDesc("");
      setFile(null);
    } catch (err) {
      console.error("Post creation error:", err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="write-container">
      <div className="write-card">
        <h2>Create New Post</h2>

        {/* Image Preview */}
        {file && (
          <div className="image-preview">
            <img src={URL.createObjectURL(file)} alt="preview" />
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* File Input */}
          <label htmlFor="fileInput" className="file-label">
            Upload Image
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description Textarea */}
          <textarea
            placeholder="Write your post..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button type="submit" className="btn">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
