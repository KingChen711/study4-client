import { cache } from "react"

import "server-only"

import getCreateTestItem, { type TestCategory } from "./get-create-test-items"

const getTestCategories = cache(async (): Promise<TestCategory[]> => {
  try {
    const createTestItem = await getCreateTestItem()

    return createTestItem?.testCategories || []
  } catch (error) {
    return []
  }
})

export default getTestCategories
