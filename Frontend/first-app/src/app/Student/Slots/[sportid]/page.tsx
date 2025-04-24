"use client";
import { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/app/api/api";
import Cookies from "js-cookie";
import Header from "@/app/Components/Header";
import Image, { StaticImageData } from "next/image";
import logo from "@/app/asset/logo.png";
import HeroSection from "@/app/Components/HeroSection";
import Football from "@/app/asset/football.jpg";
import Cricket from "@/app/asset/cricket.jpg";
import Basketball from "@/app/asset/basketball.jpg";
import Badminton from "@/app/asset/badminton.jpeg";
import Volleyball from "@/app/asset/vollyball.jpg";
import Tennis from "@/app/asset/tennis.jpg";
import tableTennis from "@/app/asset/tableTennis.jpg";
import Caram from "@/app/asset/ceram.jpeg";
import Footer from "@/app/Components/Footer";
import Link from "next/link";
import { toast } from "react-toastify";


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

      const HomePageCall = () => {
        router.push("/Student");
      };

      const bookSlot = async (slotId: number, sportId: number) => {
        try {
          const token = Cookies.get("accessToken"); // Get token from cookies
          if(!token) {
            router.push("/Login");
            return;
          }
          const response = await api.post('bookings/create', {
            slotId,
            sportId
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success("Slot booked successfully.");
        } catch (error: any) {
          toast.error(error.response?.data?.message );
        }
      };
    
      // Fetch data dynamically (replace with your API endpoint if applicable)
      useEffect(() => {
        const fetchSlotInfo = async () => {
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
            setLoading(true);
          } catch (error: any) {
            setCustomError(error.response?.data?.message || "Failed to fetch user data.");
          }
          finally {
            setLoading(false);
          }
        };
      
        fetchSlotInfo();
      }, []);
    

  if (loading) {
    return <span className="loading loading-bars loading-lg flex justify-center items-center h-screen translate-x-[800px]"></span>;
  }

return (
      <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center p-4">
        {/* Header */}
        <header className="max-w-full md:max-w-[1539px] w-full min-h-[49px] mt-4 md:mt-[55px] ml-1 md:ml-[5px] rounded-full bg-[#000080] text-white flex items-center px-4">
        {/*buttons for profile and logout*/}
        <nav className="flex items-center space-x-4 ml-auto">
        <button onClick={HomePageCall} className="text-lg bg-[#000080] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">Home</button>
        </nav>
        </header>
        {/* Main content container */}
        <div className="max-w-[1539px] w-full max-h-half mt-12 ml-5 rounded-[32px] bg-[#000080] text-white flex flex-col items-center px-4 pt-4 lg:mt-[60px] lg:ml-[5px] lg:translate-y-[-50px]">         
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
            <span className="font-bold">Book Your Slot Now</span>
            </h1>
           </div>
           </div> 
        </div>
        {/* Available header */}
        <div className="max-w-[1539px] w-full min-h-half mt-[60px] ml-[20px] rounded-tl-[32px] rounded-tr-[32px] rounded-bl-[32px] rounded-br-[32px] text-white flex flex-col items-center px-4 pt-4 lg:translate-y-[-50px]">
        <div className="container mx-auto px-4 py-5">
        <h1 className="text-2xl font-bold text-black text-center mb-6 translate-x-[-650px]">Available Slots</h1>
        {slots.map((slot) => (
          <div key={slot.id} className=" w-full max-w-[1539px] h-[207px] pt-[32px] bg-slate-50 space-y-4 flex items-center border p-4 mb-4 rounded-3xl hover:shadow-lg">
            <Image className="w-24 h-24 mr-4" src={gameImages[sportid.toString()]} alt={slot.id.toString()} />
            <div className="flex-grow">
            <div className="flex flex-col">
                        {/* Start Time and End Time in one line */}
                        <p className="text-black font-semibold mb-2">
                            Start Time: {slot.start_time} | End Time: {slot.end_time}
                        </p>

                        {/* Date and Members in one line */}
                        <p className="text-black font-semibold mb-2">
                            Date: {slot.date} | Members: {slot.member}
                        </p>
                        </div>
              <button
              onClick={() => bookSlot(slot.id, Number(sportid))}
              className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-3xl">
              Book Slot
            </button>
            </div>
           
          </div>
        ))}
      </div>
        </div>
            {/* Outdoor games header */}
        {/* Footer */}
        <Footer />
      </div>
    );

}
