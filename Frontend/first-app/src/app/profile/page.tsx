"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import profile from "@/asstes/tonmoy.jpg";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";

interface Admin {
  id: number;
  email: string;
  profilePicture?: string | null;
}

export default function AdminProfile() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/admin/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setAdmin(response.data);
      } catch (error) {
        setError("Failed to fetch admin profile");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!admin) {
    return <div className="text-gray-500 text-center mt-10">No data found</div>;
  }

  // Logout---------------------------------->>

  const handleLogout = async () => {
    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }

      // Remove token and redirect
      Cookies.remove("accessToken");
      toast.success("Logout successful");
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Logout error:", error.message);
      } else {
        console.error("Logout error: An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="container mx-auto px-4 pb-10">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border-2 border-blue-300">
          <h1 className="text-3xl font-bold text-center text-blue-500 border-b-4 w-[220px] mx-auto mb-6">
            Admin Profile
          </h1>
          <div className="flex flex-col items-center">
            {admin.profilePicture ? (
              <Image
                src={admin.profilePicture}
                alt="Admin Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-blue-500"
              />
            ) : (
              <Image
                src={profile}
                alt="Default Admin Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-blue-500"
              />
            )}
            <p className="text-lg font-medium mt-4 text-gray-700">
              <strong>Email:</strong>{" "}
              <span className="text-blue-500">{admin.email}</span>
            </p>

            <Link
              href={"/changepassword"}
              className="text-sm text-start text-blue-500 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-2 py-1 transition-colors cursor-pointer"
            >
              Change password?
            </Link>

            <div>
              <button
                onClick={handleLogout}
                className="px-3 rounded-xl text-white bg-red-500 mt-3"
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
