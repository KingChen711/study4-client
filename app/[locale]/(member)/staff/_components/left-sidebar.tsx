import React from "react"

import Logo from "@/app/[locale]/(browse)/_components/header/logo"

function LeftSidebar() {
  return (
    <nav className="fixed left-0 top-0 z-[49] flex h-20 w-full items-center justify-between border-b bg-background px-6 lg:px-3">
      <Logo />
      {/* <Actions /> */}
    </nav>
  )
}

export default LeftSidebar
