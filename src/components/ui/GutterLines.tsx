/**
 * @registry-slug GutterLines
 * @registry-name GutterLines
 * @registry-description A standard GutterLines component.
 * @registry-category ui
 * @registry-type components:ui
 */
// @ts-nocheck
"use client";

import React from 'react'
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const gutterLinesVariants = cva(
  "w-full h-full",
  {
    variants: {
      variant: {
        default: "",
        dense: "",
        wide: "",
        vertical: "",
      },
      color: {
        default: "[--pattern:var(--color-neutral-300)] dark:[--pattern:var(--color-neutral-800)]",
        primary: "[--pattern:var(--color-primary)] opacity-20",
        muted: "[--pattern:var(--color-neutral-200)] dark:[--pattern:var(--color-neutral-900)]",
      }
    },
    defaultVariants: {
      variant: "default",
      color: "default",
    },
  }
)

export interface GutterLinesProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gutterLinesVariants> {}

export const GutterLines = React.forwardRef<HTMLDivElement, GutterLinesProps>(
  ({ className, variant, color, ...props }, ref) => {
    const spacing = variant === "dense" ? "0.25rem" : variant === "wide" ? "1rem" : "0.5rem";
    const direction = variant === "vertical" ? "to right" : "to bottom";
    
    return (
      <div 
        ref={ref}
        style={{
          backgroundImage: `repeating-linear-gradient(${direction}, var(--pattern) 0, var(--pattern) 1px, transparent 1px, transparent ${spacing})`,
          ...props.style
        }}
        className={cn(gutterLinesVariants({ variant, color, className }))} 
        {...props} 
      />
    )
  }
)
GutterLines.displayName = "GutterLines"

