"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk"
import { Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"

import ChangeLayoutDropdown from "./change-layout-dropdown"
import EndCallButton from "./end-call-button"

export type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !!searchParams.get("personal")
  const router = useRouter()
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const { useCallCallingState } = useCallStateHooks()

  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED)
    return (
      <div className="mt-8 flex justify-center">
        <Icons.Loader className="size-12" />
      </div>
    )

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />
      default:
        return <SpeakerLayout participantsBarPosition="right" />
    }
  }

  return (
    <div className="fixed inset-0 z-[999] bg-neutral-900 text-white">
      <section className="relative size-full overflow-hidden">
        <div className="relative flex size-full items-center justify-center">
          <div className="flex size-full max-w-[1000px] items-center">
            <CallLayout />
          </div>
          <div
            className={cn("ml-2 hidden h-[calc(100vh-86px)]", {
              "show-block": showParticipants,
            })}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
        </div>
        {/* video layout and call controls */}
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <CallControls onLeave={() => router.push(`/`)} />

          <ChangeLayoutDropdown layout={layout} setLayout={setLayout} />

          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </section>
    </div>
  )
}

export default MeetingRoom
