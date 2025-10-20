import React, { useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Khairulwara",
    email: "khairul@example.com",
    bio: "A dreamer, developer & writer exploring aesthetics in code.",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditing(false);
    console.log("Updated Profile:", user);
  };

  const samplePosts = [
    { id: 1, title: "Aesthetic UI: Designing with Calm Colors" },
    { id: 2, title: "How I Built My MERN Blog" },
    { id: 3, title: "My Journey from PHP to MERN Stack" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Your Profile</h2>

        {editing ? (
          <form onSubmit={handleSave} className="edit-form">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Your bio"
              rows="4"
            ></textarea>
            <button type="submit" className="btn">Save Changes</button>
          </form>
        ) : (
          <div className="profile-info">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Bio:</strong> {user.bio}</p>
            <button className="btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        )}

        <div className="posts-section">
          <h3>Your Posts</h3>
          <ul>
            {samplePosts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
