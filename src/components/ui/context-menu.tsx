"use client"

/**
 * @registry-slug context-menu
 * @registry-name Context Menu
 * @registry-description A Future UI Context Menu component with layout variants, color themes, and premium styling.
 * @registry-category ui
 * @registry-type components:ui
 */

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

export type ContextMenuColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ContextMenuVariant = "default" | "elevated" | "bordered" | "minimal" | "premium";
export type ContextMenuShape = "default" | "square" | "rounded" | "sharp";
export type ContextMenuSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface ContextMenuContextValue {
  variant: ContextMenuVariant;
  color: ContextMenuColor;
  shape: ContextMenuShape;
  spacing: ContextMenuSpacing;
}

const ContextMenuContext = React.createContext<ContextMenuContextValue>({
  variant: "default",
  color: "default",
  shape: "default",
  spacing: "default",
});

export interface ContextMenuProps extends React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Root> {
  variant?: ContextMenuVariant;
  color?: ContextMenuColor;
  shape?: ContextMenuShape;
  spacing?: ContextMenuSpacing;
}

const variantMap: Record<ContextMenuVariant, { content: string; item: string; checkboxItem: string; separator: string; }> = {
  default: {
    content: "border border-border bg-background shadow-md",
    item: "",
    checkboxItem: "",
    separator: "bg-border",
  },
  elevated: {
    content: "border-0 bg-background shadow-xl shadow-black/10 dark:shadow-black/30 backdrop-blur-xl",
    item: "",
    checkboxItem: "",
    separator: "bg-border/50",
  },
  bordered: {
    content: "border-2 border-border bg-background shadow-none",
    item: "",
    checkboxItem: "",
    separator: "bg-border/60",
  },
  minimal: {
    content: "border-0 shadow-none bg-background/95",
    item: "",
    checkboxItem: "",
    separator: "bg-border/30",
  },
  premium: {
    content: "border border-white/20 dark:border-white/10 bg-background/80 backdrop-blur-2xl shadow-2xl shadow-black/5 dark:shadow-black/20",
    item: "",
    checkboxItem: "",
    separator: "bg-border/40",
  },
};

const ContextMenu: React.FC<ContextMenuProps> = ({ variant = "default", color = "default", shape = "default", spacing = "default", children, ...props }) => {
  return (
    <ContextMenuContext.Provider value={{ variant, color, shape, spacing }}>
      <ContextMenuPrimitive.Root {...props}>{children}</ContextMenuPrimitive.Root>
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const getFocusClasses = (color: ContextMenuColor, variant: ContextMenuVariant) => {
  const colorFocus = color !== "default"
    ? `focus:bg-${color}-100 focus:text-${color}-900 dark:focus:bg-${color}-900/30 dark:focus:text-${color}-100 data-[state=open]:bg-${color}-100 dark:data-[state=open]:bg-${color}-900/30`
    : "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent";
  const variantFocus = variant === "elevated" ? "focus:scale-[1.02] transition-transform" : variant === "bordered" ? "focus:ring-1 focus:ring-inset focus:ring-border" : variant === "premium" ? "focus:backdrop-blur-sm" : "";
  return cn(colorFocus, variantFocus);
};

const getItemFocusClasses = (color: ContextMenuColor, variant: ContextMenuVariant) => {
  const colorFocus = color !== "default"
    ? `focus:bg-${color}-100 focus:text-${color}-900 dark:focus:bg-${color}-900/30 dark:focus:text-${color}-100`
    : "focus:bg-accent focus:text-accent-foreground";
  const variantFocus = variant === "elevated" ? "focus:scale-[1.02] transition-transform" : variant === "bordered" ? "focus:ring-1 focus:ring-inset focus:ring-border" : variant === "premium" ? "focus:backdrop-blur-sm" : "";
  return cn(colorFocus, variantFocus);
};

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => {
  const { color, variant, shape, spacing } = React.useContext(ContextMenuContext);

  return (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center gap-2 outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-colors",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-sm",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getFocusClasses(color, variant),
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto" />
    </ContextMenuPrimitive.SubTrigger>
  )
})
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => {
  const { variant, shape } = React.useContext(ContextMenuContext);
  return (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden p-1 text-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        variantMap[variant].content,
        shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
        className
      )}
      {...props}
    />
  )
})
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => {
  const { variant, shape } = React.useContext(ContextMenuContext);
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Content
        ref={ref}
        className={cn(
          "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden p-1 text-foreground animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
          variantMap[variant].content,
          shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl",
          className
        )}
        {...props}
      />
    </ContextMenuPrimitive.Portal>
  )
})
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { color, variant, shape, spacing } = React.useContext(ContextMenuContext);

  return (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        getItemFocusClasses(color, variant),
        className
      )}
      {...props}
    />
  )
})
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => {
  const { color, variant, shape, spacing } = React.useContext(ContextMenuContext);

  return (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getItemFocusClasses(color, variant),
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
})
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => {
  const { color, variant, shape, spacing } = React.useContext(ContextMenuContext);

  return (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        shape === "square" ? "rounded-none" : shape === "sharp" ? "rounded-[2px]" : "rounded-md",
        spacing === "2x" ? "py-1 pl-8 pr-2 text-xs" : spacing === "6x" || spacing === "8x" ? "py-2 pl-10 pr-3 text-base" : "py-1.5 pl-8 pr-2 text-sm",
        getItemFocusClasses(color, variant),
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
})
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => {
  const { spacing } = React.useContext(ContextMenuContext);
  return (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        "font-semibold text-foreground",
        spacing === "2x" ? "px-2 py-1 text-xs" : spacing === "6x" || spacing === "8x" ? "px-3 py-2 text-base" : "px-2 py-1.5 text-sm",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
})
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(ContextMenuContext);
  return (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn("-mx-1 my-1 h-px", variantMap[variant].separator, className)}
      {...props}
    />
  );
})
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground opacity-60",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
