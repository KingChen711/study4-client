import React from "react"
import { getTranslations } from "@/queries/i18n/get-translations"

import { Skeleton } from "@/components/ui/skeleton"

async function Title() {
  const t = await getTranslations("HomePage")
  return (
    <h3 className="mb-4 text-center text-[28px] font-medium">
      {t("NewestTestTitle")}
    </h3>
  )
}

export default Title

export function TitleSkeleton() {
  return <Skeleton className="mx-auto mb-4 h-[42px] w-[220px]" />
}
