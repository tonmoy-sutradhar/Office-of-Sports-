"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie"; // Import Cookies
import { toast } from "react-toastify";
import Link from "next/link";
import Banner from "@/app/Components/Banner";
import Navbar from "@/app/Components/Navbar";

interface Sport {
  id: number;
  name: string;
}

interface Slot {
  id: number;
  start_time: string;
  end_time: string;
  date: string;
  member: number;
  is_booked: boolean;
  sport: Sport;
}

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

  // Fetch slots with Authorization header
  const {
    data: slots,
    isLoading,
    isError,
    refetch,
  } = useQuery<Slot[]>({
    queryKey: ["slots"],
    queryFn: async (): Promise<Slot[]> => {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/slots`, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
        withCredentials: true, // Ensure cookies are sent
      });

      return response.data;
    },
  });

  const handleDeleteConfirmation = (id: number) => {
    setSelectedSlotId(id);
    setIsModalOpen(true);
  };

  // Delete slot with Authorization header
  const confirmDelete = async () => {
    try {
      if (selectedSlotId !== null) {
        const token = Cookies.get("accessToken"); // Get token

        if (!token) {
          throw new Error("Unauthorized: No token found");
        }

        await axios.delete(
          `${process.env.NEXT_PUBLIC_API}/slots/${selectedSlotId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token
            },
            withCredentials: true,
          }
        );
        toast.success("Slot delete successfully!");
        refetch();
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
    } finally {
      setIsModalOpen(false);
      setSelectedSlotId(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setSelectedSlotId(null);
  };

  const handleUpdate = (id: number) => {
    console.log("Update slot with ID:", id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load data.</div>;

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="p-8 py-14 -mt-20">
        <h1 className="text-4xl font-bold mb-6 text-center border-b-4 w-[220px] mx-auto">
          ALL SLOTS
        </h1>
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full table-auto bg-white border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  ID
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  Start Time
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  End Time
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  Date
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  Members
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  Is Booked
                </th>
                <th className="border border-gray-200 px-4 py-3 text-left font-medium">
                  Sport
                </th>
                <th className="border border-gray-200 px-4 py-3 text-center font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {slots?.map((slot, index) => (
                <tr
                  key={slot.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  {/* <td className="border border-gray-200 px-4 py-3">{slot.id}</td> */}
                  <td className="border border-gray-200 px-4 py-3">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.start_time}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.end_time}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.date}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.member}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.is_booked ? (
                      <span className="px-2 py-1 text-xs font-semibold bg-green-200 text-green-800 rounded">
                        Yes
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold bg-red-200 text-red-800 rounded">
                        No
                      </span>
                    )}
                  </td>
                  <td className="border border-gray-200 px-4 py-3">
                    {slot.sport.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-3 text-center space-x-2">
                    <Link href={`/viewslot/${slot.id}`}>
                      {" "}
                      <button
                        // onClick={() => handleUpdate(slot.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                        Update
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteConfirmation(slot.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="mb-6">Are you sure you want to delete this slot?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={cancelDelete}
                  className="px-5 py-2 bg-green-300 text-gray-800 rounded-xl hover:bg-gray-400"
                >
                  No
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5  bg-red-500 text-white rounded-xl hover:bg-red-600"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
