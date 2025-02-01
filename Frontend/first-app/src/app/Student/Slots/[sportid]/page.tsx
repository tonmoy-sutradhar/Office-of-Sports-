"use client";
import { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/api";
import Cookies from "js-cookie";
import Header from "@/app/Components/Header";
import Image, { StaticImageData } from "next/image";
import logo from "@/asset/logo.png";
import HeroSection from "@/app/Components/HeroSection";
import Football from "@/asset/football.jpg";
import Cricket from "@/asset/cricket.jpg";
import Basketball from "@/asset/basketball.jpg";
import Badminton from "@/asset/badminton.jpeg";
import Volleyball from "@/asset/vollyball.jpg";
import Tennis from "@/asset/tennis.jpg";
import tableTennis from "@/asset/tableTennis.jpg";
import Caram from "@/asset/ceram.jpeg";
import Footer from "@/app/Components/Footer";
import Link from "next/link";


export default function Slot() {
    interface Slot {
        id: number;
        sport_id: number;
        start_time: string;
        end_time: string;
        member: number;
        date: string;
        }
    
      const gameImages: { [key: string]: StaticImageData } = {
        '3': Football,
        '5': Cricket,
        '2': Basketball,
        '4': Badminton,
        '6': Volleyball,
        '1': Tennis,
        '7': tableTennis,
        '11': Caram,
      };
      const { sportid = 'defaultSportId' } = useParams();
      const [loading, setLoading] = useState(false);
      const [slots, setSlots] = useState<Slot[]>([]);
      const [customError, setCustomError] = useState('');
      const router = useRouter();
    
      // Fetch data dynamically (replace with your API endpoint if applicable)
      useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            const token = Cookies.get("accessToken"); // Get token from cookies
            if(!token) {
              router.push("/Login");
              return;
            }
            const response = await api.get(`slots/available/${sportid}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setSlots(response.data);
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
      <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center p-4">
        {/* Header */}
        <header className="w-[1539px] min-h-[49px] mt-[55px] ml-[20px] rounded-full bg-[#000080] text-white flex items-center px-4">
        {/*buttons for profile and logout*/}
        <nav className="flex items-center space-x-4 ml-auto">
        <button className="text-lg bg-[#000080] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">Home</button>
        <button className=" text-lg bg-[#000080] text-white px-4 py-2 rounded-lg font-semibold">Profile</button>
        </nav>
        </header>
        {/* Main content container */}
        <div className="w-[1539px] min-h-[1342px] mt-[60px] ml-[20px] rounded-tl-[32px] rounded-tr-[32px] rounded-bl-[32px] rounded-br-[32px] bg-[#000080] text-white flex flex-col items-center px-4 pt-4 -translate-y-[50px]">         
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
            <HeroSection />
          </div>

              
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );

}
