import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"
import { type Tag } from "@/queries/test/get-tests"

import { cn } from "@/lib/utils"

import TagBadges from "../badges/tag-badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Icons } from "../ui/icons"
import { Skeleton } from "../ui/skeleton"

type Props = {
  id: number
  testId: string
  testTitle: string
  duration: number
  totalEngaged: number
  totalSection: number
  totalQuestion: number
  tags: Tag[]
  className?: string
}

async function TestCard({
  id,
  duration,
  tags,
  testTitle,
  totalEngaged,
  totalQuestion,
  totalSection,
  className,
}: Props) {
  const t = await getTranslations("Cards.Test")

  return (
    <Link href={`/tests/${id}`} className={cn(className)}>
      <Card className="transition-all hover:-translate-y-1 hover:shadow-primary">
        <CardHeader>
          <CardTitle className="text-lg">{testTitle}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Icons.Time className="size-[14px]" />
              <div>
                {t("TotalMinutes", { totalMinutes: Math.round(duration / 60) })}{" "}
                |
              </div>
            </div>

            <div className="flex items-center gap-x-1">
              <Icons.Engage className="size-[14px]" />
              <div>{totalEngaged}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <div>{t("TotalSection", { totalSection })} |</div>
            </div>

            <div className="flex items-center gap-x-1">
              <div>{t("TotalQuestion", { totalQuestion })}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadges
                key={tag.tagId}
                tagId={tag.tagId}
                tagName={tag.tagName}
              />
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
