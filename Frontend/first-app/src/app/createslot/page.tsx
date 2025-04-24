"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Navbar from "@/app/Components/Navbar";
import Banner from "@/app/Components/Banner";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sport_id: "",
    date: "",
    start_time: "",
    end_time: "",
    member: 0, // Default value for member
    is_booked: false, // Default value for is_booked
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked // Narrowing the type for `checked`
          : target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const requestData = {
        ...formData,
        sport: {
          id: formData.sport_id,
        },
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/slots`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      toast.success("Slot created successfully!");
      router.push("/viewslot");
      setFormData({
        sport_id: "",
        date: "",
        start_time: "",
        end_time: "",
        member: 0,
        is_booked: false,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="bg-white py-14 -mt-28">
        <div className="max-w-6xl border-2 border-blue-500 mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
            CREATE A SLOT
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="sport_id" className="block text-sm font-medium">
                Sport ID
              </label>
              <input
                type="text"
                id="sport_id"
                name="sport_id"
                value={formData.sport_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <div className="-mt-9 ml-[1055px] cursor-pointer">
                <h1>⏱</h1>
              </div>
            </div>

            <div>
              <label htmlFor="start_time" className="block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <div className="-mt-9 ml-[1055px] cursor-pointer">
                <h1>⏱</h1>
              </div>
            </div>

            <div>
              <label htmlFor="end_time" className="block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
              <div className="-mt-9 ml-[1055px] cursor-pointer">
                <h1>⏱</h1>
              </div>
            </div>

            <div>
              <label htmlFor="member" className="block text-sm font-medium">
                Members
              </label>
              <input
                type="number"
                id="member"
                name="member"
                value={formData.member}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_booked"
                name="is_booked"
                checked={formData.is_booked}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 bg-white focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="is_booked"
                className="ml-2 bg-white block text-sm font-medium"
              >
                Is Booked
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Create Slot
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
