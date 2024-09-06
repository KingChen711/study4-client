import { cache } from "react"

import "server-only"

import getCreateTestItem, { type PartitionTag } from "./get-create-test-items"

const getPartitionTags = cache(async (): Promise<PartitionTag[]> => {
  try {
    const createTestItem = await getCreateTestItem()

    return createTestItem?.partitionTags || []
  } catch (error) {
    return []
  }
})

export default getPartitionTags
