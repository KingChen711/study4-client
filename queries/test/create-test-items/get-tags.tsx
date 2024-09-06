import { cache } from "react"

import "server-only"

import getCreateTestItem, { type Tag } from "./get-create-test-items"

const getTags = cache(async (): Promise<Tag[]> => {
  try {
    const createTestItem = await getCreateTestItem()

    return createTestItem?.tags || []
  } catch (error) {
    return []
  }
})

export default getTags
