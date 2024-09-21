"use server"

import { type ActionResponse } from "@/types"
import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"
import { getErrorResult } from "@/lib/utils"

export const createPayment = async (
  packageId: number
): Promise<ActionResponse<undefined, { paymentUrl: string }>> => {
  try {
    const { getToken } = auth()

    const { data } = await prep4Api.post<{ data: { checkoutUrl: string } }>(
      "/api/payment/create",
      {
        lang: null,
        email: null,
        name: null,
        phoneNumber: null,
        requestType: null,
        premiumPackageId: packageId,
        paymentTypeId: 2, //TODO: this hardcode id is for PayOS, Momo later
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      }
    )

    return { isSuccess: true, data: { paymentUrl: data.data.checkoutUrl } }
  } catch (error) {
    return getErrorResult(error)
  }
}
