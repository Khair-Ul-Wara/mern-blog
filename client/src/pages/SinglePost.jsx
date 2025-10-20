import React from "react";
import "../styles/SinglePost.css";

const SinglePost = () => {
  const post = {
    title: "The Beauty of Minimal Web Design",
    author: "Khairulwara",
    date: "October 20, 2025",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    content: `
      Simplicity isn’t about removing everything—it’s about keeping what truly matters. 
      In minimal web design, we focus on clarity, whitespace, and balance. Each element serves a purpose.

      Colors that calm, typography that breathes, and smooth transitions that feel natural—these are the marks of an aesthetic interface. 
      In this post, I’ll share how minimalism has reshaped my design approach and how it connects emotion with usability.
    `,
  };

  return (
    <div className="singlepost-container">
      <div className="singlepost-card">
        <img src={post.image} alt={post.title} className="post-image" />
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>By <strong>{post.author}</strong></span> • <span>{post.date}</span>
        </div>
        <p className="post-content">{post.content}</p>
      </div>
    </div>
  );
};

export default SinglePost;
