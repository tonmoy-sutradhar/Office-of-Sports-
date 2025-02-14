import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import api from "../api/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface check{
  bookingId: number; 
  slotID: number; 
  amount: number
}

export default function CheckoutPage({ bookingId, slotID, amount }:check){
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);  // Start with loading true
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Get token from cookies
    if (!token) {
      router.push("/Login");
      return;
    }
    setToken(token);

    api.post("/payment/create-pay",  {amount: amount })
      .then(response => {
        setClientSecret(response.data.clientSecret);
        setLoading(false);  // Set loading to false after fetching clientSecret
      })
      .catch(error => {
        console.error("Failed to fetch clientSecret:", error);
        setErrorMessage(error.message || "Failed to process payment. Please try again.");
        setLoading(false);
      });
  }, [amount]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!stripe || !elements) {
      return;  // Ensure stripe and elements are loaded
    }

    // Payment was successful
    try {
      const token = Cookies.get("accessToken");
      const response = await api.post('/payment/deduct-balance', {
          bookingId,
          slotID,
      }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      toast.success("Payment successful!");
      router.push("/Student/Bookings");
  } catch (error: any) {
      toast.error(error.response?.data?.message);
  }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex items-center justify-center">Loading...</div>;  // Display loading state until clientSecret is ready
  }

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      {/*back to Bookings*/}
      <div>
      <button
        onClick={() => router.push("/Student/Bookings")}
        className="absolute top-4 start-4 text-red-400 font-semibold text-sm"
      >
        Back
      </button>
      </div>
    <div className="bg-white p-4 rounded-md">
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
    </div>
    </div>
  );
};
