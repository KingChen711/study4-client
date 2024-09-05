import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

//TODO:

type Comment = {
  commentId: number
  commentDate: Date
  content: string
  level: number
  totalChildNode: number
  userId: string
  user: null
  inverseParentComment: Comment[]
  parentCommentId: number
  testId: string
}

type Params = {
  testId: string
}

const getComments = cache(async (params: Params): Promise<Comment[]> => {
  try {
    const { data } = await prep4Api.get<{ data: Comment[] }>(
      `/api/comments/${params.testId}`
    )

    return data.data || []
  } catch (error) {
    return []
  }
})

export default getComments
