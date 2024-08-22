import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useClerk } from "@clerk/nextjs"

import { Icons } from "../icons"

type Props = {
  t: (key: string, params?: Record<string, string>) => string
}

function SignOutButton({ t }: Props) {
  const router = useRouter()
  const { signOut } = useClerk()
  const [signingOut, setSigningOut] = useState(false)
  return (
    <div
      className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
      onClick={async () => {
        setSigningOut(true)
        await signOut(() => router.push("/"))
      }}
    >
      <div className="flex items-center justify-center px-3">
        {signingOut ? (
          <Icons.Loader className="size-5" />
        ) : (
          <Icons.SignOut className="size-5" />
        )}
      </div>
      {t("SignOut")}
    </div>
  )
}

export default SignOutButton
