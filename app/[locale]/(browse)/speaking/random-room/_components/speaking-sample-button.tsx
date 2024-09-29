import React from "react"
import { useTranslations } from "next-intl"

import useSpeakingRoom from "@/hooks/use-speaking-room"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Icons } from "@/components/ui/icons"
import ParseHtml from "@/components/ui/parse-html"

type Props = {
  roomId: string
}

function SpeakingSampleButton({ roomId }: Props) {
  const t = useTranslations("SpeakingPage")
  const { data, isPending } = useSpeakingRoom(roomId)

  return (
    <div className="flex items-center gap-x-2">
      <p className="font-medium">{t("SpeakingSample")}</p>
      <Dialog>
        <DialogTrigger>
          <Button size="sm" variant="ghost" className="gap-x-2 px-1">
            <Icons.Eye className="size-4" />
            {t("View")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80dvh] overflow-y-auto">
          {isPending && (
            <div className="flex w-full justify-center">
              <Icons.Loader className="size-4" />
            </div>
          )}
          <DialogHeader>
            <DialogTitle>{data?.speakingSample.speakingSampleName}</DialogTitle>
            <DialogDescription className="mt-4 flex flex-col gap-y-4">
              {data?.speakingSample.speakingParts.map((sp) => (
                <div className="flex flex-col" key={sp.speakingSampleId}>
                  <div className="font-bold">Part {sp.speakingPartNumber}</div>
                  <ParseHtml data={sp.speakingPartDescription} />
                </div>
              ))}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SpeakingSampleButton
