import React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Icons } from "../ui/icons"
import { Separator } from "../ui/separator"

type Props = { className?: string }

async function GoalCard({ className }: Props) {
  const t = await getTranslations("Cards.Goal")
  const user = await currentUser()

  if (!user) return null

  return (
    <Card className={cn("pt-4", className)}>
      <CardContent className="flex flex-col items-center">
        {/* <Image
          src={user?.imageUrl}
          alt="avatar"
          className="rounded-full"
          height={32}
          width={32}
        />
        <p className="line-clamp-1 text-sm">
          {getUsernameFromEmail(user?.primaryEmailAddress?.emailAddress!)}
        </p> */}
        <h3 className="flex items-center gap-x-1 font-bold">
          <Icons.Target className="size-5" />
          {t("LearningTarget")}
        </h3>
        <Separator className="my-2 bg-primary" />
        <span className="text-sm">
          {t("Warning")}{" "}
          <span className="cursor-pointer font-medium text-primary hover:underline">
            {t("CreateNow")}
          </span>
        </span>

        <Button
          variant="outline"
          size="sm"
          className="mt-3 gap-x-1 rounded-full border-primary bg-green-50 hover:bg-primary hover:text-primary-foreground lg:w-full"
        >
          <Icons.Analysis className="size-4" />
          Thống kê kết quả
        </Button>
      </CardContent>
    </Card>
  )
}

export default GoalCard
