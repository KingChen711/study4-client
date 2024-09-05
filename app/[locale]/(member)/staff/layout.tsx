import React from "react"

import LeftSidebar from "./_components/left-sidebar"
import StaffNavbar from "./_components/staff-navbar"

type Props = {
  children: React.ReactNode
}

function StaffLayout({ children }: Props) {
  return (
    <main className="relative">
      <StaffNavbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default StaffLayout
