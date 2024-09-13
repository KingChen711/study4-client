import React from "react"
import getComments from "@/queries/comment/get-comments"

import CommentContainer from "./comment-container"
import MoreComments from "./more-comments"
import CommentAnswer from "./test-info/comment-answer"

type Props = {
  testId: string
}

//TODO:i18n

async function CommentList({ testId }: Props) {
  const { comments, totalPage } = await getComments({
    testId,
    page: 1,
    pageSize: 1,
  })

  return (
    <div className="flex flex-col rounded-lg border p-6">
      <div className="mb-2 text-lg font-bold">Bình luận</div>

      <CommentAnswer root />

      {comments.map((comment) => (
        <CommentContainer key={comment.commentId} comment={comment} />
      ))}

      <MoreComments testId={testId} totalPage={totalPage} />
    </div>
  )
}

export default CommentList
