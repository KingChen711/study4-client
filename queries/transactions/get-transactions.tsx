import { cache } from "react"

import "server-only"

import { auth } from "@clerk/nextjs/server"

import prep4Api from "@/lib/prep4-api"

export type Tag = { tagId: string; tagName: string }

type Transaction = {
  transactionId: number
  transactionCode: string
  paymentLinkId: string
  paymentAmount: number
  transactionStatus: "PAID" | "PENDING" | "CANCELLED"
  createAt: Date
  transactionDate: Date
  cancellationReason: string | null
  cancelledAt: string | null
  userId: string
  user: {
    id: number
    userId: string
    clerkId: string
    firstName: string
    lastName: string
    email: string
    username: ""
    phone: string
    avatarImage: string | null
    isActive: boolean
    dateOfBirth: Date
    createDate: Date
    testTakenDate: Date
    targetScore: string
    roleId: number
  }
  userPremiumPackageId: number
  userPremiumPackage: {
    userPremiumPackageId: number
    expireDate: Date
    isActive: boolean
    userId: string
    premiumPackageId: number
    totalTrials: number
    premiumPackage: {
      premiumPackageId: number
      premiumPackageName: string
      price: number
      durationInMonths: number
      isActive: true
      createDate: Date
      description: string
      packageType: string
    }
  }
  paymentTypeId: 2
  paymentType: {
    paymentTypeId: 2
    paymentMethod: string
  }
}

type GetTransactionsResult = {
  users: Transaction[]
  page: number
  totalPage: number
}

const getTransactions = cache(
  async (params: {
    pageIndex: number
    pageSize: number
    searchValue: string
  }): Promise<GetTransactionsResult> => {
    const { getToken } = auth()
    try {
      const { data } = await prep4Api.get<{ data: GetTransactionsResult }>(
        "/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
          params,
        }
      )

      return data.data || { page: 0, totalPage: 0, users: [] }
    } catch (error) {
      return { page: 0, totalPage: 0, users: [] }
    }
  }
)

export default getTransactions
