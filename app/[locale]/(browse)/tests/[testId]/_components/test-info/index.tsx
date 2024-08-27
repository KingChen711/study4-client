import React from "react"
import { getTranslations } from "next-intl/server"

import { Icons } from "@/components/ui/icons"

// import TagBadges from "@/components/badges/tag-badge"

import TestTypeTabs from "./test-type-tabs"

type Props = { testId: string }

async function TestInfo({ testId }: Props) {
  console.log(testId)

  const t = await getTranslations("TestDetailPage")

  return (
    <div className="flex flex-col gap-y-2 rounded-lg border p-4">
      <div className="flex flex-wrap gap-2">
        {/* <TagBadges title="IELTS Academic" />
        <TagBadges title="Listening" /> */}
      </div>
      <h2 className="line-clamp-2 text-3xl font-bold">
        IELTS Simulation Listening test 1
      </h2>
      <div className="mb-2 flex flex-col gap-y-1">
        <div className="flex items-center gap-x-1">
          <Icons.Time className="size-4" />
          {t("Line1", {
            duration: 40,
            totalSection: 4,
            totalQuestion: 40,
            totalComments: 547,
          })}
        </div>
        <div className="flex items-center gap-x-1">
          <Icons.Engage className="size-4" />
          {t("Line2", {
            totalEngagements: 23543,
          })}
        </div>
      </div>

      <TestTypeTabs sections={[]} />
    </div>
  )
}

export default TestInfo
