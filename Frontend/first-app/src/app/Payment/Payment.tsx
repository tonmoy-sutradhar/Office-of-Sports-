"use client";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "../Components/Checkout";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../api/api";
import Cookies from "js-cookie";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [clientSecret, setClientSecret] = useState("");

  const bookingId = Number(searchParams.get("bookingId"));
  const slotId = Number(searchParams.get("slotID"));
  const amount = Number(searchParams.get("amount"));

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      router.push("/Login");
      return;
    }

    api.post("/payment/create-pay", { amount })
      .then((response) => setClientSecret(response.data.clientSecret))
      .catch((error) => console.error("Failed to fetch clientSecret:", error));
  }, [amount]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutPage bookingId={bookingId} slotID={slotId} amount={amount} />
    </Elements>
  );
}
