"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

interface Sport {
  id: number;
  name: string;
  type: "outdoor" | "indoor";
  price: number;
  maxPlayers: number;
  is_paid: boolean;
  feedbackCount: number;
  averageRating: number;
}

const ViewSportsPage = () => {
  const [sports, setSports] = useState<Sport[]>([]);

  // --------------------------Fetch all sports data from the Database-----------------------------
  useEffect(() => {
    const fetchSports = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get<Sport[]>(
          `${process.env.NEXT_PUBLIC_API}/sports`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
            withCredentials: true, // Ensure cookies are sent
          }
        );

        setSports(response.data);
      } catch (error) {
        console.error("Error fetching sports data:", error);
      }
    };

    fetchSports();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="bg-white py-14 -mt-28">
        <div className="container mx-auto p-4">
          <h1 className="text-4xl mt-3 border-b-4 w-[280px] mx-auto font-bold mb-4 text-center text-blue-500">
            View All Sports
          </h1>
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Id
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Name
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Type
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left">
                    Max Players
                  </th>
                </tr>
              </thead>
              <tbody>
                {sports.map((sport, index) => (
                  <tr
                    key={sport.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50`}
                  >
                    <td className="border border-gray-300 px-4 py-3">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {sport.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {sport.type}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {sport.price}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      {sport.maxPlayers}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewSportsPage;
