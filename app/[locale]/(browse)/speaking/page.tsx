"use client"

import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

function SpeakingPage() {
  return (
    <div>
      SpeakingPage
      {/* <Button disabled={pending} onClick={createMeeting}>
        Tìm partner {pending && <Icons.Loader className="ml-1 size-4" />}
      </Button> */}
      <Button>
        <Link href="/speaking/new-room">Tạo phòng</Link>
      </Button>
      <Button variant="outline">
        <Link href="/speaking/random-room">Tìm phòng ngẫu nhiên</Link>
      </Button>
    </div>
  )
}

export default SpeakingPage
