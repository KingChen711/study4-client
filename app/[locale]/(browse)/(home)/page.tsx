import { Suspense } from "react"

import Hero, { HeroSkeleton } from "./_components/hero"
import NewestTests from "./_components/newest-tests"
import Welcome, { WelcomeSkeleton } from "./_components/welcome"

export default function Home() {
  return (
    <main>
      <section className="my-6 flex flex-col gap-y-6">
        <Suspense fallback={<WelcomeSkeleton />}>
          <Welcome />
        </Suspense>
        <Suspense fallback={<HeroSkeleton />}>
          <Hero />
        </Suspense>
      </section>
      <NewestTests />
    </main>
  )
}
