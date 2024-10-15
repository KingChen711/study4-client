import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type PremiumInfo = {
  premiumPackageId: number
  premiumPackageName: string
  createDate: Date
  description: string
  expireDate: Date
  isPremiumActive: false
  totalTrials: number
}

export type Tag = { tagId: string; tagName: string }

const getUserPremium = cache(async (): Promise<PremiumInfo | null> => {
  const { getToken } = auth()
  try {
    const { data } = await prep4Api.get<{ data: PremiumInfo }>(
      "/api/user-premium",
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    return data.data || null
  } catch (error) {
    return null
  }
})

export default getUserPremium
