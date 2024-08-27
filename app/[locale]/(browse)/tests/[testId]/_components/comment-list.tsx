import React from "react"

type Props = {
  testId: string
}

function CommentList({ testId }: Props) {
  return <div className="rounded-lg border p-4">CommentList:{testId}</div>
}

export default CommentList
