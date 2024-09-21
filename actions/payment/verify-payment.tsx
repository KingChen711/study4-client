"use server"

import { type ActionResponse, type TransactionInfo } from "@/types"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const verifyPayment = async (
  body: TransactionInfo
): Promise<ActionResponse> => {
  try {
    await prep4Api.post("/payment/pay-os/verify-payment-webhook-data", body)

    return { isSuccess: true }
  } catch (error) {
    return getErrorResult(error)
  }
}
