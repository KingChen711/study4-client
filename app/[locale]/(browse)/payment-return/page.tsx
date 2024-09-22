import React from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import depositSuccess from "@/assets/images/deposit-success.png"
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
        alt="payment-success"
        height={230}
        width={230}
        src={depositSuccess}
        className="aspect-square max-w-full"
      />
      <div className="text-xl font-bold">Bạn đã thanh toán thành công</div>
      <div>
        Cảm ơn vì đã thanh toán. Hy vọng bạn sẽ có một trải nghiệm tuyệt vời.
      </div>
      <Button variant="link">Back to Home</Button>
    </div>
  )
}

export default PaymentReturn
