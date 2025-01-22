"use client"; 
import { useState } from "react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import img from "../../../src/asset/logo.png";
import bgimg from "../../../src/asset/bgImage.jpg";

export default function Registration() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 z-0">
        {/* Background Image */}
        <Image
          src={bgimg}
          alt="AIUB Office of Sports"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="w-full max-w-sm p-4 rounded-3xl transform scale-200 inset-10 z-50 -translate-y-40">
        {/* Logo of AIUB */}
        <div
          className="flex items-center justify-center transform scale-150 translate-y-12"
          style={{ paddingTop: "150px" }}
        >
          <Image
            src={img}
            alt="AIUB Office of Sports"
            width={150}
            height={100}
          />
        </div>
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4"
          style={{ paddingTop: "80px" }}
        >
          {/* Form */}
          <form action="#">
            {/* Student ID */}
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
              />
            </div>
            {/* Email */}
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
                id="input-group-1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="XX-XXXXX-X@student.aiub.edu"
              />
            </div>
            {/* Password */}
            <label
              htmlFor="input-group-2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
            >
              Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="input-group-2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
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
  
            <br />
            <button
              type="submit"
              className="w-full mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
            >
              Register
            </button>
           
           {/* Register */}  
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
