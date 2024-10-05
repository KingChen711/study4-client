"use client"

import React from "react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

type Props = {
  text: string
  voiceType: "US" | "UK"
}

function TextToSpeak({ text, voiceType }: Props) {
  const speakText = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    // Kiểm tra nếu API SpeechSynthesis có sẵn
    if (!window.speechSynthesis) {
      console.error("SpeechSynthesis API is not supported in this browser.")
      return
    }

    // Kiểm tra text rỗng
    if (!text.trim()) {
      console.error("No text provided.")
      return
    }

    // Tạo một đối tượng SpeechSynthesisUtterance để phát âm
    const utterance = new SpeechSynthesisUtterance(text)

    // Lấy danh sách các giọng nói có sẵn từ API
    const voices = window.speechSynthesis.getVoices()

    // Chọn giọng nói dựa trên loại giọng
    const selectedVoice = voices.find((v) =>
      voiceType === "US" ? v.lang === "en-US" : v.lang === "en-GB"
    )

    if (selectedVoice) {
      // Gán giọng đã chọn cho utterance
      utterance.voice = selectedVoice
      window.speechSynthesis.speak(utterance)
    } else {
      console.error(`No ${voiceType} voice available.`)
    }
  }

  return (
    <Button onClick={speakText} variant="ghost" size="sm">
      <Icons.Sound className="mr-1 size-4 text-primary" />
      {voiceType}
    </Button>
  )
}

export default TextToSpeak
