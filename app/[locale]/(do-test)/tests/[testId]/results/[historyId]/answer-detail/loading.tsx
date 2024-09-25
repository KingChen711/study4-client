import React from "react"

import { Icons } from "@/components/ui/icons"

function Loading() {
  return (
    <div className="mt-8 flex justify-between">
      <Icons.Loader className="size-12" />
    </div>
  )
}

export default Loading