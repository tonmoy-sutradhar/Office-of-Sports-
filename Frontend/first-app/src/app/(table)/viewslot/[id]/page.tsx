"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

interface Slot {
  id: number;
  start_time: string;
  end_time: string;
  date: string;
}

export default function UpdateSlot() {
  const { id } = useParams(); // Fetch slot ID from the URL params
  const router = useRouter();

  const [slot, setSlot] = useState<Slot | null>(null);
  const [formData, setFormData] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch slot details by ID
  useEffect(() => {
    const fetchSlot = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/slots/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
          }
        );
        setSlot(response.data);
        setFormData({
          date: response.data.date,
          start_time: response.data.start_time,
          end_time: response.data.end_time,
        });
      } catch (err) {
        setError("Failed to fetch slot details");
      }
    };

    fetchSlot();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("accessToken"); // Get token from cookies
      console.log(token);

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      await axios.put(`${process.env.NEXT_PUBLIC_API}/slots/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      toast.success("Slot updated successfully!");
      router.push("/viewslot"); // Navigate back to the slots list
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update slot");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!slot) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>{" "}
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border-2 border-blue-300">
          <h1 className="text-3xl font-bold text-center text-blue-500 border-b-4 w-[220px] mx-auto mb-6">
            Update Slot
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Input */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            {/* Start Time Input */}
            <div>
              <label
                htmlFor="start_time"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            {/* End Time Input */}
            <div>
              <label
                htmlFor="end_time"
                className="block text-sm font-medium text-gray-700"
              >
                End Time
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Slot"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
