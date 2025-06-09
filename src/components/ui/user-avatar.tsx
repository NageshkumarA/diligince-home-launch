
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

const userAvatarVariants = cva("", {
  variants: {
    userType: {
      industry: "ring-2 ring-industry-200",
      expert: "ring-2 ring-expert-200",
      vendor: "ring-2 ring-vendor-200",
      admin: "ring-2 ring-admin-200",
      default: "",
    },
    size: {
      sm: "h-6 w-6 text-xs",
      md: "h-8 w-8 text-sm",
      lg: "h-10 w-10 text-base",
      xl: "h-12 w-12 text-lg",
      "2xl": "h-16 w-16 text-xl",
    },
  },
  defaultVariants: {
    userType: "default",
    size: "md",
  },
})

const fallbackVariants = cva("font-medium", {
  variants: {
    userType: {
      industry: "bg-industry-100 text-industry-700",
      expert: "bg-expert-100 text-expert-700",
      vendor: "bg-vendor-100 text-vendor-700",
      admin: "bg-admin-100 text-admin-700",
      default: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    userType: "default",
  },
})

export interface UserAvatarProps
  extends React.ComponentPropsWithoutRef<typeof Avatar>,
    VariantProps<typeof userAvatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

const UserAvatar = React.forwardRef<
  React.ElementRef<typeof Avatar>,
  UserAvatarProps
>(({ className, userType, size, src, alt, fallback, ...props }, ref) => {
  return (
    <Avatar
      className={cn(userAvatarVariants({ userType, size, className }))}
      ref={ref}
      {...props}
    >
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback className={cn(fallbackVariants({ userType }))}>
        {fallback}
      </AvatarFallback>
    </Avatar>
  )
})
UserAvatar.displayName = "UserAvatar"

export { UserAvatar, userAvatarVariants }
