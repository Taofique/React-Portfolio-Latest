const API_URL = "http://localhost:5000/api/blogs";

// Helper to get token
const getToken = () => localStorage.getItem("token");

// Helper headers
const getHeaders = () => ({
  "Content-Type": "application/json",
  ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
});

// ============================================
// AUTH API
// ============================================

export const login = async (email, password) => {
  try {
    console.log("📤 Sending login request to:", `${API_URL}/login`);

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("📥 Response status:", response.status);

    const data = await response.json();
    console.log("📦 Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("❌ Login API error:", error);
    throw error;
  }
};

// ============================================
// BLOG API
// ============================================

// Get all blogs
export const getBlogs = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch blogs");
    return data;
  } catch (error) {
    console.error("❌ Get blogs error:", error);
    throw error;
  }
};

// Get single blog
export const getBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch blog");
    return data;
  } catch (error) {
    console.error("❌ Get blog error:", error);
    throw error;
  }
};

// Create blog
export const createBlog = async (blogData) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create blog");
    return data;
  } catch (error) {
    console.error("❌ Create blog error:", error);
    throw error;
  }
};

// Update blog
export const updateBlog = async (id, blogData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(blogData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update blog");
    return data;
  } catch (error) {
    console.error("❌ Update blog error:", error);
    throw error;
  }
};

// Delete blog
export const deleteBlog = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to delete blog");
    return data;
  } catch (error) {
    console.error("❌ Delete blog error:", error);
    throw error;
  }
};

// Verify token
export const verifyToken = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${API_URL}/verify`, {
      headers: getHeaders(),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Token invalid");
    return data;
  } catch (error) {
    console.error("❌ Verify token error:", error);
    throw error;
  }
};
