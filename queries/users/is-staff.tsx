import { cache } from "react"

import "server-only"

import whoAmI from "./who-am-i"

export type Tag = { tagId: string; tagName: string }

const isStaff = cache(async (): Promise<boolean> => {
  try {
    const currentUser = await whoAmI()

    console.log({ currentUser })

    return currentUser?.role.roleName === "Staff"
  } catch (error) {
    return false
  }
})

export default isStaff
