
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sectionVariants = cva("", {
  variants: {
    padding: {
      none: "",
      sm: "py-8 lg:py-12",
      md: "py-12 lg:py-16",
      lg: "py-16 lg:py-24",
      xl: "py-20 lg:py-32",
    },
    background: {
      default: "bg-background",
      muted: "bg-muted/50",
      accent: "bg-accent/50",
      industry: "bg-industry-50",
      expert: "bg-expert-50",
      vendor: "bg-vendor-50",
      admin: "bg-admin-50",
    },
  },
  defaultVariants: {
    padding: "lg",
    background: "default",
  },
})

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, background, ...props }, ref) => {
    return (
      <section
        className={cn(sectionVariants({ padding, background, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section, sectionVariants }
