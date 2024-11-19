import React from "react"
import { redirect } from "next/navigation"
import isAdmin from "@/queries/users/is-admin"

async function AdminIndexPage() {
  //   if (!(await isAdmin())) return redirect("/")

  return <div>Dashboard page</div>
}

export default AdminIndexPage
