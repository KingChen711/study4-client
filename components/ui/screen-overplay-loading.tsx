"use client"

import React from "react"
import { useOverlay } from "@/stores/use-overlay"

import { Progress } from "./progress"

function ScreenOverlayLoading() {
  const { showing, progress } = useOverlay()

  if (!showing) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-foreground/50">
      <Progress value={progress} className="absolute left-0 top-0 h-1 w-full" />
    </div>
  )
}

export default ScreenOverlayLoading
