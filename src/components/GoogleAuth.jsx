// components/GoogleAuth.jsx
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Context/AuthContext";

export default function GoogleAuth({
  onSuccess,
  onError,
  preventRedirect = false,
}) {
  const { googleLogin } = useAuth();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const result = await googleLogin(decoded);

      if (result.success) {
        // Call the custom onSuccess handler instead of automatic redirect
        onSuccess(result);
      } else {
        onError(result.error || "Google authentication failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      onError("Google authentication failed");
    }
  };

  const handleGoogleError = () => {
    onError("Google authentication failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
      useOneTap={false}
      theme="outline"
      size="large"
      text="continue_with"
      shape="rectangular"
    />
  );
}
