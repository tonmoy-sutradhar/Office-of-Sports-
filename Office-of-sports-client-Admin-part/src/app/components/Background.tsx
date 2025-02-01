// "use client";
// import Image from "next/image";
// import image from "@/asstes/bgImage.jpg";

// export default function Background() {
//   return (
//     <div className="absolute inset-0 z-0">
//       <Image
//         src={image}
//         alt="AIUB Office of Sports"
//         layout="fill"
//         objectFit="cover"
//       />
//     </div>
//   );
// }

// -----------
"use client";
import Image from "next/image";
import image from "@/asstes/bgImage.jpg";

export default function Background() {
  return (
    <div className="absolute inset-0 z-0">
      <Image
        src={image}
        alt="AIUB Office of Sports"
        fill
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
