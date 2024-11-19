import { cache } from "react"

import "server-only"

import whoAmI from "./who-am-i"

export type Tag = { tagId: string; tagName: string }

const isAdmin = cache(async (): Promise<boolean> => {
  try {
    const currentUser = await whoAmI()

    return currentUser?.role.roleName === "Admin"
  } catch (error) {
    return false
  }
})

export default isAdmin
