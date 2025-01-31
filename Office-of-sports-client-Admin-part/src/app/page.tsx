// login page------------------------>>
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
import Background from "@/app/components/Background";
import Logo from "@/app/components/logo";

export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState("");

  const router = useRouter();

  // const navigateToForgetPassword = () => {
  //   router.push("#");
  // };

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
        <div className="-mt-[280px] relative ml-20">
          <Logo></Logo>
        </div>
        <div
          className="bg-white shadow-lg rounded-2xl p-4 space-y-4 -mt-[130px]"
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
              <a
                // onClick={navigateToForgetPassword}
                className="text-sm text-blue-500 dark:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-full px-2 py-1 transition-colors cursor-pointer"
              >
                Forgot your password?
              </a>
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

// all are ok just Pass the Token in the Headers. modify this code with this section

// ---------------------------------------------------------------------------------------------------------
// import Image from "next/image";
// import banner from "@/asstes/bgImage.jpg";
// import logo from "@/asstes/logo.png";
// import Link from "next/link";
// import cricket from "@/asstes/cricket.jpg";
// import football from "@/asstes/football.jpg";
// import badminton from "@/asstes/badminton.jpg";
// import basketball from "@/asstes/basketball.jpg";
// import handball from "@/asstes/handball.png";
// import pool from "@/asstes/pool.jpg";
// import tabletenis from "@/asstes/tabletenis.jpg";
// import chess from "@/asstes/chess.jpg";
// import sports from "@/asstes/sports.jpg";
// import feedback from "@/asstes/student-feedback.jpg";
// import StudentInfo from "./(student)/studentinfo/page";
// // import { useRouter } from "next/navigation";

// const page = async () => {
//   // const router = useRouter();
//   // const handleNavigation = () => {
//   //   router.push("/createsports");
//   // };
//   return (
//     <>
//       {/* Total count */}
//       <div className="grid grid-cols-3 gap-4 mb-8 px-4 -mt-5">
//         <div className="bg-teal-500 text-white text-center py-6 rounded-lg shadow-lg">
//           <h2 className="text-4xl font-bold">120</h2>
//           <p className="text-lg">Total Students</p>
//         </div>
//         <div className="bg-blue-500 text-white text-center py-6 rounded-lg shadow-lg">
//           <h2 className="text-4xl font-bold">011</h2>
//           <p className="text-lg">Total Sports</p>
//         </div>
//         <div className="bg-pink-500 text-white text-center py-6 rounded-lg shadow-lg">
//           <h2 className="text-4xl font-bold">024</h2>
//           <p className="text-lg">Total Slots</p>
//         </div>
//       </div>
//       {/*---------------------------------------- SLOT SECTION----------------------------------------- */}

//       <div>
//         {/* create slot 1st row*/}
//         <div className="px-5">
//           <h2 className="text-4xl font-bold mb-4">SLOTS</h2>

//           <div className=" flex justify-evenly">
//             {/* Cricket slot */}
//             <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl"
//                   src={cricket}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">CRICKET</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Football slot */}
//             <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl"
//                   src={football}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">FOOTBALL</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* basketball slot */}
//             <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl"
//                   src={basketball}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">BASKETBALL</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Badminton slot */}
//             <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl"
//                   src={badminton}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">BADMINTON</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* create slot 2st row*/}
//         <div className="px-5 mt-6 mb-6">
//           <div className=" flex justify-evenly">
//             {/* HANDBALL slot */}
//             <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl h-20"
//                   src={handball}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">HANDBALL</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* POOL slot */}
//             <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image className="rounded-xl" src={pool} alt="Cricket"></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">POOL</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* TABTLTENIS slot */}
//             <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image
//                   className="rounded-xl"
//                   src={tabletenis}
//                   alt="Cricket"
//                 ></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">TABLETENIS</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Badminton slot */}
//             <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
//               <div className="w-36 h-32 ">
//                 <Image className="rounded-xl" src={chess} alt="Cricket"></Image>
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold mb-3">CHESS</h1>
//                 <Link href="/createslot">
//                   <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                     Create Slot
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* view , update and delete slot */}
//         <div className="flex justify-evenly border-2 border-gray-300 p-2 w-[300px] ml-20 rounded-xl mb-6">
//           <h1 className="text-xl font-bold ">View All Slot's</h1>
//           <Link href="viewslot">
//             <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//               view all Slots
//             </button>
//           </Link>
//           {/* <Link href="#">
//             <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//               Update Slot
//             </button>
//           </Link>
//           <Link href="#">
//             <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//               Delete Slot
//             </button>
//           </Link> */}
//         </div>
//       </div>

//       {/*---------------------------------------- SPORTS SECTION----------------------------------------- */}
//       <div className="px-5">
//         <h1 className="text-4xl font-bold mb-4">SPORTS</h1>
//         <div className="flex justify-evenly bg-gray-100 w-[800px] ml-14 p-3 rounded-xl">
//           {/* title */}
//           <div className="flex justify-center gap-4">
//             <div>
//               <Image className="w-52 h-32" src={sports} alt="sports"></Image>
//             </div>
//             <div className="pt-5">
//               <h1 className="text-3xl font-bold">CATEGORY</h1>
//               <h3>* Indoor</h3>
//               <h3>* Outdoor</h3>
//             </div>
//           </div>
//           {/* button */}
//           <div className="pt-6 flex flex-col">
//             <Link href="/createsports">
//               <button className="px-3 py-1 mb-3 bg-gray-800 text-white rounded-2xl">
//                 Create Sports
//               </button>
//             </Link>
//             <Link href="/viewsports">
//               <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                 view all Sports
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/*---------------------------------------- ALL STUDENT SECTION----------------------------------------- */}
//       <div className="mt-6 px-5 mb-6">
//         <h1 className="text-4xl font-bold mb-3">STUDENT</h1>
//         <StudentInfo></StudentInfo>
//       </div>

//       {/*---------------------------------------- SPORTS SECTION----------------------------------------- */}
//       <div className="px-5">
//         <h1 className="text-4xl font-bold mb-4">STUDENT FEEDBACK'S</h1>
//         <div className="flex justify-evenly bg-gray-100 w-[800px] ml-14 p-3 rounded-xl">
//           {/* title */}
//           <div className="flex justify-center gap-4">
//             <div>
//               <Image className="w-52 h-32 " src={feedback} alt="sports"></Image>
//             </div>
//             <div className="pt-12">
//               {/* <h1 className="text-3xl font-bold">CATEGORY</h1> */}
//               <h3>Student Comment 📜</h3>
//               <h3>Student Rating ✨</h3>
//             </div>
//           </div>
//           {/* button */}

//           <div className="mt-14">
//             <Link href="/viewfeedback">
//               <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
//                 view all feedback
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
