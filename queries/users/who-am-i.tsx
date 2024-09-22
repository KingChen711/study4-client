import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

type Role = {
  roleName: string
}

export type User = {
  userId: string
  role: Role
}

export type Tag = { tagId: string; tagName: string }

const whoAmI = cache(async (): Promise<User | null> => {
  const { getToken } = auth()
  try {
    const { data } = await prep4Api.get<User | null>("/api/users/who-am-i", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    return data || null
  } catch (error) {
    return null
  }
})

export default whoAmI
