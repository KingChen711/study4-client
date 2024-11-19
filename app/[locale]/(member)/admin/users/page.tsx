import React from "react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import getActiveUsers from "@/queries/users/get-active-users"
import getInactiveUsers from "@/queries/users/get-inactive-users"
import isAdmin from "@/queries/users/is-admin"
import { z } from "zod"

import { cn, toDate } from "@/lib/utils"
import Paginator from "@/components/ui/paginator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import RoleBadge from "../_components/role-badge"
import UserStatusBadge from "../_components/user-status-badge"
import SearchForm from "./_components/search-form"

type Props = {
  searchParams: {
    term: string
    page: string
    status: string
  }
}

const testSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .catch(1)
    .transform((value) => (value <= 0 ? 1 : value)),
  term: z.string().catch(""),
  status: z.enum(["active", "inactive"]).catch("active"),
})

async function UsersManagementPage({ searchParams }: Props) {
  const { page, term, status } = testSearchParamsSchema.parse(searchParams)
  if (!(await isAdmin())) return redirect("/")

  const paginationResult =
    status === "active"
      ? await getActiveUsers({ page, pageSize: 10, term })
      : await getInactiveUsers({ page, pageSize: 10, term })
  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between gap-x-5">
        <h3 className="text-2xl font-semibold">Users</h3>
        <SearchForm
          search={term}
          placeholder="Search users..."
          status={status}
        />
      </div>

      <div className="my-5 rounded-2xl bg-card">
        <div className="mb-4 flex gap-x-8 border-b">
          {["Active", "Inactive"].map((tab) => {
            const active = status === tab.toLowerCase()

            return (
              <Link
                href={`/admin/users?status=${tab.toLowerCase()}&page=1&term=${term}`}
                key={tab}
                className={cn(
                  "relative w-[70px] pb-4 text-center text-muted-foreground",
                  active && "font-bold text-card-foreground"
                )}
              >
                {tab}
                {active && (
                  <div className="absolute bottom-0 left-0 h-[3px] w-full bg-primary"></div>
                )}
              </Link>
            )
          })}
        </div>

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
                      <p className="select-none">Clerk ID</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center">
                      <p className="select-none text-nowrap">Email</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none text-nowrap">Phone</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none">Created At</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none">Taken Test Date</p>
                    </div>
                  </TableHead>
                  <TableHead className="h-10 w-fit cursor-pointer">
                    <div className="flex items-center justify-center">
                      <p className="select-none">Target Score</p>
                    </div>
                  </TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginationResult.users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-extrabold">{user.id}</TableCell>
                    <TableCell className="font-extrabold">
                      {user.clerkId}
                    </TableCell>
                    <TableCell className="flex items-center gap-x-3 font-semibold">
                      <Image
                        alt="avatar"
                        src={user.avatarImage || "/default-avatar.webp"}
                        height={32}
                        width={32}
                        className="rounded-md object-cover"
                      />
                      <p>{user.email}</p>
                    </TableCell>
                    <TableCell className="text-center">{user.phone}</TableCell>
                    <TableCell className="text-center">
                      {toDate(user.createDate)}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.testTakenDate ? toDate(user.testTakenDate) : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.targetScore}
                    </TableCell>
                    <TableCell>
                      <RoleBadge status={user.role.roleName} />
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge
                        status={user.isActive ? "Active" : "Inactive"}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {paginationResult.users.length === 0 && (
          <div className="mt-36 text-center text-xl font-bold">
            Not found any Users.
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

export default UsersManagementPage
