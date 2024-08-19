import { SignedIn } from "@clerk/nextjs"

export default async function Home() {
  return (
    <main>
      Hello world 2<SignedIn>Hello Signed</SignedIn>
    </main>
  )
}
