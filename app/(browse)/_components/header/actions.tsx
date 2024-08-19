import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"

import SignOutButton from "./sign-out-button"

function Actions() {
  return (
    <div className="flex items-center gap-x-2">
      <SignedOut>
        <Button asChild>
          <Link href="/sign-in">Login</Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <SignOutButton />
      </SignedIn>

      {/* <ThemeToggle /> */}
    </div>
  )
}

export default Actions
