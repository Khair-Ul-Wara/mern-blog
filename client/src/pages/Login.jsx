import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });

      // Save the entire response in localStorage
      localStorage.setItem("user", JSON.stringify(data));

      // Set user in React state (exclude token if you want)
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        profilePic: data.profilePic,
      });

      alert("Login successful!");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
