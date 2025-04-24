"use client";
import Image from "next/image";
import logo from "@/app/asset/logo.png";

export default function Logo() {
    return (
      <div
        className="flex items-center justify-center transform scale-150 translate-y-12"
        style={{ paddingTop: "150px" }}
      >
        <Image src={logo} alt="AIUB Office of Sports" width={150} height={100} />
      </div>
    );
  }