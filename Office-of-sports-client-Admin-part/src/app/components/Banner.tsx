import React from "react";
import Image from "next/image";
import banner from "@/asstes/bgImage.jpg";
import logo from "@/asstes/logo.png";

export default function Banner() {
  return (
    <div>
      <div>
        <Image
          src={banner}
          alt="img"
          className="w-full h-[300px] relative"
        ></Image>
      </div>
      <div>
        <h1 className="text-3xl ml-[70px] mb-1 md:text-5xl md:mb-20 text-white font-bold relative -mt-48 md:ml-[500px]">
          Welcome to ADMIN
        </h1>
        <Image
          src={logo}
          alt="AIUB Office of Sports Logo"
          className="w-80 h-72 -mt-20 ml-[80px] md:ml-[575px] relative"
        />
      </div>
    </div>
  );
}
