
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva("font-heading font-bold tracking-tight", {
  variants: {
    level: {
      1: "text-4xl md:text-5xl lg:text-6xl",
      2: "text-3xl md:text-4xl lg:text-5xl",
      3: "text-2xl md:text-3xl lg:text-4xl",
      4: "text-xl md:text-2xl lg:text-3xl",
      5: "text-lg md:text-xl lg:text-2xl",
      6: "text-base md:text-lg lg:text-xl",
    },
    variant: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-foreground",
      industry: "text-industry-600",
      expert: "text-expert-600",
      vendor: "text-vendor-600",
      admin: "text-admin-600",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    level: 1,
    variant: "default",
    align: "left",
  },
})

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, 'className'>,
    VariantProps<typeof headingVariants> {
  className?: string
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, variant, align, children, ...props }, ref) => {
    const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

    return React.createElement(
      HeadingTag,
      {
        className: cn(headingVariants({ level, variant, align, className })),
        ref,
        ...props,
      },
      children
    )
  }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
