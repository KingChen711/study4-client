import React from "react"

import { HeroSkeleton } from "./_components/hero"
import { TestListSkeleton } from "./_components/newest-tests/test-list"
import { TitleSkeleton } from "./_components/newest-tests/title"
import { WelcomeSkeleton } from "./_components/welcome"

function HomeLoadingPage() {
  //TODO: Sync with home page update -> do when have change in home page UI
  return (
    <main>
      <section className="my-6 flex flex-col gap-y-6">
        <WelcomeSkeleton />
        <HeroSkeleton />
      </section>
      <div className="mt-8 flex flex-col">
        <TitleSkeleton />
        <TestListSkeleton />
      </div>
    </main>
  )
}

export default HomeLoadingPage
