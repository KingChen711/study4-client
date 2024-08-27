import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"

import { cn } from "@/lib/utils"

import TagBadges from "../badges/tag-badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Icons } from "../ui/icons"
import { Skeleton } from "../ui/skeleton"

type Props = {
  testId: string | number //TODO:way for BE
  title: string
  duration: number
  totalEngagements: number
  totalComments: number
  totalSections: number
  totalQuestions: number
  tags: string[]
  className?: string
}

async function TestCard({
  title,
  duration,
  testId,
  tags,
  totalComments,
  totalEngagements,
  totalQuestions,
  totalSections,
  className,
}: Props) {
  const t = await getTranslations("Cards.Test")

  return (
    <Link href={`/tests/${testId}`} className={cn(className)}>
      <Card className="transition-all hover:-translate-y-1 hover:shadow-primary">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Icons.Time className="size-[14px]" />
              <div>{t("TotalMinutes", { totalMinutes: duration })} |</div>
            </div>

            <div className="flex items-center gap-x-1">
              <Icons.Engage className="size-[14px]" />
              <div>{totalEngagements} |</div>
            </div>

            <div className="flex items-center gap-x-1">
              <Icons.Comment className="size-[14px]" />
              <div>{totalComments}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <div>
                {t("TotalSections", { totalSections: totalSections })} |
              </div>
            </div>

            <div className="flex items-center gap-x-1">
              <div>
                {t("TotalQuestions", { totalQuestions: totalQuestions })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadges key={tag} title={tag} />
            ))}
          </div>
        </CardContent>
        {/* <CardFooter>
          <Button size="sm" className="w-full" variant="outline">
            {t("Detail")}
          </Button>
        </CardFooter> */}
      </Card>
    </Link>
  )
}

export default TestCard

type TestCardSkeletonProps = {
  className?: string
}

export function TestCardSkeleton({ className }: TestCardSkeletonProps) {
  return (
    <Skeleton
      className={cn("max-h-[325px] min-h-[240px] rounded-lg", className)}
    />
  )
}
