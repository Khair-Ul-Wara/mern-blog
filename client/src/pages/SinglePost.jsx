import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/SinglePost.css";

const SinglePost = () => {
  const { id } = useParams(); // post ID from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ title: "", desc: "" });

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const isOwner = user && post && post.userId === user.id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      alert("Post deleted successfully!");
      navigate("/profile"); // redirect to profile after deletion
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  const startEdit = () => {
    setEditing(true);
    setEditForm({ title: post.title, desc: post.desc });
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditForm({ title: "", desc: "" });
  };

  const saveEdit = async () => {
    try {
      const res = await API.put(
        `/posts/${id}`,
        { title: editForm.title, desc: editForm.desc },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPost(res.data);
      setEditing(false);
      alert("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  if (!post) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading post...</p>;

  return (
    <div className="singlepost-container">
      <div className="singlepost-card">
        {post.image && (
          <img
            src={`http://localhost:5000/uploads/${post.image}`}
            alt={post.title}
            className="post-image"
          />
        )}

        {editing ? (
          <div>
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              style={{ width: "100%", marginBottom: "10px", padding: "5px" }}
            />
            <textarea
              value={editForm.desc}
              onChange={(e) => setEditForm({ ...editForm, desc: e.target.value })}
              rows={6}
              style={{ width: "100%", padding: "5px" }}
            ></textarea>
            <button onClick={saveEdit} style={{ marginRight: "10px" }}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </div>
        ) : (
          <>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              By {post.username} | {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="post-content">{post.desc}</div>

            {isOwner && (
              <div style={{ marginTop: "20px" }}>
                <button
                  onClick={startEdit}
                  style={{
                    marginRight: "10px",
                    backgroundColor: "blue",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
