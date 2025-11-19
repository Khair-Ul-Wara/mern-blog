import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      alert("Registration successful!");
      navigate("/login"); // Redirect to login
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="link">Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
