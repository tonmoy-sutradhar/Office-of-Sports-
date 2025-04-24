"use client";
import { useEffect, useState } from "react";
import Footer from "@/app/Components/Footer";
import Image from "next/image";
import logo from "@/app/asset/logo.png";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import api from "@/app/api/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { couponSchema, CouponSchema } from "@/app/Validation/CouponVerify";


export default function AddBalance() {
    const [customError, setCustomError] = useState('');
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

        const HomePageCall = () => {
          router.push("/Student");
        };

    const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm<CouponSchema>({
       resolver: zodResolver(couponSchema),
     });

    const addBalance = async (data: CouponSchema) => {
      try {
        const token = Cookies.get("accessToken"); // Get token from cookies
        if (!token) {
          router.push("/Login");
          return;
        }
        await api.post("/payment/add-balance", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Balance added successfully.");
        setLoading(true);
        setToken(token);
      } catch (error: any) {
        setCustomError(error.response?.data?.message || "Failed to fetch balance. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      // Call addBalance function here if needed
    }, []);

   if (loading) {
    return <span className="loading loading-bars loading-lg flex justify-center items-center h-screen translate-x-[800px]"></span>;
  }

  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
      {customError && (
        <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{customError}</span>
      </div>
      )}
      <header className="max-w-full md:max-w-[1539px] w-full min-h-[49px] mt-4 md:mt-[55px] ml-1 md:ml-[5px] rounded-full bg-[#121262] text-white flex items-center px-4">
      <nav className="flex items-center space-x-4 ml-auto">
        <button onClick={HomePageCall} className="text-lg bg-[#121262] text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">Home</button>
        </nav>
      </header>
        {/* Main content container */}
        <div className="max-w-[1539px] w-full max-h-half mt-12 ml-5 rounded-[32px] bg-[#111165] text-white flex flex-col items-center px-4 pt-4 lg:mt-[60px] lg:ml-[5px] lg:translate-y-[-50px]">         
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
            <span className="font-bold">Recharge your Account Balance</span>
            </h1>
           </div>
           <div className="container mx-auto px-4 pb-10">
             <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border-2 border-blue-300 lg:mt-42">
                <h1 className="text-3xl font-bold text-center text-blue-500 border-b-4 w-[220px] mx-auto mb-6 pt-12">
                    Add Balance
                    </h1>
                <form onSubmit={handleSubmit(addBalance)}>
                    <div>
                        <label
                            htmlFor="coupon"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Coupon</label>
                        <input
                            type="text"
                            id="coupon"
                            {...register("couponCode")}
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300 dark:bg-gray-800 dark:text-black text-black dark:placeholder-gray-500 dark:border-gray-600"
                            placeholder="Enter coupon code"
                        />
                        {errors.couponCode && <p className="text-red-500 text-xs mt-1">{errors.couponCode.message}</p>}
                    </div>
                    <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-primary-500 bg-slate-400 hover:bg-primary-600 text-black rounded-md focus:outline-none focus:ring focus:ring-primary-200 focus:border-primary-500"
                    >
                        Add Balance
                    </button>
                    </div>
                </form>
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