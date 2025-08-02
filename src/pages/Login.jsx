import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import Navigation from "../components/Navigation/Navigation";
import GoogleAuth from "../components/GoogleAuth";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier)
      newErrors.identifier = "Username or Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/auth/login", // Fixed API path
        formData
      );
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.avatar) localStorage.setItem("userAvatar", userData.avatar);
      if (setUser) setUser(userData);
      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setErrors({ general: error.response?.data?.message || "Login failed" });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login success
  const handleGoogleLoginSuccess = (result) => {
    if (result.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/profile"); // or navigate("/") for home page
    }
  };

  // Handle Google login error
  const handleGoogleLoginError = (msg) => {
    setErrors({ general: msg || "Google login failed" });
  };

  return (
    <GoogleOAuthProvider
      clientId={
        import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id"
      }
    >
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-[#f9fbfd] via-[#eec6d3]/20 to-[#01abfd]/10 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg mt-20 rounded-3xl shadow-2xl border border-[#01abfd]/20 overflow-hidden">
            <div className="bg-gradient-to-r from-[#01abfd] via-[#0189d1] to-[#2e8b57] p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="text-5xl mb-4"
              >
                🕉️
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/90">Sign in to your divine journey</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {errors.general && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Identifier Field */}
              <div>
                <label className="block text-sm font-medium text-[#0f1f2e] mb-2">
                  Username or Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all duration-300 ${
                      errors.identifier
                        ? "border-red-300 focus:border-red-500"
                        : "border-[#d1ccc0] focus:border-[#01abfd]"
                    } focus:outline-none focus:ring-2 focus:ring-[#01abfd]/20`}
                    placeholder="Enter your username or email"
                  />
                  <span className="absolute left-4 top-3.5 text-[#0189d1]">
                    👤
                  </span>
                </div>
                {errors.identifier && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.identifier}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-[#0f1f2e] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 pl-12 pr-12 rounded-xl border-2 transition-all duration-300 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500"
                        : "border-[#d1ccc0] focus:border-[#01abfd]"
                    } focus:outline-none focus:ring-2 focus:ring-[#01abfd]/20`}
                    placeholder="Enter your password"
                  />
                  <span className="absolute left-4 top-3.5 text-[#0189d1]">
                    🔒
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-[#0189d1] hover:text-[#01abfd]"
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#d1ccc0]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-[#0f1f2e]">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Login - FIXED: Now properly passing the handlers */}
              <div className="flex justify-center">
                <GoogleAuth
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  preventRedirect={false}
                />
              </div>

              <p className="text-center text-sm text-[#0f1f2e]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#01abfd] hover:text-[#0189d1] font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
}
