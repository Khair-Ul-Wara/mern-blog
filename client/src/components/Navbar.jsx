import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">Aesthetic Blog</Link>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/write">Write</Link> {/* ✅ fixed path */}
        <Link to="/profile">Profile</Link> {/* ✅ added */}
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Navbar;
