// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import Link from "next/link";

// type Student = {
//   id: string;
//   university_id: string;
//   email: string;
//   isBanned: boolean;
//   balance: number;
// };

// const StudentInfo = () => {
//   const [students, setStudents] = useState<Student[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API}/search/students`
//       );
//       setStudents(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//       setLoading(false);
//     }
//   };

//   const handleBlockStudent = async () => {
//     if (!selectedStudent) return;

//     try {
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API}/search/student/ban/${selectedStudent.university_id}`,
//         { banStatus: true }
//       );

//       if (response.status === 200) {
//         toast.success(
//           `Student ${selectedStudent.university_id} has been blocked.`
//         );
//         fetchStudents();
//       } else {
//         toast.error("Failed to block student.");
//       }
//     } catch (error) {
//       console.error("Error banning student:", error);
//       toast.error("An error occurred while banning the student.");
//     }

//     closeModal();
//   };

//   const openModal = (student: Student) => {
//     setSelectedStudent(student);
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedStudent(null);
//     setModalOpen(false);
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-4 ml-10">
//       <div className="space-y-4 w-[795px]">
//         {students.map((student, index) => (
//           <div
//             key={student.university_id}
//             className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md"
//           >
//             <span className="font-medium text-lg">
//               {index + 1}. {student.email}
//             </span>
//             <div className="space-x-4">
//               <Link href={`/studentinfo/${student.id}`}>
//                 <button className="px-3 py-1 bg-gray-300 text-black border-2 border-blue-400 rounded-2xl">
//                   View Details
//                 </button>
//               </Link>
//               <button
//                 className="px-5 py-1 bg-blue-500 text-white rounded-2xl"
//                 onClick={() => openModal(student)}
//               >
//                 Block
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {modalOpen && selectedStudent && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] text-center">
//             <div className="flex justify-center mb-4">
//               <div className="bg-green-100 rounded-full p-3">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//               </div>
//             </div>
//             <h2 className="text-2xl font-bold mb-4 border-b-2 w-[280px] mx-auto">
//               Blocked The Student
//             </h2>
//             <p className="text-lg mb-4 text-start ml-4 ">
//               <strong>Student ID: </strong>
//               <span className="text-blue-500">
//                 {selectedStudent.university_id}
//               </span>
//             </p>
//             <p className="text-lg mb-5">
//               <strong>Student Email: </strong>
//               <span className="text-blue-500">{selectedStudent.email}</span>
//             </p>

//             <button
//               className="px-5 py-2 mr-3 bg-blue-500 text-white rounded-lg"
//               onClick={closeModal}
//             >
//               Close
//             </button>
//             <button
//               className="px-4 py-2 bg-red-500 text-white rounded-lg"
//               onClick={handleBlockStudent}
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentInfo;

// Token------>>
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import Cookies from "js-cookie"; // Import Cookies

type Student = {
  id: string;
  university_id: string;
  email: string;
  isBanned: boolean;
  balance: number;
};

const StudentInfo = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/search/students`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
    }
  };

  const handleBlockStudent = async () => {
    if (!selectedStudent) return;

    try {
      const token = Cookies.get("accessToken"); // Get token from cookies

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API}/search/student/ban/${selectedStudent.university_id}`,
        { banStatus: true },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
          withCredentials: true, // Ensure cookies are sent
        }
      );

      if (response.status === 200) {
        toast.success(
          `Student ${selectedStudent.university_id} has been blocked.`
        );
        fetchStudents();
      } else {
        toast.error("Failed to block student.");
      }
    } catch (error) {
      console.error("Error banning student:", error);
      toast.error("An error occurred while banning the student.");
    }

    closeModal();
  };

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setModalOpen(false);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 ml-10">
      <div className="space-y-4 w-[795px]">
        {students.map((student, index) => (
          <div
            key={student.university_id}
            className="flex justify-between items-center bg-gray-200 p-4 rounded-lg shadow-md"
          >
            <span className="font-medium text-lg">
              {index + 1}. {student.email}
            </span>
            <div className="space-x-4">
              <Link href={`/studentinfo/${student.id}`}>
                <button className="px-3 py-1 bg-gray-300 text-black border-2 border-blue-400 rounded-2xl">
                  View Details
                </button>
              </Link>
              <button
                className="px-5 py-1 bg-blue-500 text-white rounded-2xl"
                onClick={() => openModal(student)}
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 border-b-2 w-[280px] mx-auto">
              Block The Student
            </h2>
            <p className="text-lg mb-4 text-start ml-4 ">
              <strong>Student ID: </strong>
              <span className="text-blue-500">
                {selectedStudent.university_id}
              </span>
            </p>
            <p className="text-lg mb-5">
              <strong>Student Email: </strong>
              <span className="text-blue-500">{selectedStudent.email}</span>
            </p>

            <button
              className="px-5 py-2 mr-3 bg-blue-500 text-white rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={handleBlockStudent}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
