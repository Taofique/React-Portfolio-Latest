import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { HiArrowLeft } from "react-icons/hi";

export default function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlog(id);
        setBlog(response.data);
      } catch (error) {
        console.error("❌ Fetch blog error:", error);
        alert("Failed to fetch blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <section className="text-center py-20">
        <p className="text-brand-inactive">Loading...</p>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="text-center py-20">
        <p className="text-brand-inactive">Blog not found</p>
        <Link
          to="/blog"
          className="text-brand-active hover:underline mt-4 inline-block"
        >
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[900px] mx-auto px-4 md:px-20 py-10 md:py-16">
      {/* ✅ Back Button */}
      <Link
        to="/blog"
        className="flex items-center gap-2 text-brand-inactive hover:text-brand-active transition-colors mb-8"
      >
        <HiArrowLeft size={20} />
        Back to Blog
      </Link>

      <article className="bg-brand-nav rounded-2xl overflow-hidden">
        <img
          src={blog.image || "/blog/default.jpg"}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-brand-active text-sm font-lato">
              {blog.category}
            </span>
            <span className="text-brand-inactive text-sm font-lato">
              {blog.readTime}
            </span>
          </div>

          <h1 className="font-lato font-bold text-3xl md:text-4xl text-white mb-4">
            {blog.title}
          </h1>

          <p className="font-lato text-brand-inactive mb-6">By {blog.author}</p>

          <div className="prose prose-invert max-w-none">
            {blog.content &&
              blog.content.split("\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="font-lato text-brand-inactive leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/10">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-brand-inactive bg-white/5 px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {isAuthenticated && (
            <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
              <Link
                to={`/blog/edit/${blog._id}`}
                className="font-lato font-bold text-white bg-brand-active px-6 py-2 rounded-md hover:opacity-90 transition-opacity"
              >
                Edit Blog
              </Link>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
