import React from "react"

import Header from "./_components/header"

type Props = {
  children: React.ReactNode
}

function BrowseLayout({ children }: Props) {
  return (
    <main className="relative">
      <Header />
      <div className="flex">
        <section className="z-20 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-20 max-md:pb-14 sm:px-14">
          <div className="mx-auto size-full max-w-6xl">{children}</div>
        </section>
      </div>
    </main>
  )
}

export default BrowseLayout
