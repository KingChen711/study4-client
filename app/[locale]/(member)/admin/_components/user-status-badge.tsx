import { Badge } from "@/components/ui/badge"

type Props = {
  status: "Active" | "Inactive"
}

function UserStatusBadge({ status }: Props) {
  return (
    <div className="flex items-center gap-x-3">
      <Badge
        className="flex w-[90px] justify-center text-sm font-extrabold"
        variant={status === "Active" ? "success" : "secondary"}
      >
        {status}
      </Badge>
    </div>
  )
}

export default UserStatusBadge
