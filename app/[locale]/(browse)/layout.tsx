import React from "react"

import Footer from "./_components/footer"
import Header from "./_components/header"

type Props = {
  children: React.ReactNode
}

function BrowseLayout({ children }: Props) {
  return (
    <main className="relative">
      <Header />
      <div className="z-10 flex">
        <section className="flex min-h-[calc(100dvh_-_84px)] flex-1 flex-col">
          <div className="flex-1 px-6 pb-6 max-md:pb-14 sm:px-14">
            <div className="mx-auto size-full max-w-6xl">{children}</div>
          </div>
          <Footer />
        </section>
      </div>
    </main>
  )
}

export default BrowseLayout
