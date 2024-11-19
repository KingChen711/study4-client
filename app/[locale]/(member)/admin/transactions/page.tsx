import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import isAdmin from "@/queries/users/is-admin"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Paginator from "@/components/ui/paginator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TableRowsSkeleton from "@/components/ui/table-row-skeleton"

async function TransactionsManagementPage() {
  // if (!(await isAdmin())) return redirect("/")

  const transactions = []
  return <div>transactions</div>
}

export default TransactionsManagementPage
