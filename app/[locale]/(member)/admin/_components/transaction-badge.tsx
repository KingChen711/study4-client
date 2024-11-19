import { Badge } from "@/components/ui/badge"

type Props = {
  status: "PAID" | "PENDING" | "CANCELLED"
}

function TransactionBadge({ status }: Props) {
  return (
    <div className="flex items-center gap-x-3">
      <Badge
        className="flex w-[120px] justify-center text-sm font-extrabold"
        variant={
          status === "PAID"
            ? "success"
            : status === "PENDING"
              ? "warning"
              : "danger"
        }
      >
        {status}
      </Badge>
    </div>
  )
}

export default TransactionBadge
