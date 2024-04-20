import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CircleCheck,
  CircleX,
  Info,
  TriangleAlert,
} from "lucide-react"

import { cn } from "@/lib/utils"

const containerVariants = cva(
  "rounded-md p-4",
  {
    variants: {
      variant: {
        info: "bg-blue-50",
        success: "bg-green-50",
        warning: "bg-yellow-50",
        destructive: "bg-red-50",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

const iconVariants = cva(
  "h-5 w-5",
  {
    variants: {
      variant: {
        info: "text-blue-400",
        success: "text-green-400",
        warning: "text-yellow-400",
        destructive: "text-red-400",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

const titleVariants = cva(
  "text-sm font-medium",
  {
    variants: {
      variant: {
        info: "text-blue-800",
        success: "text-green-800",
        warning: "text-yellow-800",
        destructive: "text-red-800",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

const descriptionVariants = cva(
  "mt-2 text-sm",
  {
    variants: {
      variant: {
        info: "text-blue-700",
        success: "text-green-700",
        warning: "text-yellow-700",
        destructive: "text-red-700",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
)

interface TwAlertProps extends VariantProps<typeof containerVariants> {
  message?: string | null
}

const titleMap = {
  info: "안내",
  success: "성공",
  warning: "경고",
  destructive: "오류",
}

const iconMap = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  destructive: CircleX,
}

export function TwAlert({
  variant = "info",
  message,
}: TwAlertProps) {
  const Icon = iconMap[variant!]

  if (!message) return <></>

  return (
    <div className={cn(containerVariants({ variant }))}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={cn(iconVariants({ variant }))}
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className={cn(titleVariants({ variant }))}>
            {titleMap[variant!]}
          </h3>
          <div className={cn(descriptionVariants({ variant }))}>
            <p>
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
