import React from "react"
import { redirect } from "next/navigation"
import isStaff from "@/queries/users/is-staff"

async function StaffIndexPage() {
  if (!(await isStaff())) return redirect("/")

  return <div>StaffIndexPage</div>
}

export default StaffIndexPage
