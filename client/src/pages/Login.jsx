import React from "react";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Welcome Back 👋</h2>
        <p>Login to continue writing and reading blogs</p>

        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />

        <button type="submit">Login</button>

        <p className="signup-link">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
