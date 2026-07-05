import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function BlogForm({
  initialData,
  onSubmit,
  submitText,
  loading,
}) {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "General",
    author: initialData?.author || user?.name || "Taofique Islam", // ✅ Auto-fill author
    image: initialData?.image || "",
    readTime: initialData?.readTime || "5 min read",
    tags: initialData?.tags?.join(", ") || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
          placeholder="Enter blog title"
          required
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">
          Excerpt *
        </label>
        <input
          type="text"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
          placeholder="Brief summary of your blog"
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">
          Content *
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="10"
          className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors resize-y"
          placeholder="Write your blog content here..."
          required
        />
      </div>

      {/* Category & Read Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="font-lato text-white text-sm block mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
            required
          >
            <option value="General">General</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="Design">Design</option>
            <option value="Web Development">Web Development</option>
          </select>
        </div>

        <div>
          <label className="font-lato text-white text-sm block mb-2">
            Read Time
          </label>
          <input
            type="text"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
            placeholder="5 min read"
          />
        </div>
      </div>

      {/* Author - Hidden or Auto-filled */}
      <div className="hidden">
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
          placeholder="/blog/image.jpg or https://example.com/image.jpg"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">
          Tags (comma separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
          placeholder="react, javascript, frontend"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full font-lato font-bold text-white bg-brand-active py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? "Saving..." : submitText}
      </button>
    </form>
  );
}
