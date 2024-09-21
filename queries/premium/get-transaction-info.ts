import { cache } from "react"

import "server-only"

import { type TransactionInfo } from "@/types"

import prep4Api from "@/lib/prep4-api"

export type Package = {
  premiumPackageId: number
  premiumPackageName: string
  price: number
  durationInMonths: number
  description: string
}

const getTransactionInfo = cache(
  async (paymentLinkId: string): Promise<TransactionInfo | null> => {
    try {
      const { data } = await prep4Api.get<TransactionInfo>(
        `/api/payment/pay-os/payment-link-information/${paymentLinkId}`
      )

      return data || null
    } catch (error) {
      return null
    }
  }
)

export default getTransactionInfo
