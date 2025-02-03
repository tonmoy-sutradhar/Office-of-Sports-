"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/app/api/api";
import Cookies from "js-cookie";
import Image, { StaticImageData } from "next/image";
import logo from "@/asset/logo.png";
import Football from "@/asset/football.jpg";
import Cricket from "@/asset/cricket.jpg";
import Basketball from "@/asset/basketball.jpg";
import Badminton from "@/asset/badminton.jpeg";
import Volleyball from "@/asset/vollyball.jpg";
import Tennis from "@/asset/tennis.jpg";
import tableTennis from "@/asset/tableTennis.jpg";
import Caram from "@/asset/ceram.jpeg";
import Footer from "@/app/Components/Footer";
import { Feedback } from "@/app/Components/FeedBack";


export default function ViewBookings() {

    interface Bookings {
        booking_id: number;
        slot_id: number;
        sport_id: number;
        date: string;
        start_time: string;
        end_time:string;
        payment_status: string;
        status: string;
        member: number;
        game_name: string;
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
      const [loading, setLoading] = useState(false);
      const [bookings, setBookings] = useState<Bookings[]>([]);
      const [customError, setCustomError] = useState('');
      const router = useRouter();

      const HomePageCall = () => {
        router.push("/Student");
      };

      const cencelBooking = async (bookingId: number) => {
        try {
          const token = Cookies.get("accessToken"); // Get token from cookies
          if(!token) {
            router.push("/Login");
            return;
          }
          await api.delete(`/bookings/cancel/${bookingId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          alert("Booking cancelled successfully.");
            setLoading(true);
        } catch (error: any) {
          setCustomError(error.response?.data?.message || "Failed to cancel booking. Please try again.");
        }finally {
          setLoading(false);
        };
      };

        const completeBooking = async (bookingId: number, slotID: number, amount=50) => {
            try {
              const token = Cookies.get("accessToken"); // Get token from cookies
              if(!token) {
                router.push("/Login");
                return;
              }
              await api.post('/payment/deduct-balance', {
                bookingId,
                slotID,
                amount,
              }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              alert("Booking completed successfully.");
              setLoading(true);
            } catch (error: any) {
              setCustomError(error.response?.data?.message || "Failed to complete booking. Please try again.");
            }
            finally {
              setLoading(false);    
            };
        };

        useEffect(() => {
            const fetchBookings = async () => {
            try {
                const token = Cookies.get("accessToken"); // Get token from cookies
                if(!token) {
                router.push("/Login");
                return;
                }
                const response = await api.post("/user/sports/bookings",{}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true
                });
                setLoading(true);
                setBookings(response.data);
            } catch (error: any) {
                setCustomError(error.response?.data?.message || "Failed to fetch bookings. Please try again.");
            } finally {
                setLoading(false);
            }
            };
            fetchBookings();
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
        {bookings.map((booking) => (
          <div key={booking.booking_id} className=" w-full max-w-[1539px] h-[207px] pt-[32px] bg-slate-50 space-y-4 flex items-center border p-4 mb-4 rounded-3xl hover:shadow-lg">
            <Image className="w-24 h-24 mr-4" src={gameImages[booking.game_name.toLowerCase().replace(/\s+/g, "_")]} alt={booking.booking_id.toString()} />
            <div className="flex-grow">
                <h1 className="text-2xl font-bold text-black">{booking.game_name}</h1>
            <div className="flex flex-col">
                        {/* Start Time and End Time in one line */}
                        <p className="text-black font-semibold mb-2">
                            Start Time: {booking.start_time} | End Time: {booking.end_time}
                        </p>

                        {/* Date and Members in one line */}
                        <p className="text-black font-semibold mb-2">
                             Date: {booking.date.toString().split('T')[0]} | Members: {booking.member}
                        </p>
                        </div>
                        {booking.payment_status.toLowerCase() === "unpaid" ? (
            <div>
                <button className="bg-black hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-3xl mr-2 " onClick={() => completeBooking(booking.booking_id, booking.slot_id)}>
                    Pay
                </button>
                <button className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded-3xl" onClick={() => cencelBooking(booking.booking_id)}>
                    Cancel
                </button>
            </div>
        ) : (
             <Feedback bookingId={booking.sport_id}/>
         
        )}
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
