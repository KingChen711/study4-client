import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export interface Comment {
  commentId: number
  commentDate: string
  content: string
  level: number
  totalChildNode: number
  userId: string
  user: User
  inverseParentComment: Comment[]
  parentCommentId: number | null
}

export interface User {
  id: number
  userId: string
  clerkId: string
  email: string
  avatarImage: string | null
}

type Params = {
  testId: string
  page: number
  pageSize: number
}

const getComments = cache(async (params: Params): Promise<Comment[]> => {
  try {
    const { data } = await prep4Api.get<{ data: { comments: Comment[] } }>(
      `/api/comments/${params.testId}`
    )

    return data.data.comments || []
  } catch (error) {
    return []
  }
})

export default getComments
