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
    author: initialData?.author || user?.name || "Taofique Islam",
    image: initialData?.image || "",
    readTime: initialData?.readTime || "5 min read",
    tags: initialData?.tags?.join(", ") || "",
  });

  // ✅ State for image file
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Remove selected image
  const handleRemoveImage = () => {
    setImagePreview("");
    setImageFile(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  // ✅ Handle form submission with FormData
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("excerpt", formData.excerpt);
    submitData.append("content", formData.content);
    submitData.append("category", formData.category);
    submitData.append("author", formData.author);
    submitData.append("readTime", formData.readTime);

    // Add image URL as fallback
    if (formData.image) {
      submitData.append("image", formData.image);
    }

    // Add tags as JSON string
    const tags = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
    submitData.append("tags", JSON.stringify(tags));

    // Add image file if selected
    if (imageFile) {
      submitData.append("image", imageFile);
    }

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

      {/* ✅ Image Upload Section */}
      <div>
        <label className="font-lato text-white text-sm block mb-2">Image</label>
        <div className="flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-brand-active file:text-white hover:file:opacity-90 cursor-pointer"
          />

          {imagePreview && (
            <div className="relative w-full max-w-xs">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}

          <p className="text-brand-inactive text-xs">
            Or enter image URL below
          </p>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full bg-white/5 text-white border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-active transition-colors"
            placeholder="https://example.com/image.jpg"
          />
        </div>
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
            <option value="General" className="bg-brand-nav text-white">
              General
            </option>
            <option value="React" className="bg-brand-nav text-white">
              React
            </option>
            <option value="JavaScript" className="bg-brand-nav text-white">
              JavaScript
            </option>
            <option value="CSS" className="bg-brand-nav text-white">
              CSS
            </option>
            <option value="Design" className="bg-brand-nav text-white">
              Design
            </option>
            <option value="Web Development" className="bg-brand-nav text-white">
              Web Development
            </option>
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

      {/* Author - Hidden */}
      <div className="hidden">
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
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
