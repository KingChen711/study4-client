import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/ui/user-button"

function Actions() {
  return (
    <div className="flex items-center gap-x-2">
      <SignedOut>
        <SignInButton>
          <Button asChild>
            <Link href="/sign-in">Đăng nhập</Link>
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
        {/* <SignOutButton>Sign Out</SignOutButton> */}
      </SignedIn>

      {/* <ThemeToggle /> */}
    </div>
  )
}

export default Actions
