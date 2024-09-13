"use client"

import React, { useState } from "react"
import { type Comment } from "@/queries/comment/get-comments"

import { Button } from "@/components/ui/button"

import CommentContainer from "./comment-container"

type Props = {
  totalPage: number
}

function MoreComments({ totalPage }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(2)

  return (
    <>
      {comments.map((comment) => (
        <CommentContainer key={comment.commentId} comment={comment} />
      ))}

      {page < totalPage && (
        <Button variant="outline" className="bg-transparent">
          Xem them
        </Button>
      )}
    </>
  )
}

export default MoreComments
