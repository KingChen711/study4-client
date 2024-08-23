"use client"

import React, { useState } from "react"
import { useTranslations } from "next-intl"

import { Skeleton } from "@/components/ui/skeleton"

import CategoryBadges from "./category-badge"

type Props = {
  activeCategory: string
}

function CategoryList({ activeCategory }: Props) {
  const t = useTranslations("TestsPage")
  const [category, setCategory] = useState(activeCategory)

  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadges
        value="all"
        title={t("All")}
        setCategory={setCategory}
        active={category === "all"}
      />
      <CategoryBadges
        value="ielts-academic"
        title="IELTS Academic"
        setCategory={setCategory}
        active={category === "ielts-academic"}
      />
      <CategoryBadges
        value="ielts-general"
        title="Ielts General"
        setCategory={setCategory}
        active={category === "ielts-general"}
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
