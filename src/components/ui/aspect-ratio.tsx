"use client"

/**
 * @registry-slug aspect-ratio
 * @registry-name Aspect Ratio
 * @registry-description A standard Aspect Ratio component.
 * @registry-category ui
 * @registry-type components:ui
 */


import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

export type AspectRatioVariant = "16:9" | "4:3" | "1:1" | "21:9" | "3:2" | "9:16";

export interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  variant?: AspectRatioVariant;
}

const AspectRatio = React.forwardRef<React.ElementRef<typeof AspectRatioPrimitive.Root>, AspectRatioProps>(
  ({ variant = "16:9", ratio, ...props }, ref) => {
    let actualRatio = ratio;
    
    // If ratio is not explicitly provided, use the variant
    if (!ratio && variant) {
      switch (variant) {
        case "16:9": actualRatio = 16 / 9; break;
        case "4:3": actualRatio = 4 / 3; break;
        case "1:1": actualRatio = 1; break;
        case "21:9": actualRatio = 21 / 9; break;
        case "3:2": actualRatio = 3 / 2; break;
        case "9:16": actualRatio = 9 / 16; break;
        default: actualRatio = 16 / 9; break;
      }
    }
    
    return <AspectRatioPrimitive.Root ref={ref} ratio={actualRatio} {...props} />
  }
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
