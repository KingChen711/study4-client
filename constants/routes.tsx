import { Icons } from "@/components/ui/icons"

export const staffRoutes = [
  {
    route: "/staff",
    label: "Dashboard",
    Icon: (props: { className?: string }) => {
      return <Icons.Analysis {...props} />
    },
  },
  {
    route: "/staff/tests",
    label: "Tests",
    Icon: (props: { className?: string }) => {
      return <Icons.Test {...props} />
    },
  },
]

export const adminRoutes = [
  {
    route: "/admin",
    label: "Dashboard",
    Icon: (props: { className?: string }) => {
      return <Icons.Analysis {...props} />
    },
  },
  {
    route: "/admin/users",
    label: "Users",
    Icon: (props: { className?: string }) => {
      return <Icons.User {...props} />
    },
  },
  {
    route: "/admin/transactions",
    label: "Transactions",
    Icon: (props: { className?: string }) => {
      return <Icons.Transaction {...props} />
    },
  },
]
