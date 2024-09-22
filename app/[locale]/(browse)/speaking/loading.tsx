import React from "react"

import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
  return (
    <div>
      <Skeleton className="mb-6 mt-8 h-9 w-64" />
      <div className="flex flex-col gap-y-6">
        <Skeleton className="h-[143px] w-[500px]" />
        <Skeleton className="h-[143px] w-[500px]" />
      </div>
    </div>
  )
}

export default Loading
