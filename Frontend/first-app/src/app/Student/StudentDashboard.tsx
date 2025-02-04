"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import api from "../api/api";
import Cookies from "js-cookie";
import Header from "../Components/Header";
import Image, { StaticImageData } from "next/image";
import logo from "@/asset/logo.png";
import HeroSection from "../Components/HeroSection";
import Football from "@/asset/football.jpg";
import Cricket from "@/asset/cricket.jpg";
import Basketball from "@/asset/basketball.jpg";
import Badminton from "@/asset/badminton.jpeg";
import Volleyball from "@/asset/vollyball.jpg";
import Tennis from "@/asset/tennis.jpg";
import tableTennis from "@/asset/tableTennis.jpg";
import Caram from "@/asset/ceram.jpeg";
import Footer from "../Components/Footer";
import Link from "next/link";
import { set } from "zod";


export default function StudentDashboard() {
  interface Sport {
    id: number;
    name: string;
    image: string;
  }

  const gameImages: { [key: string]: StaticImageData } = {
    football: Football,
    cricket: Cricket,
    basketball: Basketball,
    badminton: Badminton,
    volleyball: Volleyball,
    tennis: Tennis,
    table_tennis: tableTennis,
    caram: Caram,
  };
  
  const [customError, setCustomError] = useState("");
  const [balance, setBalance] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [indoorSports, setIndoorSports] = useState<Sport[]>([]);
  const [outdoorSports, setOutdoorSports] = useState<Sport[]>([]);
  const router = useRouter();

  const goTobookingPage = () => {
    router.push("/Student/Bookings");
  };

  const goToaddBalancePage = () => {
    router.push("/Student/AddBalance");
  };

  const goToProfilePage = () => {
    router.push("/Student/Profile");
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
        setUsername(response.data.name);

        {/*User Balance*/}
         const userBalance = await api.get("/user/balance", {
          headers: {
            Authorization: `Bearer ${token}`,
           },
        });
         setBalance(userBalance.data.balance);
        setLoading(true);
      } catch (error: any) {
        setCustomError(error.response?.data?.message || "Failed to fetch user data.");
      }finally {
        setLoading(false);
      }
    };
  
    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        router.push("/Login");
        return;
      }
      await api.post("/auth/logout", 
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      Cookies.remove("accessToken", { secure: true, sameSite: "Strict" });
      router.push("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          router.push("/Login");
          return;
        }
        setLoading(true);
        // Fetch outdoor sports
        const outdoorRes = await api.get("/user/sports/outdoor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOutdoorSports(outdoorRes.data); // Ensure this is an array

        // Fetch indoor sports
        const indoorRes = await api.get("/user/sports/indoor", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIndoorSports(indoorRes.data);
      } catch (error: any) {
        setCustomError(error.response?.data?.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchSports();
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
        <Header username={username} logout={logout} balance={balance} bookingPageCall={goTobookingPage} addBalancePageCall={goToaddBalancePage} profilePageCall={goToProfilePage}/>
        
        {/* Main content container */}
        <div className="max-w-[1539px] w-full min-h-[1342px] mt-12 ml-5 rounded-[32px] bg-[#000080] text-white flex flex-col items-center px-4 pt-4 lg:mt-[60px] lg:ml-[5px] lg:translate-y-[-50px]">         
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
    
          {/* Outdoor games header */}
          <div className="w-full mb-8 -translate-y-[90px]">
            <header className="w-full h-[49px] rounded-full bg-[#8a8acb] text-white flex items-center px-4 tra">
              <h1 className="text-lg font-semibold">Outdoor Games</h1>
            </header>
          </div>
    
          {/* Outdoor games grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 -translate-y-[90px]">
            {outdoorSports.map((game, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-4">
                <Image
                  src={gameImages[game.name.toLowerCase().replace(/\s+/g, "_")]}
                  alt={game.name}
                  width={400}
                  height={250}
                  className="rounded-lg w-full h-auto"
                />
                <h3 className="mt-4 text-lg font-semibold text-black">{game.name}</h3>
                <Link href={`/Student/Slots/${game.id}`}>
                <button className="mt-2 text-purple-700 hover:bg-purple-300 border border-purple-500 rounded-full px-4 py-2">
                  View Slots
                </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Indoor games header */}
          <div className="w-full mb-8 -translate-y-[90px]">
            <header className="w-full h-[49px] rounded-full bg-[#8a8acb] text-white flex items-center px-4">
              <h1 className="text-lg font-semibold">Indoor Games</h1>
            </header>
            </div>

            {/* Indoor games grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 pb-8 -translate-y-[90px]">
              {indoorSports.map((game, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-4">
                  <Image
                    src={gameImages[game.name.toLowerCase().replace(/\s+/g, "_")]}
                    alt={game.name}
                    width={400}
                    height={250}
                    className="rounded-lg w-full h-auto"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-black">{game.name}</h3>
                  <Link href={`/Student/Slots/${game.id}`}>
                   <button className="mt-2 text-purple-700 hover:bg-purple-300  border border-purple-500 rounded-full px-4 py-2">
                  View Slots
                </button>
                </Link>
                </div>
              ))}
              </div>    
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );

}
