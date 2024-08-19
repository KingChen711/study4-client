"use client"

import React, { useTransition } from "react"

// import { useRouter } from "next/navigation"
// import { toast } from "sonner"

// import { signOut } from "@/actions/auth/sign-out"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

function SignOutButton() {
  // const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSignOut = () => {
    if (isPending) return

    startTransition(async () => {
      // const result = await signOut()
      // if (result.isSuccess) {
      //   router.push("/")
      //   router.refresh()
      //   return
      // }
      // toast.error(result.messageError)
      // return
    })
  }
  return (
    <Button disabled={isPending} onClick={handleSignOut} variant="ghost">
      Sign Out {isPending && <Icons.Loader className="ml-1 size-4" />}
    </Button>
  )
}

export default SignOutButton
