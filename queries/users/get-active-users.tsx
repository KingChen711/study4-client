import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type Tag = { tagId: string; tagName: string }

type User = {
  id: number
  userId: string
  clerkId: string
  firstName: string
  lastName: string
  email: string
  username: ""
  phone: string
  avatarImage: string | null
  isActive: boolean
  dateOfBirth: Date
  createDate: Date
  testTakenDate: Date
  targetScore: string
  roleId: number
  role: {
    roleId: number
    roleName: "Student" | "Staff" | "Admin"
  }
}

type GetUsersResult = { users: User[]; page: number; totalPage: number }

const getActiveUsers = cache(
  async (params: {
    page: number
    pageSize: number
    term: string
  }): Promise<GetUsersResult> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: GetUsersResult }>(
        "/api/users",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          params,
        }
      )

      return data.data || { page: 0, totalPage: 0, users: [] }
    } catch (error) {
      return { page: 0, totalPage: 0, users: [] }
    }
  }
)

export default getActiveUsers
