import { useState, useEffect } from "react";
import API from "../api/axios";
import "../styles/Profile.css";

const Profile = ({ username }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [editingPostId, setEditingPostId] = useState(null); // currently editing post
  const [editForm, setEditForm] = useState({ title: "", desc: "" });

  // Fetch user posts and info
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await API.get(`/posts/user/${username}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error("Error fetching user posts:", err);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await API.get(`/users/${username}`);
        setUserInfo(res.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserPosts();
    fetchUserInfo();
  }, [username]);

  // Handle delete
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) return alert("You must be logged in to delete posts.");

      await API.delete(`/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserPosts(userPosts.filter((post) => post._id !== postId));
      alert("Post deleted successfully!");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  // Start editing a post
  const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditForm({ title: post.title, desc: post.desc });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingPostId(null);
    setEditForm({ title: "", desc: "" });
  };

  // Save edited post
  const saveEdit = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) return alert("You must be logged in to edit posts.");

      const res = await API.put(
        `/posts/${postId}`,
        { title: editForm.title, desc: editForm.desc },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUserPosts(
        userPosts.map((post) => (post._id === postId ? res.data : post))
      );
      setEditingPostId(null);
      setEditForm({ title: "", desc: "" });
      alert("Post updated successfully!");
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{userInfo.username || username}'s Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {userInfo.email || "Not available"}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {userInfo.createdAt
              ? new Date(userInfo.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div className="posts-section">
          <h3>Your Posts</h3>
          <ul>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <li key={post._id}>
                  {editingPostId === post._id ? (
                    <div>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                      <textarea
                        value={editForm.desc}
                        onChange={(e) =>
                          setEditForm({ ...editForm, desc: e.target.value })
                        }
                        rows={4}
                      ></textarea>
                      <button onClick={() => saveEdit(post._id)}>Save</button>
                      <button onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <h4>{post.title}</h4>
                      {post.image && (
                        <img
                          src={`http://localhost:5000/uploads/${post.image}`}
                          alt={post.title}
                          style={{
                            maxWidth: "100%",
                            borderRadius: "10px",
                            marginTop: "10px",
                          }}
                        />
                      )}
                      <p>{post.desc}</p>
                      <button
                        onClick={() => handleEdit(post)}
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
                        onClick={() => handleDelete(post._id)}
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
                </li>
              ))
            ) : (
              <p>No posts yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
