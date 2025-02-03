"use client";
import { useEffect, useState } from "react";
import Footer from "@/app/Components/Footer";
import Image from "next/image";
import logo from "@/asset/logo.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "@/app/api/api";
import profile from "@/asset/profileImg.png";
import Link from "next/link";


export default function StudentInfo() {
    interface User {
        id: number;
        name: string;
        universityId: string;
        email: string;
        phone_number: string;
        profilePicture: string;
      }
    
      const [customError, setCustomError] = useState('');
      const [user, setUser] = useState<User>();
      const [loading, setLoading] = useState(false);
      const router = useRouter();

      const HomePageCall = () => {
        router.push("/Student");
      };

      const handleLogout = async () => {
        try {
          const token = Cookies.get("accessToken"); // Get token from cookies
          if (!token) {
            router.push("/Login");
            return;
          }
          await api.post("/auth/logout", {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Cookies.remove("accessToken");
          router.push("/Login");
        } catch (error: any) {
          setCustomError(error.response?.data?.message || "Failed to logout. Please try again.");
        }
      };

    
      // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies
        if(!token) {
          router.push("/Login");
          return;
        }
        const response = await api.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);

      } catch (error: any) {
        setCustomError(error.response?.data?.message || "Failed to fetch user data.");
      }
    };
  
    fetchUserProfile();
  }, []);

   if (loading) {
    return <span className="loading loading-bars loading-lg flex justify-center items-center h-screen translate-x-[800px]"></span>;
  }
  if (customError) {
    return <p>{customError}</p>;
  }

  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
    <header className="max-w-full md:max-w-[1539px] w-full min-h-[49px] mt-4 md:mt-[55px] ml-1 md:ml-[5px] rounded-full bg-[#121262] text-white flex items-center px-4">
        {/*buttons for profile and logout*/}
        <nav className="flex items-center space-x-4 ml-auto">
        <button onClick={HomePageCall} className="text-lg bg-[#121262] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">Home</button>
        </nav>
        </header>
        {/* Main content container */}
        <div className="max-w-[1539px] w-full max-h-half mt-12 ml-5 rounded-[32px] bg-[#121262] text-white flex flex-col items-center px-4 pt-4 lg:mt-[60px] lg:ml-[5px] lg:translate-y-[-50px]">         
          {/* Logo */}
          <div className="w-full flex justify-center translate-y-[-55px] ">
            <Image
              src={logo}
              alt="AIUB Office of Sports"
              width={250}
              height={130}
              className="scale-150"
            />
          </div>
    
          {/* Hero Section */}
          <div className="-translate-y-[90px] translate-x-[5px]">
          <div className="bg-gradient-to-b text-white py-16 text-center">
            {/* Heading */}
            <h1 className="text-[35px] font-extrabold leading-[72px]">
            <span className="font-bold">Profile</span>
            </h1>
           </div>
           <div className="container mx-auto px-4 pb-10">
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 border-2 border-blue-300">
          <div className="flex flex-col items-center">
            {user?.profilePicture ? (
              <Image
                src={user.profilePicture}
                alt="Admin Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-blue-500"
              />
            ) : (
              <Image
                src={profile}
                alt="Default Admin Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-blue-500"
              />
            )}
            <p className="text-lg font-semibold mt-4 text-gray-700">
                <strong>Name:</strong>{" "}
                <span className="text-blue-500">{user?.name}</span>
            </p>
            <p className="text-lg font-medium mt-4 text-gray-700">
              <strong>Email:</strong>{" "}
              <span className="text-blue-500">{user?.email}</span>
            </p>
            <p className="text-lg font-medium mt-4 text-gray-700">
              <strong>Contact Number:</strong>{" "}
              <span className="text-blue-500">{user?.phone_number}</span>
            </p>

            <Link
              href={"/Student/ChangePassword"}
              className="text-sm text-start text-blue-500 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-2 py-1 transition-colors cursor-pointer"
            >
              Change password?
            </Link>

            <div>
              <button
                onClick={handleLogout}
                className="px-3 rounded-xl text-white bg-red-500 mt-3"
              >
                LogOut
              </button>
            </div>
          </div>
        </div>
      </div>
          
      </div>
        </div>
        
            {/* Outdoor games header */}
        {/* Footer */}
        <Footer />
      </div>
  );
}