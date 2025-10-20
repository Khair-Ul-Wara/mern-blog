import React, { useState } from "react";
import "../styles/Write.css";

const Write = () => {
  const [post, setPost] = useState({
    title: "",
    content: "",
    image: null,
  });

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, image: file ? URL.createObjectURL(file) : null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", post);
  };

  return (
    <div className="write-container">
      <div className="write-card">
        <h2>Write a New Blog</h2>

        <form onSubmit={handleSubmit}>
          {post.image && (
            <div className="image-preview">
              <img src={post.image} alt="Preview" />
            </div>
          )}

          <label htmlFor="fileInput" className="file-label">
            Upload Cover Image
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            type="text"
            name="title"
            placeholder="Enter blog title"
            value={post.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Write your content..."
            value={post.content}
            onChange={handleChange}
            rows="10"
            required
          ></textarea>

          <button type="submit" className="btn">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Write;
