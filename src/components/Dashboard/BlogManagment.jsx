// AdminBlogPanel.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";

const API = import.meta.env.VITE_API_URL;

export default function BlogManagment() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const fetchPosts = async () => {
    const res = await axios.get(`${API}/blog`);
    setPosts(res.data);
  };

  const handleAdminDelete = async (id) => {
    if (!window.confirm("Admin: Delete this blog post?")) return;
    await axios.delete(`${API}/blog/${id}/admin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchPosts();
  };

  if (!user || user.role !== "admin")
    return (
      <div className="p-8 text-center text-red-600 font-bold">Admins only!</div>
    );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">All Community Blogs</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white/90 shadow rounded-xl p-4 flex items-center"
          >
            <img
              src={post.author.avatar || "/user-avatar.png"}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#6842ef] mr-3"
            />
            <div className="flex-1 min-w-0">
              <div className="font-bold text-[#6842ef]">{post.author.name}</div>
              <div className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleString()}
              </div>
              <div className="font-bold mt-1">{post.title}</div>
              <div className="text-gray-700 text-sm">{post.content}</div>
              {post.image && (
                <img
                  src={post.image}
                  alt="blog"
                  className="w-32 h-20 object-cover mt-2 rounded"
                />
              )}
            </div>
            <button
              onClick={() => handleAdminDelete(post._id)}
              className="ml-6 text-red-500 hover:text-red-700"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
