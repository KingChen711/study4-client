import React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import depositCancel from "@/assets/images/deposit-cancel.png"
import getTransactionInfo from "@/queries/premium/get-transaction-info"

import { verifyPayment } from "@/actions/payment/verify-payment"
import { Button } from "@/components/ui/button"

type Props = {
  searchParams: {
    id: string
  }
}

async function PaymentReturn({ searchParams: { id } }: Props) {
  const transactionInfor = await getTransactionInfo(id)

  if (!transactionInfor) return notFound()

  await verifyPayment(transactionInfor)

  return (
    <div className="flex flex-col items-center p-6">
      <Image
        alt="payment-cancel"
        height={483}
        width={322}
        src={depositCancel}
        className="aspect-[345/230] max-w-full"
      />
      <div className="text-xl font-bold">Bạn đã thanh toán thất bại</div>
      <div>Điều này thường xảy ra do bạn đã hủy thanh toán.</div>
      <Button variant="link">Back to Home</Button>
    </div>
  )
}

export default PaymentReturn
