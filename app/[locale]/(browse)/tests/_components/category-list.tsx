import React from "react"
import getCategories from "@/queries/category/get-categories"
import { getTranslations } from "@/queries/i18n/get-translations"

import { Skeleton } from "@/components/ui/skeleton"

import CategoryBadge from "./category-badge"

type Props = {
  activeCategory: string
}

async function CategoryList({ activeCategory }: Props) {
  const categories = await getCategories()
  const t = await getTranslations("TestsPage")

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadge
        isAllBadge
        title={t("All")}
        active={activeCategory === "all"}
      />
      {categories.map((category) => (
        <CategoryBadge
          key={category.testCategoryId}
          active={activeCategory === category.testCategoryName}
          title={category.testCategoryName}
        />
      ))}
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
