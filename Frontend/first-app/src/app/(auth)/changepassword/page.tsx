"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

export default function page() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/admin/change-password`,
        { newPassword },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("Admin_token="))
                ?.split("=")[1]
            }`,
          },
        }
      );
      toast.success("Password change successfully!");

      setMessage(response.data.message);
      setNewPassword("");
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="flex items-center justify-center  bg-white pb-24">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border-2 border-blue-500 ">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Change Password
          </h2>
          {message && <p className="text-green-600 text-center">{message}</p>}
          {error && <p className="text-red-600 text-center">{error}</p>}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
