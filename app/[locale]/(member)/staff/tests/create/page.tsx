import React from "react"
import Link from "next/link"
import getCreateTestItem from "@/queries/test/create-test-items/get-create-test-items"
import { ArrowLeftIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import TestForm from "../_components/test-form"

async function CreateTestPage() {
  const items = await getCreateTestItem()

  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between gap-x-5">
        <h3 className="text-2xl font-semibold">Create test</h3>
        <Button asChild>
          <Link href="/staff/tests">
            <ArrowLeftIcon className="mr-1 size-5" />
            Back to list
          </Link>
        </Button>
      </div>

      <TestForm
        categoryItems={items?.testCategories || []}
        partitionTagItems={items?.partitionTags || []}
        tagItems={items?.tags || []}
        type="create"
      />
    </section>
  )
}

export default CreateTestPage
