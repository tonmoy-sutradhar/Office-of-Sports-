"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@/app/asset/logo.png";
import Background from "@/app/Components/HomeBack";

export default function Home() {
  const router = useRouter();

  const navigateToRegistration = () => {
    router.push("/Registration");
  };

  const navigateToLogin = () => {
    router.push("/Login");
  };

  return (
    <div className="min-h-screen bg-primary-content flex flex-col items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      {/* Logo */}
      <div
        className="z-10 transform scale-150 mb-8 translate-y-10"
        style={{ paddingBottom: "160px" }}
      >
        <Image src={logo} alt="AIUB Office of Sports" width={180} height={130} />
      </div>

      {/* Buttons */}
      <div className="z-10 flex flex-col items-center space-y-6 w-full max-w-xs -translate-y-16"
      style={{ paddingBottom: "150px" }}
      >

        {/* Login Button */}
        <button
          onClick={navigateToLogin}
          className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-3 transition duration-200"
        >
          Login
        </button>

        {/* Registration Button */}
        <button
          onClick={navigateToRegistration}
          className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full px-6 py-3 transition duration-200"
        >
          Registration
        </button>
      </div>
    </div>
  );
}
