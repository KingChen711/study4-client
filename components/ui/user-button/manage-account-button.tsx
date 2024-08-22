import React from "react"
import { useClerk } from "@clerk/nextjs"

import { Icons } from "../icons"

type Props = {
  t: (key: string, params?: Record<string, string>) => string
  setOpen: (value: boolean) => void
}

function ManageAccountButton({ t, setOpen }: Props) {
  const { openUserProfile } = useClerk()
  return (
    <div
      className="flex w-full items-center justify-start gap-x-3 text-nowrap px-6 py-3 text-sm font-medium hover:cursor-pointer hover:bg-muted"
      onClick={() => {
        setOpen(false)
        openUserProfile()
      }}
    >
      <div className="flex items-center justify-center px-3">
        <Icons.Setting className="size-5" />
      </div>
      {t("ManageAccount")}
    </div>
  )
}

export default ManageAccountButton
