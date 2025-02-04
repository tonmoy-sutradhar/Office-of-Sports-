"use client"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TbNumber123 } from "react-icons/tb";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, OTPSchema } from "@/app/Validation/OTPValidation";
import Cookies from "js-cookie";
import Background from "@/app/Components/background";
import Logo from "@/app/Components/logo";
import api from "@/app/api/api";

export default function VerifyOTP() {
  const [customError, setCustomError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
   const router = useRouter();
   const{
    register,
    handleSubmit,
    formState: { errors },}
     = useForm<OTPSchema>({
    resolver: zodResolver(otpSchema),
    });

      const veriyOTP = async(data:OTPSchema) => {
        try{
       const response = await api.post("/auth/verify-otp", data);
        const token = response.data.access_token;
        Cookies.set("accessToken_otp", token, {
          expiresIn: '5m',
          secure: true,
          sameSite: "Strict",
        });
        setSuccessMessage("OTP verified successfully. Please set your new password within 5 minutes.");
        setTimeout(() => {
          setSuccessMessage("");
          router.push("/ForgetPassword/SetPassword"); // Redirect after 5 seconds
        }, 5000);
        } catch (error: any) {
          setCustomError(error.response?.data?.message || "Failed to verify OTP. Please try again.");
        }
      };

  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
        {successMessage && (
        <div
          role="alert"
          className="alert alert-success bg-green-100 text-green-800 p-4 rounded-lg flex items-center shadow-lg w-full max-w-sm mb-4 z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current mr-2"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{successMessage}</span>
        </div>
      )}
        {/* Background Image */}
        <Background />
        {/*Back to ForgetPassword*/}
        <div>
      <button
        onClick={() => router.push("/Login")}
        className="absolute top-4 start-4 text-red-300 font-semibold text-sm"
      >
        Back to login
      </button>
      </div>
      <div className="w-full max-w-sm p-4 rounded-3xl transform scale-250 inset-10 z-50 -translate-y-40">
        {/* Logo of AIUB */}
        <Logo />
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4"
          style={{ paddingTop: "80px" }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit(veriyOTP)}>
            {/* OTP verification */}
            <div>
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
            >
              O T P
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <TbNumber123
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  />
              </div>
              <input
                type="text"
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter OTP"
                {...register("otp")}
              />
            </div>
            {errors.otp && (
              <p className="text-red-500 text-xs -translate-y-4" style={{paddingLeft: "10px"}}>
                {errors.otp.message}
              </p>
            )}
            </div>
            <div className="flex items-center justify-center -translate-y-1.5">
            <button
              type="submit"
              className="w-1/2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
            >
              Verify OTP
            </button>
            </div>
            {/* Custom Error Message */}
            {customError && (
              <p className="text-red-500 text-xs -translate-y-4" style={{paddingLeft: "10px"}}>
                {customError}
              </p>
            )}
          </form>
        </div>
      </div>
      {/* Footer */}
      <footer className="absolute bottom-4 text-center w-full text-sm text-white">
        © 2024 AIUB Office of Sports. All Rights Reserved.
      </footer>
    </div>
  );
}
