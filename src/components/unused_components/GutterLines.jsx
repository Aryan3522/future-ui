import React from 'react'
import { cn } from "@/lib/utils"

export const GutterLines = ({className}) => {
    return <div className={cn("h-10 w-full bg-[repeating-linear-gradient(to_bottom,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_0.5rem)]", className)} />
}
