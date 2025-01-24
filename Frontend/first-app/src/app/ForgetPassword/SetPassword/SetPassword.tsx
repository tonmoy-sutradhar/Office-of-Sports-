"use client"; 
import { useState } from "react";
import { TbLockPassword } from "react-icons/tb";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Background from "@/app/Components/background";
import Logo from "@/app/Components/logo";

export default function SetPassword() {
    const [shownPassword, setShownPassword] = useState(false);
    const [showcnPassword, setShowcnPassword] = useState(false);
  return (
    <div className="min-h-screen bg-primary-content from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
        {/* Background Image */}
        <Background />
      <div className="w-full max-w-sm p-4 rounded-3xl transform scale-250 inset-10 z-50 -translate-y-40">
        {/* Logo of AIUB */}
        <Logo />
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4"
          style={{ paddingTop: "80px" }}
        >
          {/* Form */}
          <form action="#">
            {/* New Password */}
            <label
              htmlFor="input-group-1"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
            >
              New Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <TbLockPassword
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  />
              </div>
              <input
                type={shownPassword ? "text" : "password"}
                id="npassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="New Password"
              />
              {/* Toggle Visibility Button */}
                <button
                  type="button"
                  className="absolute inset-y-0 end-0 flex items-center pe-3"
                  onClick={() => setShownPassword((prev) => !prev)}
                   >
                    {shownPassword ? (
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
            {/* Confirm Password */}
            <label
              htmlFor="input-group-2"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white translate-x-3"
            >
                Confirm Password
            </label>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <TbLockPassword
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  />
              </div>
              <input
                type={showcnPassword ? "text" : "password"}
                id="cnpassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
                {/* Toggle Visibility Button */}
                    <button
                    type="button"
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                    onClick={() => setShowcnPassword((prev) => !prev)}
                     >
                        {showcnPassword ? (
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
            <div className="flex items-center justify-center -translate-y-1.5">
            <button
              type="button"
              className="w-1/2 mb-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-2 py-2.5 transition-colors"
            >
              Set Password
            </button>
            </div> 
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
