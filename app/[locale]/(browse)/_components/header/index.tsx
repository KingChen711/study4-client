import React from "react"

import Actions from "./actions"
import Logo from "./logo"

function Header() {
  return (
    <nav className="sticky left-0 top-0 z-0 w-full border-b bg-background px-6 shadow sm:px-14">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between">
        <Logo />
        <Actions />
      </div>
    </nav>
  )
}

export default Header
