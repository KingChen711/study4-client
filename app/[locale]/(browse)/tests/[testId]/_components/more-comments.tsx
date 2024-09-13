"use client"

import React, { useState } from "react"
import { type Comment } from "@/queries/comment/get-comments"

import prep4Api from "@/lib/prep4-api"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

import CommentContainer from "./comment-container"

type Props = {
  totalPage: number
  testId: string
}

function MoreComments({ totalPage, testId }: Props) {
  const [comments, setComments] = useState<Comment[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchMoreComment = async () => {
    setLoading(true)
    try {
      const { data } = await prep4Api.get<{
        data: { comments: Comment[]; page: number; totalPage: number }
      }>(`/api/comments/${testId}?page=${page + 1}&pageSize=${1}`)

      setPage(page + 1)

      return setComments((prev) => [...prev, ...data.data.comments])
    } catch (error) {
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {comments.map((comment) => (
        <CommentContainer key={comment.commentId} comment={comment} />
      ))}

      {loading && <Icons.Loader className="mx-auto mb-4 mt-2 size-12" />}

      {page < totalPage && (
        <Button disabled={loading} onClick={fetchMoreComment} variant="outline">
          Xem thêm
        </Button>
      )}
    </>
  )
}

export default MoreComments
