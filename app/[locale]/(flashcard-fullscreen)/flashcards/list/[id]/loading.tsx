import React from "react"

import { Icons } from "@/components/ui/icons"

function FlashcardFullscreenLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Icons.Loader className="size-12" />
    </div>
  )
}

export default FlashcardFullscreenLoading
