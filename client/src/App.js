import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import "./App.css"

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={user ? <Write user={user} /> : <Login setUser={setUser} />} />
        <Route path="/profile" element={user ? <Profile username={user.username} /> : <Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
