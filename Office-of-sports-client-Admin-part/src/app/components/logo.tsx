"use client";
import Image from "next/image";
import logo from "@/asstes/logo.png";

export default function Logo() {
  return (
    <div
      className="flex items-center justify-center transform scale-150 mr-20 pt-[-900px]"
      // style={{ paddingTop: "0px" }}
      style={{ transform: "translateY(-50px)" }}
    >
      <Image src={logo} alt="AIUB Office of Sports" width={150} height={100} />
    </div>
  );
}
