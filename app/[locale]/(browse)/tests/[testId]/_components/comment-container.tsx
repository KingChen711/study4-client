"use client"

import React from "react"
import Image from "next/image"
import { type Comment } from "@/queries/comment/get-comments"

import { getUsernameFromEmail, toDateTime2 } from "@/lib/utils"

import CommentAnswer from "./test-info/comment-answer"

type Props = {
  comment: Comment
}

function CommentContainer({ comment }: Props) {
  return (
    <div className="flex gap-x-3">
      <div>
        <Image
          height={36}
          width={36}
          src={comment.user.avatarImage || "/default-avatar.png"}
          alt="avatar"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="font-semibold">
          {getUsernameFromEmail(comment.user.email)}
          {" , "}
          <span className="font-normal">
            {toDateTime2(new Date(comment.commentDate))}
          </span>
        </p>
        <p>{comment.content}</p>

        <CommentAnswer />

        <div className="flex flex-col gap-y-2">
          {comment.inverseParentComment.map((c) => (
            <CommentContainer key={c.commentId} comment={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CommentContainer
