import React from "react"
import Link from "next/link"
import whoAmI from "@/queries/users/who-am-i"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"

async function ActivePremiumButton() {
  const t = await getTranslations("Layout")
  const currentUser = await whoAmI()

  return (
    <Button variant="link">
      <Link
        className="text-muted-foreground hover:text-primary max-sm:hidden"
        href="/premium"
      >
        {currentUser?.isActive
          ? t("Header.YourPremium")
          : t("Header.ActivePremium")}
      </Link>
    </Button>
  )
}

export default ActivePremiumButton
