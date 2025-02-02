"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    type: "outdoor",
    price: 0,
    maxPlayers: 0,
    is_paid: false,
  });

  console.log(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [target.name]:
        target.type === "checkbox"
          ? (target as HTMLInputElement).checked // Explicitly cast to HTMLInputElement
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

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/sports`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      toast.success("Sport created successfully!");
      router.push("/viewsports");
      setFormData({
        name: "",
        type: "outdoor",
        price: 0,
        maxPlayers: 0,
        is_paid: false,
      });
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <div className="bg-white py-14 -mt-28">
        <div className="max-w-6xl mx-auto p-6 border-2 border-blue-500 bg-white shadow-lg rounded-xl mt-10">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">
            CREATE A SPORT
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Sport Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg bg-white focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium">
                Sport Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 bg-white rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor</option>
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 bg-white py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="maxPlayers" className="block text-sm font-medium">
                Max Players
              </label>
              <input
                type="number"
                id="maxPlayers"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_paid"
                name="is_paid"
                checked={formData.is_paid}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 bg-white focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="is_paid"
                className="ml-2 bg-white block text-sm font-medium"
              >
                Is Paid
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600  text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Create Sport
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
