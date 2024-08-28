import React from "react"
import { getTranslations } from "next-intl/server"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import LeaveButton from "./leave-button"

type Props = {
  testId: number
}

async function EscapeDialog({ testId }: Props) {
  const t = await getTranslations("DoTestPage")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border">
          {t("Leave")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("LeaveTest")}</DialogTitle>
          <DialogDescription>{t("LeaveTestDesc")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LeaveButton testId={testId} />
          <DialogClose>
            <Button variant="outline">{t("Cancel")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EscapeDialog
