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

const getComments = cache(
  async (
    params: Params
  ): Promise<{ comments: Comment[]; page: number; totalPage: number }> => {
    try {
      const { data } = await prep4Api.get<{
        data: { comments: Comment[]; page: number; totalPage: number }
      }>(`/api/comments/${params.testId}`)

      return data.data || { comments: [], page: 0, totalPage: 0 }
    } catch (error) {
      return { comments: [], page: 0, totalPage: 0 }
    }
  }
)

export default getComments
