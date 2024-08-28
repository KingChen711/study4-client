"use client"

import React, { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  testId: number
}

function LeaveButton({ testId }: Props) {
  const [pending, startTransition] = useTransition()
  const t = useTranslations("DoTestPage")
  const router = useRouter()

  const handleClick = () => {
    startTransition(() => {
      router.push(`/tests/${testId}`)
    })
  }

  return (
    <Button disabled={pending} onClick={handleClick}>
      {t("Leave")} {pending && <Icons.Loader className="ml-1 size-4" />}
    </Button>
  )
}

export default LeaveButton
