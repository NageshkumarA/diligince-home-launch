
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      success: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200",
      error: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
      info: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      pending: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200",
      active: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
      draft: "bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200",
      published: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
    },
    size: {
      sm: "text-xs px-2 py-0.5",
      md: "text-sm px-2.5 py-0.5",
      lg: "text-base px-3 py-1",
    },
  },
  defaultVariants: {
    status: "info",
    size: "md",
  },
})

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ className, status, size, children, ...props }, ref) => {
    return (
      <Badge
        variant="outline"
        className={cn(statusBadgeVariants({ status, size, className }))}
        {...props}
      >
        {children}
      </Badge>
    )
  }
)
StatusBadge.displayName = "StatusBadge"

export { StatusBadge, statusBadgeVariants }
