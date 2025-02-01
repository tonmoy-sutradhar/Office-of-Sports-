"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../api/api";
import Cookies from "js-cookie";
import Header from "../Components/Header";
import Image from "next/image";
import logo from "@/asset/logo.png";

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
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center p-4">
      {/* Header */}
      <Header username={username} logout={logout} />
      {/* Main content */}
      <div className="w-[1539px] h-[1342px] mt-[60px] ml-[20px] rounded-tl-[32px] rounded-tr-[32px] bg-[#000080] text-white flex items-center px-4 -translate-y-[50px]">
        {/*logo */}
        <Image src={logo} alt="AIUB Office of Sports" width={250} height={130} className="flex items-center justify-center transform scale-150 ml-[650px] pt-[183px] -translate-y-[800px] " />
      </div>

  </div>
    );
}
