import React from "react"

import CategoryBadges from "@/components/badges/category-badge"

function CategoryList() {
  return (
    <div className="flex flex-wrap gap-2">
      <CategoryBadges title="All" active />
      <CategoryBadges title="IELTS Academic" active={false} />
      <CategoryBadges title="IELTS General" active={false} />
    </div>
  )
}

export default CategoryList
