import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createBlog } from "../services/api";
import BlogForm from "../components/blog/BlogForm";
import { HiArrowLeft } from "react-icons/hi";

export default function BlogCreate() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", "/blog/create");
      navigate("/blog/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      // Ensure author is set
      const blogData = {
        ...data,
        author: data.author || user?.name || "Taofique Islam",
      };

      console.log("📝 Creating blog with data:", blogData);

      const response = await createBlog(blogData);
      console.log("✅ Blog created:", response);

      navigate(`/blog/${response.data._id}`);
    } catch (error) {
      console.error("❌ Create blog error:", error);
      alert(error.message || "Failed to create blog");
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <section className="w-full max-w-[900px] mx-auto px-4 md:px-20 py-10 md:py-16">
      {/* ✅ Back Button */}
      <Link
        to="/blog"
        className="flex items-center gap-2 text-brand-inactive hover:text-brand-active transition-colors mb-6"
      >
        <HiArrowLeft size={20} />
        Back to Blog
      </Link>

      <h2 className="font-lato font-bold text-3xl md:text-4xl text-white text-center mb-8">
        Create New Blog
      </h2>

      <div className="bg-brand-nav rounded-2xl p-6 md:p-10">
        <BlogForm
          onSubmit={handleSubmit}
          submitText="Create Blog"
          loading={loading}
        />
      </div>
    </section>
  );
}
