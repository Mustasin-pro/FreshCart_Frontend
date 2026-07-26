import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext"; 
import { useNavigate } from "react-router";

const GoogleLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleGoogleSignIn = async () => {
    setError(""); 
    try {
      const data = await signInWithGoogle();
      
      if (data?.success && data?.token) {
        // Save the generated JWT token to localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful with Google!");
        navigate("/"); 
      }
    } catch (err) {
      console.error("Google Auth Component Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "Google Sign-In failed.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-4 w-full">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4 w-full text-center">
          {error}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="flex items-center justify-center gap-3 w-full bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-300 px-4 py-2.5 rounded-lg shadow-sm transition duration-200"
      >
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default GoogleLogin;