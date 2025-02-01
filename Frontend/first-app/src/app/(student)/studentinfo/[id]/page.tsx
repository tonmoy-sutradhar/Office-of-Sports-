"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

interface Student {
  id: string;
  university_id: string;
  email: string;
  isBanned: boolean;
  balance: number;
}

export default function Page() {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudent = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/search/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
            withCredentials: true, // Ensure cookies are sent
          }
        );

        setStudent(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch student details");
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

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

  if (!student) {
    return <div className="text-gray-500 text-center mt-10">No data found</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="container mx-auto px-4 pb-14 ">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-500 border-b-4 w-[300px] mx-auto">
          STUDENT DETAILS
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6  border-2 border-blue-200 max-w-lg mx-auto ">
          <div className="text-start mb-4 ml-5">
            <p className="text-gray-700 font-medium">
              University ID: {student.university_id}
            </p>
          </div>
          <div className="text-start mb-4 ml-5">
            <p className="text-gray-700 font-medium">Email: {student.email}</p>
          </div>
          <div className="text-start mb-4 ml-5">
            <p className="text-gray-700 font-medium">
              Banned:{" "}
              <span
                className={`text-lg font-semibold ${
                  student.isBanned ? "text-red-500" : "text-green-500"
                }`}
              >
                {student.isBanned ? "Yes" : "No"}
              </span>
            </p>
          </div>
          <div className="text-start ml-5">
            <p className="text-gray-700 font-medium">
              Balance: $ {student.balance}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
