import { Badge } from "@/components/ui/badge"

type Props = {
  status: "Student" | "Staff" | "Admin"
}

function RoleBadge({ status }: Props) {
  return (
    <div className="flex items-center gap-x-3">
      <Badge
        className="flex w-[90px] justify-center text-sm font-extrabold"
        variant={
          status === "Student"
            ? "success"
            : status === "Staff"
              ? "warning"
              : status === "Admin"
                ? "info"
                : "destructive"
        }
      >
        {status}
      </Badge>
    </div>
  )
}

export default RoleBadge
