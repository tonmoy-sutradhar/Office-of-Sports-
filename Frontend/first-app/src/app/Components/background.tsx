"use client";
import Image from "next/image";
import image from "../../asset/bgImage.jpg";

export default function Background() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Background Image */}
      <Image
        src={image}
        alt="AIUB Office of Sports"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
