import React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

import TagBadges from "../badges/tag-badge"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Icons } from "../ui/icons"

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

function TestCard({
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
  console.log({ testId })

  //TODO: add link navigate id

  return (
    <Link href="#" className={cn(className)}>
      <Card className="transition-all hover:-translate-y-1 hover:shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
            <div className="flex items-center gap-x-1">
              <Icons.Time className="size-[14px]" />
              <div>{duration} phút |</div>
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
              <div>{totalSections} phần thi |</div>
            </div>

            <div className="flex items-center gap-x-1">
              <div>{totalQuestions} câu hỏi</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <TagBadges key={tag} title={tag} />
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">
            Chi tiết
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default TestCard
