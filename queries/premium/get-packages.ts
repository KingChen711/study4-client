import { cache } from "react"

import "server-only"

import prep4Api from "@/lib/prep4-api"

export type Package = {
  premiumPackageId: number
  premiumPackageName: string
  price: number
  durationInMonths: number
  description: string
}

export type Tag = { tagId: string; tagName: string }

const getPackages = cache(async (): Promise<Package[]> => {
  try {
    const { data } = await prep4Api.get<{ data: Package[] }>(
      "/api/premium-packages"
    )

    console.log(data.data)

    return data.data || []
  } catch (error) {
    console.log(error)

    return []
  }
})

export default getPackages
