"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import useCategories from "@/hooks/category/use-categories"
import { Skeleton } from "@/components/ui/skeleton"

import CategoryBadges from "./category-badge"

type Props = {
  activeCategory: string
}

function CategoryList({ activeCategory }: Props) {
  const t = useTranslations("TestsPage")
  const [currentCategory, setCurrentCategory] = useState(activeCategory)
  const { data, isPending } = useCategories()

  if (isPending) return <CategoryListSkeleton />

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadges
        isAllBadge
        title={t("All")}
        setCurrentCategory={setCurrentCategory}
        active={currentCategory === "all"}
      />
      {data?.map((category) => (
        <CategoryBadges
          key={category.testCategoryId}
          active={currentCategory === category.testCategoryName}
          title={category.testCategoryName}
          setCurrentCategory={setCurrentCategory}
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
