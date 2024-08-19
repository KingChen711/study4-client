import { SignedIn } from "@clerk/nextjs"
import { auth, currentUser } from "@clerk/nextjs/server"

export default async function Home() {
  const authObject = auth()
  const user = await currentUser()

  console.log({ user, authObject })

  return (
    <main>
      Hello world 2<SignedIn>Hello Signed</SignedIn>
    </main>
  )
}
