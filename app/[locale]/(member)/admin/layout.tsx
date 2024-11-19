import React from "react"

import AdminNavbar from "./_components/admin-navbar"
import LeftSidebar from "./_components/left-sidebar"

type Props = {
  children: React.ReactNode
}

function AdminLayout({ children }: Props) {
  return (
    <main className="relative">
      <AdminNavbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default AdminLayout
