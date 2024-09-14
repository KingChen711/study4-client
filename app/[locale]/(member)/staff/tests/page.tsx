import React from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import isStaff from "@/queries/users/is-staff"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

async function StaffTestPage() {
  if (!(await isStaff())) return redirect("/")

  return (
    <section className="flex flex-col">
      <div className="flex items-center justify-between gap-x-5">
        <h3 className="text-2xl font-semibold">Tests</h3>
        {/* <SearchForm search={search} placeholder="Search jobs..." /> */}
        <Button asChild>
          <Link href="/staff/tests/create">
            <Plus className="mr-1 size-5" />
            Create test
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default StaffTestPage
