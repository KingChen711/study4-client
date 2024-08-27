"use client"

import React from "react"
import { LightbulbIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

function PracticeTab() {
  const t = useTranslations("TestDetailPage")
  return (
    <div>
      <Alert className="h-fit w-full border-primary">
        <LightbulbIcon className="size-4 stroke-primary" />
        <AlertTitle className="font-semibold text-primary">
          Pro tips:
        </AlertTitle>
        <AlertDescription className="text-primary">
          {t("ProTips")}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default PracticeTab
