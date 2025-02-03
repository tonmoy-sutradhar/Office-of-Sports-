"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Logout failed");
      }

      // Remove token and redirect
      Cookies.remove("accessToken");
      toast.success("Logout successful");
      router.push("/loginAdmin");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Logout error:", error.message);
      } else {
        console.error("Logout error: An unknown error occurred");
      }
    }
  };

  return (
    <div className="navbar bg-white px-4">
      <div className="navbar-start">
        <div className="dropdown text-black">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm font-bold dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/admindashboard">Home</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <Link
          href="/admindashboard"
          className="btn btn-ghost text-xl text-blue-500"
        >
          Office of Sports - AIUB
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu font-bold menu-horizontal px-1 text-black">
          <li>
            <Link href="/admindashboard">Home</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
