import React from "react"
import { getTranslations } from "@/queries/i18n/get-translations"

import NoResult from "@/components/ui/no-result"

async function NotFound() {
  const t = await getTranslations("TestDetailPage")
  return (
    <NoResult
      title={t("NotFound")}
      linkTitle="Return to search tests"
      href="/tests"
    />
  )
}

export default NotFound
