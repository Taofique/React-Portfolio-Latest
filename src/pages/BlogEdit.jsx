import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getBlog, updateBlog } from "../services/api";
import BlogForm from "../components/blog/BlogForm";
import { HiArrowLeft } from "react-icons/hi";

export default function BlogEdit() {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", `/blog/edit/${id}`);
      navigate("/blog/login");
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await getBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.error("❌ Fetch blog error:", error);
        alert("Failed to fetch blog");
        navigate("/blog");
      }
    };

    fetchBlog();
  }, [id, isAuthenticated, navigate]);

  // ✅ Handle form submission with FormData
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await updateBlog(id, formData);
      navigate(`/blog/${response.data._id}`);
    } catch (error) {
      console.error("❌ Update blog error:", error);
      alert(error.message || "Failed to update blog");
      setLoading(false);
    }
  };

  if (!blog || !isAuthenticated) {
    return (
      <section className="text-center py-20">
        <p className="text-brand-inactive">Loading...</p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[900px] mx-auto px-4 md:px-20 py-10 md:py-16">
      <Link
        to="/blog"
        className="flex items-center gap-2 text-brand-inactive hover:text-brand-active transition-colors mb-6"
      >
        <HiArrowLeft size={20} />
        Back to Blog
      </Link>

      <h2 className="font-lato font-bold text-3xl md:text-4xl text-white text-center mb-8">
        Edit Blog
      </h2>

      <div className="bg-brand-nav rounded-2xl p-6 md:p-10">
        <BlogForm
          initialData={blog}
          onSubmit={handleSubmit}
          submitText="Update Blog"
          loading={loading}
        />
      </div>
    </section>
  );
}
