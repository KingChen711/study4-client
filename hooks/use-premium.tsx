"use client"

import { useAuth } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"

import prep4Api from "@/lib/prep4-api"

type PremiumInfo = {
  premiumPackageId: number
  premiumPackageName: string
  createDate: Date
  description: string
  expireDate: Date
  isPremiumActive: false
}

function usePremium() {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ["users-premium"],
    queryFn: async () => {
      return prep4Api
        .get<{ data: PremiumInfo }>("/api/user-premium", {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        })
        .then((res) => res.data.data || null)
        .catch((_: Error) => {
          return null
        })
    },
  })
}

export default usePremium
