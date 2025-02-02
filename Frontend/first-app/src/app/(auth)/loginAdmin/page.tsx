"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/app/Validation/LoginValidation";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
// import Background from "@/asstes/bgImage.jpg";
// import Logo from "@/asstes/logo.png";
import api from "@/app/api/api";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
// import Background from "@/app/Components/background";
// import Logo from "@/asset/logo.png";
import Link from "next/link";
import Background from "@/app/Components/background";
import Logo from "@/app/Components/logo";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  // Login handler
  // const login = async (data: LoginSchema) => {
  //   try {
  //     const response = await api.post("/admin/login", data);
  //     console.log("Login Response:", response.data);
  //     const token = response.data.Token;

  //     Cookies.set("accessToken", token, {
  //       expiresIn: "1h",
  //       secure: true,
  //       sameSite: "Strict",
  //     });
  //     toast.success("login successful");
  //     router.push("/admindashboard");
  //   } catch (error: any) {
  //     setCustomError(
  //       error.response?.data?.message || "Login failed. Please try again."
  //     );
  //     toast.error("something wrong");
  //   }
  // };

  const login = async (data: LoginSchema) => {
    try {
      const response = await api.post("/admin/login", data);
      console.log("Login Response:", response.data);

      const token = response.data.Admin_Token;
      console.log("Extracted Token:", token);

      if (!token) {
        throw new Error("Token not received from the server");
      }

      Cookies.set("accessToken", token, {
        expires: 1, // Expires in 1 day
        secure: process.env.NODE_ENV === "production", // Only secure in production
        sameSite: "Strict",
      });

      toast.success("Login successful");
      router.push("/admindashboard");
    } catch (error: any) {
      setCustomError(
        error.response?.data?.message || "Login failed. Please try again."
      );
      toast.error("Something went wrong");
    }
  };

  return (
    // min-h-screen
    <div className=" bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
      <Background></Background>

      <div className="w-full max-w-sm p-4 rounded-3xl transform scale-200 inset-10 z-50 -translate-y-40">
        <div className=" relative ml-20">
          <Logo></Logo>
        </div>
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4 mt-[230px] translate-y-[-200px]"
          style={{ paddingTop: "80px" }}
        >
          {/* Form */}
          <form onSubmit={handleSubmit(login)}>
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
                  placeholder="Enter your email"
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
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
              >
                Password
              </label>
              <div className="relative mb-6">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <TbLockPassword
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your Password"
                  {...register("password")}
                />
                {/* Toggle Visibility Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <VscEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <VscEyeClosed className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {/* Error */}
            {errors.password && (
              <p
                className="text-red-500 text-xs -translate-y-4"
                style={{ paddingLeft: "10px" }}
              >
                {errors.password.message}
              </p>
            )}
            {/* Forgot password */}
            <div className="flex padding-left-400">
              {/* Forgot your password */}
              {/* <Link
                href={"/changepassword"}
                className="text-sm text-blue-500 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-2 py-1 transition-colors cursor-pointer"
              >
                Forgot your password?
              </Link> */}
            </div>
            <br />
            <div className="flex items-center justify-center -translate-y-1.5">
              <button
                type="submit"
                className="w-1/2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
              >
                Login
              </button>
            </div>

            {/* Custom error message */}
            {customError && (
              <p className="text-red-500 text-xs text-center translate-y-1">
                {customError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
