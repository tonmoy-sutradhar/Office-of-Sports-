import Image from "next/image";
import banner from "@/asstes/bgImage.jpg";
import logo from "@/asstes/logo.png";
import Link from "next/link";
import cricket from "@/asstes/cricket.jpg";
import football from "@/asstes/football.jpg";
import badminton from "@/asstes/badminton.jpg";
import basketball from "@/asstes/basketball.jpg";
import handball from "@/asstes/handball.png";
import pool from "@/asstes/pool.jpg";
import tabletenis from "@/asstes/tabletenis.jpg";
import chess from "@/asstes/chess.jpg";
import sports from "@/asstes/sports.jpg";
import feedback from "@/asstes/student-feedback.jpg";
import StudentInfo from "../(student)/studentinfo/page";
import Totalcount from "../components/totalcount";
// import { useRouter } from "next/navigation";

const page = async () => {
  // const router = useRouter();
  // const handleNavigation = () => {
  //   router.push("/");
  // };
  return (
    <>
      {/* Total count */}
      <Totalcount></Totalcount>

      {/*---------------------------------------- SLOT SECTION----------------------------------------- */}

      <div>
        {/* create slot 1st row*/}
        <div className="px-5">
          <h2 className="text-4xl font-bold mb-4">SLOTS</h2>

          <div className=" flex justify-evenly">
            {/* Cricket slot */}
            <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl"
                  src={cricket}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">CRICKET</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* Football slot */}
            <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl"
                  src={football}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">FOOTBALL</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* basketball slot */}
            <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl"
                  src={basketball}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">BASKETBALL</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* Badminton slot */}
            <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl"
                  src={badminton}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">BADMINTON</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* create slot 2st row*/}
        <div className="px-5 mt-6 mb-6">
          <div className=" flex justify-evenly">
            {/* HANDBALL slot */}
            <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl h-20"
                  src={handball}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">HANDBALL</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* POOL slot */}
            <div className="flex justify-evenly gap-3 bg-gray-100  rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image className="rounded-xl" src={pool} alt="Cricket"></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">POOL</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* TABTLTENIS slot */}
            <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image
                  className="rounded-xl"
                  src={tabletenis}
                  alt="Cricket"
                ></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">TABLETENIS</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>

            {/* Badminton slot */}
            <div className="flex justify-center gap-3 bg-gray-100 rounded-xl pt-9 px-3">
              <div className="w-36 h-32 ">
                <Image className="rounded-xl" src={chess} alt="Cricket"></Image>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-3">CHESS</h1>
                <Link href="/createslot">
                  <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                    Create Slot
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* view , update and delete slot */}
        <div className="flex justify-evenly border-2 border-gray-300 p-2 w-[300px] ml-20 rounded-xl mb-6">
          <h1 className="text-xl font-bold ">View All Slot's</h1>
          <Link href="viewslot">
            <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
              view all Slots
            </button>
          </Link>
          {/* <Link href="#">
            <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
              Update Slot
            </button>
          </Link>
          <Link href="#">
            <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
              Delete Slot
            </button>
          </Link> */}
        </div>
      </div>

      {/*---------------------------------------- SPORTS SECTION----------------------------------------- */}
      <div className="px-5">
        <h1 className="text-4xl font-bold mb-4">SPORTS</h1>
        <div className="flex justify-evenly bg-gray-100 w-[800px] ml-14 p-3 rounded-xl">
          {/* title */}
          <div className="flex justify-center gap-4">
            <div>
              <Image className="w-52 h-32" src={sports} alt="sports"></Image>
            </div>
            <div className="pt-5">
              <h1 className="text-3xl font-bold">CATEGORY</h1>
              <h3>* Indoor</h3>
              <h3>* Outdoor</h3>
            </div>
          </div>
          {/* button */}
          <div className="pt-6 flex flex-col">
            <Link href="/createsports">
              <button className="px-3 py-1 mb-3 bg-gray-800 text-white rounded-2xl">
                Create Sports
              </button>
            </Link>
            <Link href="/viewsports">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                view all Sports
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/*---------------------------------------- ALL STUDENT SECTION----------------------------------------- */}
      <div className="mt-6 px-5 mb-6">
        <h1 className="text-4xl font-bold mb-3">STUDENT</h1>
        <StudentInfo></StudentInfo>
      </div>

      {/*---------------------------------------- SPORTS SECTION----------------------------------------- */}
      <div className="px-5">
        <h1 className="text-4xl font-bold mb-4">STUDENT FEEDBACK'S</h1>
        <div className="flex justify-evenly bg-gray-100 w-[800px] ml-14 p-3 rounded-xl">
          {/* title */}
          <div className="flex justify-center gap-4">
            <div>
              <Image className="w-52 h-32 " src={feedback} alt="sports"></Image>
            </div>
            <div className="pt-12">
              {/* <h1 className="text-3xl font-bold">CATEGORY</h1> */}
              <h3>Student Comment 📜</h3>
              <h3>Student Rating ✨</h3>
            </div>
          </div>
          {/* button */}

          <div className="mt-14">
            <Link href="/viewfeedback">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-2xl">
                view all feedback
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
