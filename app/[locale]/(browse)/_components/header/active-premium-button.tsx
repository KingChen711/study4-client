import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import getUserPremium from "@/queries/users/get-user-premium"

import { Button } from "@/components/ui/button"

async function ActivePremiumButton() {
  const t = await getTranslations("Layout")
  const premium = await getUserPremium()

  return (
    <Button variant="link">
      <Link
        className="text-muted-foreground hover:text-primary max-sm:hidden"
        href="/premium"
      >
        {premium?.isPremiumActive
          ? t("Header.YourPremium")
          : t("Header.ActivePremium")}
      </Link>
    </Button>
  )
}

export default ActivePremiumButton
