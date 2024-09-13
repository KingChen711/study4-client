"use client"

import React, { useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  root?: boolean
}

function CommentAnswer({ root = false }: Props) {
  const [answer, setAnswer] = useState("")
  const [showAnswer, setShowAnswer] = useState(root)

  return (
    <>
      {!root && (
        <p
          onClick={() => {
            setShowAnswer((prev) => !prev)
          }}
          className="mb-2 cursor-pointer font-semibold text-success"
        >
          Trả lời
        </p>
      )}
      {showAnswer && (
        <div className={cn("mb-2 flex w-full items-center", root && "mb-4")}>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1"
            placeholder="Chia sẻ cảm nghĩ của bạn"
          />
          <Button size="sm" className="h-10 shrink-0 rounded-l-none">
            Gửi
          </Button>
        </div>
      )}
    </>
  )
}

export default CommentAnswer
