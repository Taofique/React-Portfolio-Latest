import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deleteBlog } from "../../services/api";

export default function BlogCard({ blog, onDelete }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle edit click - redirect to login if not authenticated
  const handleEditClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      sessionStorage.setItem("redirectAfterLogin", `/blog/edit/${blog._id}`);
      navigate("/blog/login");
    }
  };

  // Handle delete click - redirect to login if not authenticated
  const handleDeleteClick = async () => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterLogin", "/blog");
      navigate("/blog/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(blog._id);
        onDelete(blog._id);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="bg-brand-nav rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 group">
      <Link to={`/blog/${blog._id}`}>
        <div className="w-full h-48 overflow-hidden">
          <img
            src={blog.image || "/blog/default.jpg"}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-brand-active text-sm font-lato">
            {blog.category}
          </span>
          <span className="text-brand-inactive text-xs font-lato">
            {blog.readTime}
          </span>
        </div>

        <Link to={`/blog/${blog._id}`}>
          <h3 className="font-lato font-bold text-xl text-white mt-2 hover:text-brand-active transition-colors">
            {blog.title}
          </h3>
        </Link>

        <p className="font-lato text-brand-inactive text-sm mt-2 line-clamp-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-lato text-brand-inactive text-xs">
            {blog.date}
          </span>

          {/* Show edit/delete buttons only if authenticated */}
          {isAuthenticated && (
            <div className="flex gap-2">
              <Link
                to={`/blog/edit/${blog._id}`}
                onClick={handleEditClick}
                className="text-brand-inactive hover:text-brand-active transition-colors text-sm"
              >
                Edit
              </Link>
              <button
                onClick={handleDeleteClick}
                className="text-brand-inactive hover:text-red-500 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
