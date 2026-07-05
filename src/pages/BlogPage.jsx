import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBlogs } from "../services/api";
import BlogCard from "../components/blog/BlogCard";
import { useAuth } from "../context/AuthContext";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBlogs();
      setBlogs(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog._id !== id));
  };

  // Handle create blog click - redirect to login if not authenticated
  const handleCreateClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      sessionStorage.setItem("redirectAfterLogin", "/blog/create");
      navigate("/blog/login");
    }
  };

  if (loading) {
    return (
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-20 py-10 md:py-16">
        <div className="text-center">
          <p className="text-brand-inactive">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-20 py-10 md:py-16">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-20 py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="text-center md:text-left">
          <h2 className="font-lato font-bold text-3xl md:text-4xl text-white">
            Blog
          </h2>
          <p className="font-lato text-brand-inactive mt-3">
            My thoughts and insights
          </p>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Link
            to={isAuthenticated ? "/blog/create" : "/blog/login"}
            onClick={handleCreateClick}
            className="font-lato font-bold text-white bg-brand-active px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
          >
            + Create Blog
          </Link>
        </div>
      </div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-brand-inactive text-lg">No blogs yet</p>
          {isAuthenticated ? (
            <Link
              to="/blog/create"
              className="text-brand-active hover:underline mt-4 inline-block"
            >
              Create your first blog
            </Link>
          ) : (
            <Link
              to="/blog/login"
              className="text-brand-active hover:underline mt-4 inline-block"
            >
              Login to create your first blog
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}
