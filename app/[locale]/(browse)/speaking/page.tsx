import React from "react"
import Link from "next/link"
import { getTranslations } from "@/queries/i18n/get-translations"

import { Icons } from "@/components/ui/icons"

import JoinRoomForm from "./[id]/_components/join-room-form"

async function SpeakingPage() {
  const t = await getTranslations("SpeakingPage")

  return (
    <>
      <main className="grid grid-cols-12 py-16">
        <div className="col-span-12 flex flex-col items-center justify-center py-6 lg:col-span-6 lg:items-start">
          <div className="mb-6 max-w-lg text-pretty text-center text-3xl lg:text-start lg:text-5xl">
            {t("Title")}
          </div>

          <p className="mb-16 max-w-lg text-pretty text-center text-sm text-muted-foreground lg:text-start lg:text-lg">
            {t("Description")}
          </p>

          <JoinRoomForm />
        </div>

        <div className="col-span-12 flex items-center justify-center p-6 lg:col-span-6">
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
                <p className="text-lg">{t("RandomRoomMessage")}</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SpeakingPage
