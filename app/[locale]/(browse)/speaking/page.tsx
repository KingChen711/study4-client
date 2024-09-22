import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"

import { Icons } from "@/components/ui/icons"

async function SpeakingPage() {
  const t = await getTranslations("SpeakingPage")

  return (
    <div>
      <h3 className="mb-6 mt-8 text-3xl font-bold">{t("PracticeSpeaking")}</h3>

      <div className="flex w-fit flex-col gap-y-6">
        <Link
          href="/speaking/new-room"
          className="group flex items-center gap-x-4 rounded-xl border-2 p-6 shadow hover:border-primary"
        >
          <div className="flex items-center justify-center rounded-full border bg-primary p-4 text-primary-foreground">
            <Icons.Plus className="size-6" />
          </div>
          <div className="flex max-w-96 flex-1 flex-col gap-y-2">
            <h4 className="text-xl font-bold">{t("CreateRoom")}</h4>
            <p className="text-lg">{t("CreateRoomMessage")}</p>
          </div>
        </Link>
        <Link
          href="/speaking/random-room"
          className="group flex items-center gap-x-4 rounded-xl border-2 p-6 shadow hover:border-primary"
        >
          <div className="flex items-center justify-center rounded-full border bg-primary p-4 text-primary-foreground">
            <Icons.Random className="size-6" />
          </div>
          <div className="flex max-w-96 flex-1 flex-col gap-y-2">
            <h4 className="text-xl font-bold">{t("RandomRoom")}</h4>
            <p className="text-lg">{t("CreateRoomMessage")}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SpeakingPage
