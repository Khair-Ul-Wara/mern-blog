import React from "react";
import "../styles/Home.css";

const Home = () => {
  const blogs = [
    {
      id: 1,
      title: "The Art of Slow Living",
      author: "Khairulwara",
      date: "Oct 18, 2025",
      excerpt: "Finding beauty in simplicity and stillness..."
    },
    {
      id: 2,
      title: "Why Aesthetic Code Matters",
      author: "Khairulwara",
      date: "Oct 19, 2025",
      excerpt: "Designing code that feels as beautiful as it looks."
    }
  ];

  return (
    <main className="home-container">
      <h2>Latest Blogs</h2>
      <div className="blog-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <h3>{blog.title}</h3>
            <p className="meta">
              By <span>{blog.author}</span> — {blog.date}
            </p>
            <p className="excerpt">{blog.excerpt}</p>
            <button className="btn">Read More</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
