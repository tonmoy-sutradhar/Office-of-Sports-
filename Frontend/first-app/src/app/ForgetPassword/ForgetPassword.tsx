"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, EmailSchema } from "../Validation/EmailValidation";
import Background from "../Components/background";
import Logo from "../Components/logo";
import api from "../api/api";


export default function ForgetPassword() {
  const [customError, setCustomError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for the success message
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const sentmail = async (data: EmailSchema) => {
    try {
      await api.post("/auth/forget-password", data);
      setSuccessMessage("Email sent successfully. Please check your inbox.")
      // Optional: Automatically hide the success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
        router.push("/ForgetPassword/VerifyOTP"); // Redirect after 5 seconds
      }, 5000);
    } catch (error: any) {
      setCustomError(
        error.response?.data?.message || "Failed to send email. Please try again."
      );
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4 relative">
      {/* Success Message */}
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
      {/* Back button to login */}
      <div>
        <button
          onClick={() => router.push("/Login")}
          className="absolute top-4 start-4 text-red-300 font-semibold text-sm"
        >
          Back
        </button>
      </div>
      <div className="w-full max-w-sm p-4 rounded-3xl transform scale-200 inset-10 z-50 -translate-y-40">
        {/* Logo of AIUB */}
        <Logo />
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4"
          style={{ paddingTop: "80px" }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit(sentmail)}>
            {/* Email */}
            <div>
              <label
                htmlFor="input-group-1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
              >
                Email
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <PiMicrosoftOutlookLogoFill
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="XX-XXXXX-X@student.aiub.edu"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p
                  className="text-red-500 text-xs -translate-y-4"
                  style={{ paddingLeft: "10px" }}
                >
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Button */}
            <div className="flex items-center justify-center -translate-y-1.5">
              <button
                type="submit"
                className="w-1/2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
              >
                Verify Email
              </button>
            </div>
            {/* Custom Error Message */}
            {customError && (
              <p
                className="text-red-500 text-xs -translate-y-4"
                style={{ paddingLeft: "10px" }}
              >
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
