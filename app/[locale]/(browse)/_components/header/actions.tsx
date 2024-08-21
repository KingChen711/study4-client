import React from "react"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { UserButton } from "@/components/ui/user-button"

function Actions() {
  return (
    <div className="flex items-center">
      <Button variant="link">
        <Link href="/tests">Đề thi online</Link>
      </Button>
      <Button variant="link">
        <Link href="/flashcards">Flashcards</Link>
      </Button>
      <Button variant="link">
        <Link href="/active">Kích hoạt tài khoản</Link>
      </Button>
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
