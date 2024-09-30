import React from "react"
import Link from "next/link"

import { Icons } from "@/components/ui/icons"

type Props = {
  id: number
  totalView: number
  totalWords: number
  title: string
}

function Flashcard({ id, title, totalView, totalWords }: Props) {
  return (
    <Link
      href={`/flashcards/list/${id}`}
      className="col-span-12 rounded-xl border p-4 transition-all hover:-translate-y-1 hover:shadow hover:shadow-primary sm:col-span-6 lg:col-span-3"
    >
      <div className="font-bold">{title}</div>
      <div className="mt-4 flex items-center">
        <Icons.Flashcards className="mr-1 size-4" />
        <p>{totalWords} từ</p>
        <p className="mx-2">|</p>
        <Icons.Engage className="mr-1 size-4" />
        {totalView}
      </div>
    </Link>
  )
}

export default Flashcard
