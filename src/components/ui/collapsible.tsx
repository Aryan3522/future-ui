"use client"

/**
 * @registry-slug collapsible
 * @registry-name Collapsible
 * @registry-description A standard Collapsible component.
 * @registry-category ui
 * @registry-type components:ui
 */


import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
