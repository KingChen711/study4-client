// "use client"

// import React from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { usePathname } from "next/navigation"

// function StaffNavbar() {
//   const pathname = usePathname()

//   return (
//     <section className="sticky left-0 top-0 flex h-screen w-fit shrink-0 flex-col justify-between overflow-y-auto border-r pr-9 pt-24 dark:shadow-none max-lg:px-6 max-sm:hidden lg:w-[300px]">
//       <div className="flex flex-col">
//         {staffRoutes.map((item) => {
//           const isActive =
//             (pathname.startsWith(item.route) && item.route.length > 1) ||
//             pathname === item.route

//           return (
//             <Link
//               key={item.route}
//               to={item.route}
//               className={cn(
//                 "flex items-center justify-start gap-4 p-4 text-muted lg:pl-9",
//                 isActive &&
//                   "bg-gradient text-gradient-foreground rounded-r-full max-lg:rounded-lg"
//               )}
//             >
//               <Image
//                 src={item.icon(isActive)}
//                 alt={item.label}
//                 width={20}
//                 height={20}
//               />

//               <p className={cn("max-lg:hidden", isActive && "font-semibold")}>
//                 {item.label}
//               </p>
//             </Link>
//           )
//         })}
//       </div>
//     </section>
//   )
// }

// export default StaffNavbar
