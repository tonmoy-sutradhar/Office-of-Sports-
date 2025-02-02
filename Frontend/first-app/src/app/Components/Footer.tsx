import Image from "next/image";
import Logo from "@/asset/aiub-logo.png";

export default function Footer() {
  return (
    <footer className="bg-blue-100 py-10 rounded-t-3xl rounded-b-3xl text-center w-full max-w-[1539px] mx-auto -translate-y-[45px] translate-x-[5px] ">
      <div className="container mx-auto px-6">
        <div className="flex justify-center mb-4">
          <Image
            src={Logo} // Replace with actual logo path
            alt="AIUB Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>
        <div className="text-gray-800">
          <h3 className="text-lg font-semibold">Contact Us:</h3>
          <p>Email: <a href="mailto:sports@aiub.edu" className="text-blue-600">sports@aiub.edu</a></p>
          <p>Phone: +880-2-00000000</p>

          <h3 className="mt-4 text-lg font-semibold">Location:</h3>
          <p>American International University-Bangladesh (AIUB)</p>
          <p>408/1, Kuratoli, Khilkhet, Dhaka 1229, Bangladesh</p>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          &copy; 2024 AIUB Office of Sports. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
