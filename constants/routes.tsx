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
