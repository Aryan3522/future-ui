"use client"

/**
 * @registry-slug radio-group
 * @registry-name Radio Group
 * @registry-description A standard Radio Group component.
 * @registry-category ui
 * @registry-type components:ui
 */


import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const radioGroupVariants = cva(
  "grid",
  {
    variants: {
      variant: {
        default: "gap-2",
        comfortable: "gap-4",
        compact: "gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const radioItemVariants = cva(
  "aspect-square rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "h-4 w-4",
        comfortable: "h-5 w-5",
        compact: "h-3 w-3",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const RadioGroupContext = React.createContext<{ variant?: "default" | "comfortable" | "compact" | null }>({ variant: "default" })

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <RadioGroupContext.Provider value={{ variant }}>
      <RadioGroupPrimitive.Root
        className={cn(radioGroupVariants({ variant, className }))}
        {...props}
        ref={ref}
      />
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(RadioGroupContext)
  
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioItemVariants({ variant, className }))}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className={cn(
          "fill-current text-current", 
          variant === "comfortable" ? "h-3 w-3" : variant === "compact" ? "h-1.5 w-1.5" : "h-2.5 w-2.5"
        )} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
