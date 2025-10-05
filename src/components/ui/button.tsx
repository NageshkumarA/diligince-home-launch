import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-corporate-navy-500 text-white hover:bg-corporate-navy-600",
        destructive:
          "bg-corporate-danger-500 text-white hover:bg-corporate-danger-600",
        outline:
          "border border-corporate-gray-200 bg-white hover:bg-corporate-gray-50 hover:text-corporate-gray-900",
        secondary:
          "bg-corporate-gray-500 text-white hover:bg-corporate-gray-600",
        ghost: "hover:bg-corporate-gray-50 hover:text-corporate-gray-900",
        link: "text-corporate-navy-500 underline-offset-4 hover:underline",
        success: "bg-corporate-success-500 text-white hover:bg-corporate-success-600",
        info: "bg-corporate-info-500 text-white hover:bg-corporate-info-600",
        warning: "bg-corporate-warning-500 text-corporate-gray-900 hover:bg-corporate-warning-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
