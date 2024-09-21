import React, { Suspense } from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { UserButton } from "@/components/ui/user-button"

import ActivePremiumButton from "./active-premium-button"
import MobileNavbar from "./mobile-navbar"

async function Actions() {
  const t = await getTranslations("Layout")

  return (
    <div className="flex items-center">
      <Button variant="link">
        <Link
          className="text-muted-foreground hover:text-primary max-sm:hidden"
          href="/tests"
        >
          {t("Header.OnlineTests")}
        </Link>
      </Button>
      <Button variant="link">
        <Link
          className="text-muted-foreground hover:text-primary max-sm:hidden"
          href="/flashcards"
        >
          {t("Header.Flashcards")}
        </Link>
      </Button>
      <Suspense fallback={null}>
        <ActivePremiumButton />
      </Suspense>
      <ClerkLoading>
        <Icons.Loader className="size-[30px]" />
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton>
            <Button asChild size="sm">
              <Link
                className="text-muted-foreground hover:text-primary"
                href="/sign-in"
              >
                {t("Header.Login")}
              </Link>
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </ClerkLoaded>

      <MobileNavbar />
    </div>
  )
}

export default Actions
