import React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"
import { Skeleton } from "@/components/ui/skeleton"

import AddToLearningListButton from "./add-to-learning-list-button"

type Props = {
  id: number
  totalView: number
  totalWords: number
  title: string
  description: string | null
  isAdded?: boolean
  showAdded?: boolean
  linkToPrivacy?: boolean
}

function Flashcard({
  id,
  title,
  totalView,
  totalWords,
  description,
  isAdded,
  showAdded = true,
  linkToPrivacy = false,
}: Props) {
  return (
    <Link
      href={`/flashcards/list/${id}${linkToPrivacy ? "/privacy" : ""}`}
      className="col-span-12 flex flex-col rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow hover:shadow-primary sm:col-span-6 lg:col-span-3"
    >
      <div className="font-bold">{title}</div>
      <div className="my-2 flex-1 items-center">
        <div className="flex items-center">
          <Icons.Flashcards className="mr-1 size-4" />
          <p>{totalWords} từ</p>
          <p className="mx-2">|</p>
          <Icons.Engage className="mr-1 size-4" />
          {totalView}
        </div>
      </div>
      {description && <p className="text-sm">{description}</p>}
      {showAdded && (
        <>
          {isAdded ? (
            <Button variant="outline" className="cursor-default">
              Đã thêm
            </Button>
          ) : (
            <AddToLearningListButton flashcardId={id} type="on-card" />
          )}
        </>
      )}
    </Link>
  )
}

export default Flashcard

export function FlashcardSkeleton() {
  return (
    <Skeleton className="col-span-12 h-[122px] rounded-xl sm:col-span-6 lg:col-span-3" />
  )
}
