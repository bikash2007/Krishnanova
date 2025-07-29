import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import { useApi } from "../Context/baseUrl";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const baseUrl = useApi();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log(user);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Here you would typically make an API call to update user data
      // For now, we'll just update localStorage and context
      const updatedUser = { ...user, ...formData };
      setUser(updatedUser);

      setMessage("Profile updated successfully!");
      setIsEditing(false);

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#0f1f2e] mb-4">
            Please log in
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#01abfd] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#0189d1] transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fbfd]">
      <Navigation />

      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg border border-[#01abfd]/20 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#01abfd] via-[#0189d1] to-[#2e8b57] p-8 text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-[#01abfd] mx-auto mb-4">
                  {user.avatar ? (
                    <img
                      src={
                        user.isGoogleUser && user.avatar.startsWith("http")
                          ? user.avatar
                          : baseUrl + user.avatar
                      }
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    user.name?.charAt(0).toUpperCase() || "U"
                  )}
                </div>
                {user.role === "admin" && (
                  <div className="absolute -top-2 -right-2 bg-[#f4c430] text-[#0f1f2e] px-2 py-1 rounded-full text-xs font-bold">
                    ADMIN
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.name}
              </h1>
              <p className="text-white/90">{user.email}</p>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-xl ${
                    message.includes("success")
                      ? "bg-green-50 border border-green-200 text-green-600"
                      : "bg-red-50 border border-red-200 text-red-600"
                  }`}
                >
                  {message}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Information */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0f1f2e] mb-6">
                    Profile Information
                  </h2>

                  {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#0f1f2e] mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#d1ccc0] focus:border-[#01abfd] focus:outline-none focus:ring-2 focus:ring-[#01abfd]/20"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#0f1f2e] mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border-2 border-[#d1ccc0] focus:border-[#01abfd] focus:outline-none focus:ring-2 focus:ring-[#01abfd]/20"
                          required
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-[#01abfd] text-white py-3 rounded-xl font-semibold hover:bg-[#0189d1] transition disabled:opacity-50"
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setFormData({
                              name: user.name || "",
                              email: user.email || "",
                            });
                          }}
                          className="flex-1 border-2 border-[#01abfd] text-[#01abfd] py-3 rounded-xl font-semibold hover:bg-[#01abfd]/10 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-[#f9fbfd] p-4 rounded-xl">
                        <label className="block text-sm font-medium text-[#0189d1] mb-1">
                          Name
                        </label>
                        <p className="text-lg font-semibold text-[#0f1f2e]">
                          {user.name}
                        </p>
                      </div>

                      <div className="bg-[#f9fbfd] p-4 rounded-xl">
                        <label className="block text-sm font-medium text-[#0189d1] mb-1">
                          Email
                        </label>
                        <p className="text-lg font-semibold text-[#0f1f2e]">
                          {user.email}
                        </p>
                      </div>

                      <div className="bg-[#f9fbfd] p-4 rounded-xl">
                        <label className="block text-sm font-medium text-[#0189d1] mb-1">
                          Role
                        </label>
                        <p className="text-lg font-semibold text-[#0f1f2e] capitalize">
                          {user.role}
                        </p>
                      </div>

                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-[#01abfd] text-white py-3 rounded-xl font-semibold hover:bg-[#0189d1] transition"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>

                {/* Account Actions */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0f1f2e] mb-6">
                    Account Actions
                  </h2>

                  <div className="space-y-4">
                    <div className="bg-[#eec6d3]/20 p-6 rounded-xl">
                      <h3 className="font-semibold text-[#0f1f2e] mb-2">
                        Account Status
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        <span className="text-green-600 font-medium">
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="bg-[#01abfd]/10 p-6 rounded-xl">
                      <h3 className="font-semibold text-[#0f1f2e] mb-2">
                        Member Since
                      </h3>
                      <p className="text-[#0189d1]">
                        {new Date(
                          user.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {user.role === "admin" && (
                      <div className="bg-[#f4c430]/10 p-6 rounded-xl">
                        <h3 className="font-semibold text-[#0f1f2e] mb-2">
                          Admin Access
                        </h3>
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="bg-[#f4c430] text-[#0f1f2e] px-4 py-2 rounded-lg font-medium hover:bg-[#f4c430]/80 transition"
                        >
                          Go to Dashboard
                        </button>
                      </div>
                    )}

                    <div className="bg-red-50 p-6 rounded-xl">
                      <h3 className="font-semibold text-red-600 mb-2">
                        Danger Zone
                      </h3>
                      <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
