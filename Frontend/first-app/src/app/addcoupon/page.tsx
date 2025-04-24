"use client";

import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

export default function AddCoupon() {
  const [formData, setFormData] = useState({
    coupon: "",
    value: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      // POST request to add a coupon
      await axios.post(
        `${process.env.NEXT_PUBLIC_API}/admin/coupon`,
        {
          coupon: formData.coupon,
          value: Number(formData.value), // Ensure value is a number
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        }
      );

      toast.success("Coupon added successfully!");
      setFormData({ coupon: "", value: "" }); // Clear the form
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="container mx-auto px-4 pb-10">
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border-2 border-blue-300">
          <h1 className="text-3xl font-bold text-center text-blue-500 border-b-4 w-[220px] mx-auto mb-6">
            Add Coupon
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Coupon Code Input */}
            <div>
              <label
                htmlFor="coupon"
                className="block text-sm font-medium text-gray-700"
              >
                Coupon Code
              </label>
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 bg-white border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            {/* Coupon Value Input */}
            {/* <div>
          <label
            htmlFor="value"
            className="block text-sm font-medium text-gray-700"
          >
            Coupon Value
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? "Adding Coupon..." : "Add Coupon"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
