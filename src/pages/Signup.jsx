import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import Navigation from "../components/Navigation/Navigation";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCamera,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const { signup, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFileChange = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        avatar: "Please select a valid image file (JPEG, PNG, or WebP)",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, avatar: "File size must be less than 5MB" });
      return;
    }

    setProfilePhoto(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrors({ ...errors, avatar: "" });

    // Debug: Log file details
    console.log("File selected:", {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    });
  };

  const handleFileInputChange = (e) => {
    handleFileChange(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update your handleSubmit function in the signup component
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name.trim());
      data.append("username", formData.username.trim());
      data.append("email", formData.email.trim());
      data.append("password", formData.password);

      // Append file if selected
      if (profilePhoto) {
        data.append("avatar", profilePhoto);
        console.log("Appending avatar file:", {
          name: profilePhoto.name,
          type: profilePhoto.type,
          size: profilePhoto.size,
        });
      }

      // Use the updated signup function from AuthContext
      const result = await signup(data);

      if (result.success) {
        navigate("/profile");
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        general: "Signup failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPreviewUrl(null);
    if (errors.avatar) setErrors({ ...errors, avatar: "" });
  };

  const passwordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return "Weak";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#01abfd] via-[#eec6d3]/20 to-[#2e8b57]/10 p-4 md:p-8">
      <Navigation />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto mt-20"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#01abfd] to-[#2e8b57] p-8 text-center">
            <motion.h2
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Create Your Account
            </motion.h2>
            <motion.p
              className="text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Join our community today
            </motion.p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* General Error */}
            {errors.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-2"
              >
                <FaTimes className="text-red-500" />
                {errors.general}
              </motion.div>
            )}

            {/* Profile Photo Upload */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700 mb-3">
                Profile Photo (Optional)
              </label>

              <div className="flex flex-col items-center space-y-4">
                {/* Photo Preview */}
                {previewUrl ? (
                  <div className="relative group">
                    <img
                      src={previewUrl}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#01abfd]/20 shadow-lg transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <FaTimes />
                    </button>
                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaCamera className="text-white text-lg" />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#01abfd]/20 to-[#2e8b57]/20 flex items-center justify-center border-2 border-dashed border-[#01abfd]/30 hover:border-[#01abfd] transition-colors duration-300">
                    <FaCamera className="text-[#01abfd]/50 text-2xl" />
                  </div>
                )}

                {/* Drag & Drop Area */}
                <div
                  className={`w-full border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${
                    dragActive
                      ? "border-[#01abfd] bg-[#01abfd]/5 scale-105"
                      : "border-gray-300 hover:border-[#01abfd] hover:bg-[#01abfd]/5"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("avatar-input").click()
                  }
                >
                  <motion.div
                    animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-1 font-medium">
                      {dragActive
                        ? "Drop your photo here!"
                        : "Drag & drop your photo here, or click to browse"}
                    </p>
                    <p className="text-xs text-gray-400">
                      JPEG, PNG, WebP up to 5MB
                    </p>
                  </motion.div>
                </div>

                <input
                  id="avatar-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              {errors.avatar && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-2 bg-red-50 p-2 rounded-lg"
                >
                  <FaTimes className="text-xs" />
                  {errors.avatar}
                </motion.div>
              )}
            </div>

            {/* Form fields remain the same as in the previous response */}
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#01abfd] focus:border-transparent transition-all duration-300 ${
                    errors.name
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {errors.name}
                </motion.div>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">
                Username *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-mono">
                  @
                </span>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#01abfd] focus:border-transparent transition-all duration-300 ${
                    errors.username
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {errors.username}
                </motion.div>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">
                Email Address *
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#01abfd] focus:border-transparent transition-all duration-300 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {errors.email}
                </motion.div>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#01abfd] focus:border-transparent transition-all duration-300 ${
                    errors.password
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength(formData.password) >= level
                            ? getPasswordStrengthColor(
                                passwordStrength(formData.password)
                              )
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    Password strength:{" "}
                    <span className="font-medium">
                      {getPasswordStrengthText(
                        passwordStrength(formData.password)
                      )}
                    </span>
                  </p>
                </div>
              )}

              {errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {errors.password}
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block font-semibold text-gray-700">
                Confirm Password *
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#01abfd] focus:border-transparent transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
                    {formData.password === formData.confirmPassword ? (
                      <FaCheck className="text-green-500 text-sm" />
                    ) : (
                      <FaTimes className="text-red-500 text-sm" />
                    )}
                  </div>
                )}
              </div>
              {errors.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm flex items-center gap-1"
                >
                  <FaTimes className="text-xs" />
                  {errors.confirmPassword}
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#01abfd] to-[#2e8b57] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {/* Button shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-pulse" />

              <span className="relative z-10">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </span>
            </motion.button>

            {/* Sign In Link */}
            <motion.p
              className="text-center text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#01abfd] hover:text-[#2e8b57] font-semibold transition-colors duration-300 hover:underline"
              >
                Sign In
              </Link>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
