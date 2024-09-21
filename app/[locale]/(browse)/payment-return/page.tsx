import React from "react"
import { notFound } from "next/navigation"
import getTransactionInfo from "@/queries/premium/get-transaction-info"

import { verifyPayment } from "@/actions/payment/verify-payment"

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
    <div className="flex flex-col">
      <div>Payment Return</div>
      <div>Status: {transactionInfor.data.status}</div>
    </div>
  )
}

export default PaymentReturn
