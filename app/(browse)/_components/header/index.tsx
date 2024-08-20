import React from "react"

import Actions from "./actions"
import Logo from "./logo"

function Header() {
  //TODO: Responsive header
  return (
    <nav className="fixed left-0 top-0 z-[49] w-full border-b px-6 shadow sm:px-14">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between">
        <Logo />
        <Actions />
      </div>
    </nav>
  )
}

export default Header
