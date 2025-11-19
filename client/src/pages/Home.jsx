import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="home-container">
      <div className="blog-grid">
        {posts.map((post) => (
          <div key={post._id} className="blog-card">
            <h3>{post.title}</h3>
            <p className="meta">
              by {post.username} | {new Date(post.createdAt).toLocaleDateString()}
            </p>
            {post.image && (
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                style={{ width: "100%", borderRadius: "12px", marginBottom: "15px" }}
              />
            )}
            <p className="excerpt">{post.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
