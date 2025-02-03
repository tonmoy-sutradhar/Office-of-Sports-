"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Totalcount = () => {
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalSports, setTotalSports] = useState<number>(0);
  const [totalSlots, setTotalSlots] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        // Fetch Total Students
        const studentResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/search/students`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setTotalStudents(studentResponse.data.length);

        // Fetch Total Sports
        const sportsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/sports/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setTotalSports(sportsResponse.data.length);

        // Fetch Total Slots
        const slotsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/slots`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setTotalSlots(slotsResponse.data.length);
      } catch (error) {
        console.error("Error fetching total counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 mb-8 px-4 -mt-5">
      <div className="bg-teal-500 text-white text-center py-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold">0{totalStudents}</h2>
        <p className="text-lg">Total Students</p>
      </div>
      <div className="bg-blue-500 text-white text-center py-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold">0{totalSports}</h2>
        <p className="text-lg">Total Sports</p>
      </div>
      <div className="bg-pink-500 text-white text-center py-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold">0{totalSlots}</h2>
        <p className="text-lg">Total Slots</p>
      </div>
    </div>
  );
};

export default Totalcount;
