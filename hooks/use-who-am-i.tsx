"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type User = {
  id: number
  userId: string
  clerkId: string
  firstName: string
  lastName: string
  email: string
  username: string
  phone: string
  avatarImage: null
  isActive: true
  dateOfBirth: Date
  createDate: Date
  testTakenDate: Date
  targetScore: string
  roleId: number
  role: {
    roleId: number
    roleName: "Staff" | "Admin" | "Student"
  }
}

function useWhoAmI() {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["users", "who-am-i"],
    queryFn: async () => {
      return prep4Api
        .get<User>(`/api/users/who-am-i`, {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data || null)
        .catch((_: Error) => {
          return null
        })
    },
  })
}

export default useWhoAmI
