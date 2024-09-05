import React from "react"
import { getTranslations } from "@/queries/i18n/get-translations"

import NoResult from "@/components/ui/no-result"

async function NotFound() {
  const t = await getTranslations("TestResultPage")
  return <NoResult title={t("NotFound")} />
}

export default NotFound
