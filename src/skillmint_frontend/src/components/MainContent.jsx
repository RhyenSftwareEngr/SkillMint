// import React from "react";

// export default function MainContent() {
//   return (
//     <main className="flex-1 flex flex-col min-w-0">
//       {/* Carousel */}
//       <div className="w-full mb-8 relative min-h-[184px]">
//         <div className="flex items-center gap-3 relative">
//           <button className="w-8 h-44 rounded-full bg-gradient-to-r from-white via-gray-100 to-transparent shadow absolute left-0 top-0 z-10 flex items-center justify-center text-2xl">
//             {"<"}
//           </button>
//           <div className="flex-1 flex justify-center gap-4 md:gap-8">
//             {[1, 2, 3].map((n) => (
//               <div
//                 key={n}
//                 className="w-[170px] sm:w-[220px] md:w-[310px] h-44 rounded-2xl bg-white shadow"
//               ></div>
//             ))}
//           </div>
//           <button className="w-8 h-44 rounded-full bg-gradient-to-l from-white via-gray-100 to-transparent shadow absolute right-0 top-0 z-10 flex items-center justify-center text-2xl">
//             {">"}
//           </button>
//         </div>
//       </div>

//       {/* Events grid header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-2">
//         <h2 className="text-2xl font-bold">Events</h2>
//         <div className="flex items-center gap-3">
//           <div className="flex bg-gray-200 rounded-full p-1">
//             <button className="px-5 py-1 rounded-full font-medium transition bg-gray-400 text-white">
//               All Events
//             </button>
//             <button className="px-5 py-1 rounded-full font-medium transition bg-gray-200 text-gray-800">
//               Created Events
//             </button>
//           </div>
//           <select className="ml-2 px-3 py-1 rounded-full bg-gray-200 border-none text-sm focus:ring-0">
//             <option value="latest">Sort</option>
//             <option value="latest">Latest</option>
//             <option value="soonest">Soonest</option>
//           </select>
//         </div>
//       </div>

//       {/* Events grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
//         {[1, 2, 3, 4, 5, 6].map((n) => (
//           <div
//             key={n}
//             className="bg-white rounded-xl shadow p-4 flex flex-col min-h-[210px] hover:shadow-lg transition"
//           >
//             <div className="h-20 bg-gray-200 rounded mb-2"></div>
//             <div className="flex gap-2 text-xs mb-1 flex-wrap">
//               <span className="bg-gray-200 rounded px-2 py-0.5">Virtual</span>
//               <span className="bg-gray-200 rounded px-2 py-0.5">Upcoming</span>
//               <span className="text-gray-400">12 days left</span>
//             </div>
//             <div className="font-semibold text-sm truncate">
//               Hackathon – Philippine Blockchain Week 2025
//             </div>
//             <div className="text-xs text-gray-500">
//               May 26, 2025 – June 09, 2025
//             </div>
//             <div className="mt-1 text-xs">Badge</div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }
