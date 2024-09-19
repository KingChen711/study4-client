"use server"

import { currentUser } from "@clerk/nextjs/server"
import { StreamChat } from "stream-chat"

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
  const user = await currentUser()

  if (!user) throw new Error("User is not logged in")
  if (!apiKey) throw new Error("No stream API key")
  if (!apiSecret) throw new Error("No stream API secret")

  const client = new StreamChat(apiKey, apiSecret)

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60
  const issued = Math.floor(Date.now() / 1000) - 60

  const token = client.createToken(user.id, exp, issued)

  return token
}
