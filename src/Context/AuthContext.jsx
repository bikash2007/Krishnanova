import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Save user data to localStorage
  const saveUserToStorage = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("userEmail", userData.email);
    localStorage.setItem("userName", userData.name);
    localStorage.setItem("userUsername", userData.username);
    if (userData.avatar) {
      localStorage.setItem("userAvatar", userData.avatar);
    }
  };

  // Load user data from localStorage
  const loadUserFromStorage = () => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error loading user from storage:", error);
      return null;
    }
  };

  // Clear user data from localStorage
  const clearUserFromStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userUsername");
    localStorage.removeItem("userAvatar");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = loadUserFromStorage();

    if (token && storedUser) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(storedUser);
      setLoading(false);
    } else if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`);
      const userData = response.data;
      setUser(userData);
      saveUserToStorage(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      clearUserFromStorage();
      delete axios.defaults.headers.common["Authorization"];
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/login`, {
        identifier,
        password,
      });

      const { token, ...userData } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      saveUserToStorage(userData);

      return { success: true, isAdmin: userData.role === "admin" };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signup = async (formData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token, ...userData } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      saveUserToStorage(userData);

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Google authentication
  const googleLogin = async (googleUser) => {
    try {
      setError(null);

      const userData = {
        googleId: googleUser.sub || googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        avatar: googleUser.picture || null,
      };

      console.log("Sending Google user data:", userData);

      const response = await axios.post(`${API_URL}/auth/google`, userData);
      const { token, ...userInfo } = response.data;

      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userInfo);
      saveUserToStorage(userInfo);

      return { success: true, isAdmin: userInfo.role === "admin" };
    } catch (error) {
      console.error("Google login error:", error);
      const errorMessage =
        error.response?.data?.message || "Google authentication failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    saveUserToStorage(updatedUserData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    clearUserFromStorage();
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    setUser: updateUser,
    loading,
    error,
    login,
    signup,
    googleLogin, // Add Google login function
    logout,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
