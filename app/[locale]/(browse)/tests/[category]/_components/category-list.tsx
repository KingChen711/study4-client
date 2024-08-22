import React from "react"
import { getTranslations } from "next-intl/server"

import { Skeleton } from "@/components/ui/skeleton"
import CategoryBadges from "@/components/badges/category-badge"

type Props = {
  activeCategory: string
}

async function CategoryList({ activeCategory }: Props) {
  const t = await getTranslations("TestsPage")

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadges
        value="all"
        title={t("All")}
        active={activeCategory === "all"}
      />
      <CategoryBadges
        value="ielts-academic"
        title="IELTS Academic"
        active={activeCategory === "ielts-academic"}
      />
      <CategoryBadges
        value="ielts-general"
        title="Ielts General"
        active={activeCategory === "ielts-general"}
      />
    </div>
  )
}

export default CategoryList

export function CategoryListSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      <Skeleton className="h-[38px] w-20 rounded-full" />
      <Skeleton className="h-[38px] w-36 rounded-full" />
      <Skeleton className="h-[38px] w-32 rounded-full" />
      <Skeleton className="h-[38px] w-24 rounded-full" />
      <Skeleton className="h-[38px] w-28 rounded-full" />
    </div>
  )
}
