import React from "react"
import { redirect } from "next/navigation"
import getTransactions from "@/queries/transactions/get-transactions"
import isAdmin from "@/queries/users/is-admin"
import { z } from "zod"

import { formatePrice, toDate } from "@/lib/utils"
import Paginator from "@/components/ui/paginator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import TransactionBadge from "../_components/transaction-badge"
import SearchForm from "./_components/search-form"

type Props = {
  searchParams: {
    searchValue: string
    pageIndex: string
    status: string
  }
}

const testSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
  searchValue: z.string().catch(""),
})

async function TransactionsManagementPage({ searchParams }: Props) {
  const { page, searchValue } = testSearchParamsSchema.parse(searchParams)

  if (!(await isAdmin())) return redirect("/")

  const paginationResult = await getTransactions({
    pageIndex: page,
    pageSize: 10,
    searchValue,
  })
  // const paginationResult = { pageIndex: 0, totalPage: 0, users: [] }

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between gap-x-5">
        <h3 className="text-2xl font-semibold">Transactions</h3>
        <SearchForm search={searchValue} placeholder="Search transactions..." />
      </div>

      <div className="my-5 rounded-2xl bg-card">
        <div className="grid w-full">
          <div className="relative overflow-x-auto">
            <Table className="border-collapse">
              <TableHeader className="rounded-lg bg-border">
                <TableRow className="rounded-lg">
                  <TableHead className="h-10 cursor-pointer rounded-l-lg">
                    <div className="flex items-center">
                      <p className="select-none">ID</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 cursor-pointer">
                    <div className="flex items-center">
                      <p className="select-none">Code</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center">
                      <p className="select-none text-nowrap">User</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none text-nowrap">Amount</p>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none">Transaction Date</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-end">
                      <p className="select-none">Created At</p>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginationResult.users.map((transaction) => (
                  <TableRow key={transaction.transactionId}>
                    <TableCell className="font-extrabold">
                      {transaction.transactionId}
                    </TableCell>
                    <TableCell className="font-extrabold">
                      {transaction.transactionCode}
                    </TableCell>

                    <TableCell>{transaction.user.email}</TableCell>
                    <TableCell className="text-center">
                      {formatePrice(transaction.paymentAmount)}đ
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <TransactionBadge
                          status={transaction.transactionStatus}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {transaction.transactionDate
                        ? toDate(transaction.transactionDate)
                        : ""}
                    </TableCell>
                    <TableCell className="text-end">
                      {toDate(transaction.createAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {paginationResult.users.length === 0 && (
          <div className="mt-36 text-center text-xl font-bold">
            Not found any Transactions.
          </div>
        )}
      </div>

      {paginationResult.users.length > 0 && (
        <Paginator
          metadata={{
            pageNumber: paginationResult.page,
            totalPages: paginationResult.totalPage,
          }}
        />
      )}
    </section>
  )
}

export default TransactionsManagementPage
