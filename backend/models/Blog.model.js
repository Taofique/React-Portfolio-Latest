import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
    default: "Taofique Islam",
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "React",
      "JavaScript",
      "CSS",
      "SQL",
      "System Design",
      "Security",
      "Authentication",
      "Frameworks",
      "Design",
      "Web Development",
      "General",
    ],
  },
  image: {
    type: String,
    default: "/assets/blog.jpg",
  },
  readTime: {
    type: String,
    default: "5 min read",
  },
  tags: [
    {
      type: String,
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Blog", blogSchema);
