// Inside your component where you render the CheckoutPage
"use client";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutPage from '../Components/Checkout';
import { useEffect, useState } from 'react';
import api from '../api/api';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import router from 'next/router';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(stripePublicKey);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState("");
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const slotId = searchParams.get('slotId');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const token = Cookies.get("accessToken"); // Get token from cookies
    if (!token) {
      router.push("/Login");
      return;
    }
    api.post("/payment/create-pay", { amount: amount })
        .then(response => {
            setClientSecret(response.data.clientSecret);
        })
        .catch(error => {
            console.error("Failed to fetch clientSecret:", error);
        });
  }, []);

  // Render only when clientSecret is available
  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ mode: "payment", amount: Number(amount), currency: 'usd' }}>
      <CheckoutPage amount={Number(amount)} bookingId={Number(bookingId)} slotID={Number(slotId)} />
    </Elements>
  );
}
