import React from "react"

import Header from "../(browse)/_components/header"

type Props = {
  children: React.ReactNode
}

function DoTestLayout({ children }: Props) {
  return (
    <main className="relative">
      <Header />
      <div className="flex">
        <section className="z-20 flex min-h-screen flex-1 flex-col">
          <div className="flex-1 px-4 pb-6 pt-20">
            <div className="mx-auto size-full">{children}</div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default DoTestLayout
