import React from "react"
import { getTranslations } from "next-intl/server"

import { Skeleton } from "@/components/ui/skeleton"

async function Title() {
  const t = await getTranslations("TestsPage")
  return <h2 className="text-3xl font-bold">{t("Title")}</h2>
}

export default Title

export function TitleSkeleton() {
  return <Skeleton className="h-9 w-56" />
}
