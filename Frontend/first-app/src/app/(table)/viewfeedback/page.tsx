"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

interface Feedback {
  id: number;
  comment: string;
  rating: number;
  student: {
    name: string;
    university_id: string;
  } | null;
  sport: {
    name: string;
  } | null;
}

export default function Page() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/feedbacks`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
            withCredentials: true, // Ensure cookies are sent
          }
        );

        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feedback:", error);
        setError("Failed to fetch feedback");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading)
    return (
      <div className="text-center text-lg text-gray-600 mt-6">Loading...</div>
    );
  if (error)
    return <div className="text-red-500 text-center text-lg mt-6">{error}</div>;

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          All Feedback
        </h1>

        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full border border-gray-300 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white uppercase text-sm leading-normal">
                <th className="py-4 px-6 text-center font-semibold">
                  University ID
                </th>
                <th className="border border-gray-300 py-4 px-6 text-center font-semibold">
                  Sport
                </th>
                <th className="border border-gray-300 py-4 px-6 text-center font-semibold">
                  Comment
                </th>
                <th className="border border-gray-300 py-4 px-6 text-center font-semibold">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {feedbacks.map((feedback, index) => (
                <tr
                  key={feedback.id}
                  className={`border-b border-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-100 transition duration-200`}
                >
                  <td className="border border-gray-300 text-center py-4 px-6">
                    {feedback.student?.university_id || "N/A"}
                  </td>
                  <td className="border text-center border-gray-300 py-4 px-6">
                    {feedback.sport?.name || "N/A"}
                  </td>
                  <td className="border text-center border-gray-300 py-4 px-6">
                    {feedback.comment}
                  </td>
                  <td className="border text-center border-gray-300 py-4 px-6 font-semibold text-yellow-500">
                    {feedback.rating} ⭐
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
