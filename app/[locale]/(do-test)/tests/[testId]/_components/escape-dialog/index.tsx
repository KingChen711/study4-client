import React from "react"
import { getTranslations } from "@/queries/i18n/get-translations"
import { X } from "lucide-react"

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
        <Button size="icon" variant="outline" className="border">
          <X className="size-7" />
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
