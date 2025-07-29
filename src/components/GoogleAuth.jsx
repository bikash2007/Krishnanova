import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // <-- fixed!
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const GoogleAuth = ({ onSuccess, onError }) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("No credential returned from Google");
      }
      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential);
      // console.log("Decoded Google user:", decoded);

      const result = await googleLogin(decoded);

      if (result.success) {
        if (onSuccess) onSuccess(result);
        navigate(result.isAdmin ? "/admin/dashboard" : "/profile");
      } else {
        if (onError) onError(result.error);
      }
    } catch (error) {
      console.error("Google login error:", error);
      if (onError) onError("Google authentication failed");
    }
  };

  const handleGoogleError = () => {
    if (onError) onError("Google login failed");
  };

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="pill"
      />
    </div>
  );
};

export default GoogleAuth;
