"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { TriangleAlertIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  testId: number
}

function FullTestTab({ testId }: Props) {
  const t = useTranslations("TestDetailPage")
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = () => {
    startTransition(() => {
      router.push(`/tests/${testId}/full-test`)
    })
  }

  return (
    <div>
      <Alert className="h-fit w-full border-yellow-500">
        <TriangleAlertIcon className="size-4 stroke-yellow-500" />
        <AlertTitle className="font-semibold text-yellow-500">
          Warning:
        </AlertTitle>
        <AlertDescription className="font-medium text-yellow-500">
          {t("ProTips.FullTest")}
        </AlertDescription>
      </Alert>
      <Button
        onClick={handleSubmit}
        disabled={pending}
        type="submit"
        className="mt-4"
      >
        {t("StartTest")} {pending && <Icons.Loader className="ml-1 size-4" />}
      </Button>
    </div>
  )
}

export default FullTestTab
