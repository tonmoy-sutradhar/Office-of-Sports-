"use client"; 
import { FormEvent, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { TbLockPassword } from "react-icons/tb";
import { registrationSchema, RegistrationSchema } from "@/app/Validation/RegistrationValidation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Background from "@/app/Components/background";
import Logo from "@/app/Components/logo";
import api from "@/app/api/api";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState('');
  const router = useRouter();

   const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegistrationSchema>({
      resolver: zodResolver(registrationSchema),
    });

    // Register handler
   const registration = async (data: RegistrationSchema) => {
    try {
       await api.post("/auth/register", data);
      setTimeout(() => {
        toast.success("Registration Successfull");
        router.push("/Login"); // Redirect after 5 seconds
      }, 5000);
    } catch (error: any) {
      toast.error(error.response?.data?.message );

    }
  };
  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
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
          <form onSubmit={handleSubmit(registration)}>
            {/* Student ID */}
            <div>
            <label
              htmlFor="student_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3">Student ID</label>
               <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <FaRegUser
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="text"
                id="student_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="XX-XXXXX-X"
                {...register("university_id")}
              />
            </div>
            {errors.university_id && (
              <p className="text-red-500 text-xs -translate-y-4" style={{paddingLeft: "10px"}}>
                {errors.university_id.message}
              </p>
            )}
            </div>
            {/* Email */}
            <div>
            <label
              htmlFor="Email"
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
              <p className="text-red-500 text-xs -translate-y-4" style={{paddingLeft: "10px"}}>
                {errors.email.message}
              </p>)}
            </div>
            {/* Password */}
            <div>
            <label
              htmlFor="Password"
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
                placeholder="Password"
                {...register("password")}
              />
              {/* Toggle Visibility Button */}
              <button
                type="button"
                className="absolute inset-y-0 end-0 flex items-center pe-3"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                   <VscEye
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    />
                  ) : (
                    <VscEyeClosed
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs -translate-y-4" style={{paddingLeft: "10px"}}>
                {errors.password.message}
              </p>
            )}
            </div>
  
            <br />
            <div className="flex items-center justify-center -translate-y-7">
            <button
              type="submit"
              className="w-1/2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
            >
              Register
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
      {/* Footer */}
      <footer className="absolute bottom-4 text-center w-full text-sm text-white">
        © 2024 AIUB Office of Sports. All Rights Reserved.
      </footer>
    </div>
  );
}
