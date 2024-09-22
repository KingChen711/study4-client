"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import useSpeakingRoom from "@/hooks/use-speaking-room"
import { Icons } from "@/components/ui/icons"
import ParseHtml from "@/components/ui/parse-html"

import ChangeLayoutDropdown from "./change-layout-dropdown"

export type CallLayoutType = "grid" | "speaker-left" | "speaker-right"

type Props = {
  id: string
}

const MeetingRoom = ({ id }: Props) => {
  const router = useRouter()
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left")
  const [showParticipants, setShowParticipants] = useState(false)
  const [showSpeakingSample, setShowSpeakingSample] = useState(false)
  const { useCallCallingState } = useCallStateHooks()
  const { data } = useSpeakingRoom(id)

  const callingState = useCallCallingState()

  useEffect(() => {
    console.log({ data })
  }, [data])

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

  const handleLeaveRoom = async () => {
    router.push("/speaking")
  }

  return (
    <div className="fixed inset-0 z-[999] bg-neutral-900 text-white">
      <section className="relative flex h-screen max-h-screen flex-col overflow-hidden p-4 sm:p-8">
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="flex size-full max-w-[1200px]">
            <CallLayout />
          </div>
          <div
            className={cn("ml-4 hidden h-full", showParticipants && "block")}
          >
            <CallParticipantsList onClose={() => setShowParticipants(false)} />
          </div>
          <div
            className={cn(
              "ml-4 hidden h-full max-h-[70dvh] overflow-y-auto rounded-xl border bg-background p-4 text-foreground",
              showSpeakingSample && "block"
            )}
          >
            <h3 className="mb-6 text-xl font-bold">
              {data?.speakingSample.speakingSampleName}
            </h3>
            <div className="flex flex-col">
              {data?.speakingSample.speakingParts.map((sp) => (
                <div className="flex flex-col" key={sp.speakingSampleId}>
                  <div className="font-bold">Part {sp.speakingPartNumber}</div>
                  <ParseHtml data={sp.speakingPartDescription} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* video layout and call controls */}
        <div className="flex w-full shrink-0 items-center justify-center gap-5">
          <CallControls onLeave={handleLeaveRoom} />

          <ChangeLayoutDropdown layout={layout} setLayout={setLayout} />

          <CallStatsButton />
          <button onClick={() => setShowParticipants((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Users size={20} className="text-white" />
            </div>
          </button>
          <button onClick={() => setShowSpeakingSample((prev) => !prev)}>
            <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Icons.Test className="size-5 text-white" />
            </div>
          </button>
        </div>
      </section>
    </div>
  )
}

export default MeetingRoom
