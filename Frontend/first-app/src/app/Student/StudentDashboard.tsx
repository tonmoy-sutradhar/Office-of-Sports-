"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../api/api";
import Cookies from "js-cookie";

export default function StudentDashboard() {
  const [customError, setCustomError] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies
        if(!token) {
          // Redirect to login page if token is not found
          router.push("/Login");
          return;
        }

        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
        setUsername(response.data.name);
      } catch (error: any) {
        setCustomError(error.response?.data?.message || "Failed to fetch user data.");
      }
    };
  
    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      // Get the token from the cookies
      const token = Cookies.get("accessToken");

      // Send request to backend API to log out
      await api.post(
        "/auth/logout", 
        {}, // Body is empty for a logout request
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      // Clear the token from cookies after successful logout
      Cookies.remove("accessToken", { secure: true, sameSite: "Strict" });

      // Redirect to login page
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url('https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp')",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          {/* Display Username or Error */}
          <h1 className="mb-5 text-5xl font-bold">
            {username ? `Hello there, ${username}` : "Hello there!"}
          </h1>
          {customError && <p className="text-red-500">{customError}</p>}
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button onClick={logout} className="btn btn-primary">Logout</button>
        </div>
      </div>
    </div>
  );
}
