import React from "react"
import { notFound } from "next/navigation"
import getTest from "@/queries/test/get-test"
import { getTranslations } from "next-intl/server"

import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"
import TagBadges, { TagBadgesSkeleton } from "@/components/badges/tag-badge"

// import TagBadges from "@/components/badges/tag-badge"

import TestTypeTabs from "./test-type-tabs"

type Props = { testId: string }

async function TestInfo({ testId }: Props) {
  const t = await getTranslations("TestDetailPage")
  const test = await getTest({ testId })

  if (!test) return notFound()

  return (
    <div className="flex flex-col gap-y-2 rounded-lg border p-4">
      <div className="flex flex-wrap gap-2">
        {test.tags.map((tag) => (
          <TagBadges key={tag.tagId} tagName={tag.tagName} />
        ))}
      </div>
      <h2 className="line-clamp-2 text-3xl font-bold">{test.testTitle}</h2>
      <div className="mb-2 flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <Icons.Time className="size-4" />
          {t("Line1", {
            duration: Math.round(test.duration) / 60,
            totalSection: test.totalSection,
            totalQuestion: test.totalQuestion,
          })}
        </div>
        <div className="flex items-center gap-x-1">
          <Icons.Engage className="size-4" />
          {t("Line2", {
            totalEngaged: test.totalEngaged,
          })}
        </div>
      </div>

      <TestTypeTabs sections={test.testSections} />
    </div>
  )
}

export default TestInfo

export function TestInfoSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 rounded-lg border p-4">
      <div className="flex flex-wrap gap-2">
        <TagBadgesSkeleton />
        <TagBadgesSkeleton />
      </div>
      <Skeleton className="h-9 w-full" />
      <div className="mb-2 flex flex-col gap-y-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>

      <Skeleton className="h-[475px] w-full" />
    </div>
  )
}
