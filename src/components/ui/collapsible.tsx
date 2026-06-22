/**
 * @registry-slug collapsible
 * @registry-name Collapsible
 * @registry-description A Future UI Collapsible component with layout variants, color themes, and cinematic animations.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, MinusIcon } from "@/icons";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export type CollapsibleLayout = "default" | "minimal" | "contained" | "card" | "sidebar";
export type CollapsibleColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CollapsibleShape = "default" | "square" | "rounded" | "sharp";
export type CollapsibleSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface CollapsibleTheme {
  text: string;
  textMuted: string;
  border: string;
  borderActive: string;
  bg: string;
  bgHover: string;
  icon: string;
  ring: string;
  accent: string;
}

const colorThemeMap: Record<CollapsibleColor, CollapsibleTheme> = {
  default: {
    text: "text-foreground",
    textMuted: "text-muted-foreground",
    border: "border-border",
    borderActive: "border-foreground",
    bg: "bg-background",
    bgHover: "hover:bg-muted",
    icon: "text-muted-foreground",
    ring: "ring-foreground",
    accent: "bg-foreground",
  },
  blue: {
    text: "text-blue-700 dark:text-blue-300",
    textMuted: "text-blue-500 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    borderActive: "border-blue-600 dark:border-blue-500",
    bg: "bg-white dark:bg-blue-950/50",
    bgHover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    icon: "text-blue-400 dark:text-blue-500",
    ring: "ring-blue-500",
    accent: "bg-blue-600 dark:bg-blue-500",
  },
  emerald: {
    text: "text-emerald-700 dark:text-emerald-300",
    textMuted: "text-emerald-500 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    borderActive: "border-emerald-600 dark:border-emerald-500",
    bg: "bg-white dark:bg-emerald-950/50",
    bgHover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    icon: "text-emerald-400 dark:text-emerald-500",
    ring: "ring-emerald-500",
    accent: "bg-emerald-600 dark:bg-emerald-500",
  },
  rose: {
    text: "text-rose-700 dark:text-rose-300",
    textMuted: "text-rose-500 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
    borderActive: "border-rose-600 dark:border-rose-500",
    bg: "bg-white dark:bg-rose-950/50",
    bgHover: "hover:bg-rose-50 dark:hover:bg-rose-900/20",
    icon: "text-rose-400 dark:text-rose-500",
    ring: "ring-rose-500",
    accent: "bg-rose-600 dark:bg-rose-500",
  },
  amber: {
    text: "text-amber-700 dark:text-amber-300",
    textMuted: "text-amber-500 dark:text-amber-400",
    border: "border-amber-200 dark:border-amber-800",
    borderActive: "border-amber-600 dark:border-amber-500",
    bg: "bg-white dark:bg-amber-950/50",
    bgHover: "hover:bg-amber-50 dark:hover:bg-amber-900/20",
    icon: "text-amber-400 dark:text-amber-500",
    ring: "ring-amber-500",
    accent: "bg-amber-600 dark:bg-amber-500",
  },
  violet: {
    text: "text-violet-700 dark:text-violet-300",
    textMuted: "text-violet-500 dark:text-violet-400",
    border: "border-violet-200 dark:border-violet-800",
    borderActive: "border-violet-600 dark:border-violet-500",
    bg: "bg-white dark:bg-violet-950/50",
    bgHover: "hover:bg-violet-50 dark:hover:bg-violet-900/20",
    icon: "text-violet-400 dark:text-violet-500",
    ring: "ring-violet-500",
    accent: "bg-violet-600 dark:bg-violet-500",
  },
  indigo: {
    text: "text-indigo-700 dark:text-indigo-300",
    textMuted: "text-indigo-500 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-800",
    borderActive: "border-indigo-600 dark:border-indigo-500",
    bg: "bg-white dark:bg-indigo-950/50",
    bgHover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
    icon: "text-indigo-400 dark:text-indigo-500",
    ring: "ring-indigo-500",
    accent: "bg-indigo-600 dark:bg-indigo-500",
  },
  sky: {
    text: "text-sky-700 dark:text-sky-300",
    textMuted: "text-sky-500 dark:text-sky-400",
    border: "border-sky-200 dark:border-sky-800",
    borderActive: "border-sky-600 dark:border-sky-500",
    bg: "bg-white dark:bg-sky-950/50",
    bgHover: "hover:bg-sky-50 dark:hover:bg-sky-900/20",
    icon: "text-sky-400 dark:text-sky-500",
    ring: "ring-sky-500",
    accent: "bg-sky-600 dark:bg-sky-500",
  },
  slate: {
    text: "text-slate-700 dark:text-slate-300",
    textMuted: "text-slate-500 dark:text-slate-400",
    border: "border-slate-200 dark:border-slate-800",
    borderActive: "border-slate-600 dark:border-slate-500",
    bg: "bg-white dark:bg-slate-950/50",
    bgHover: "hover:bg-slate-50 dark:hover:bg-slate-900/20",
    icon: "text-slate-400 dark:text-slate-500",
    ring: "ring-slate-500",
    accent: "bg-slate-600 dark:bg-slate-500",
  },
  orange: {
    text: "text-orange-700 dark:text-orange-300",
    textMuted: "text-orange-500 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
    borderActive: "border-orange-600 dark:border-orange-500",
    bg: "bg-white dark:bg-orange-950/50",
    bgHover: "hover:bg-orange-50 dark:hover:bg-orange-900/20",
    icon: "text-orange-400 dark:text-orange-500",
    ring: "ring-orange-500",
    accent: "bg-orange-600 dark:bg-orange-500",
  },
};

const animationConfig: Record<CollapsibleLayout, { content: Transition; icon: Transition }> = {
  default: {
    content: { type: "spring", stiffness: 300, damping: 30, mass: 1 },
    icon: { duration: 0.3, ease: "easeInOut" },
  },
  minimal: {
    content: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
    icon: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
  contained: {
    content: { type: "spring", stiffness: 400, damping: 35, mass: 0.9 },
    icon: { duration: 0.25, ease: "easeInOut" },
  },
  card: {
    content: { type: "spring", stiffness: 250, damping: 25, mass: 1.1 },
    icon: { type: "spring", stiffness: 400, damping: 25 },
  },
  sidebar: {
    content: { type: "spring", stiffness: 350, damping: 30, mass: 0.9 },
    icon: { duration: 0.25, ease: "easeInOut" },
  },
};

const contentAnimation = {
  initial: { height: 0, opacity: 0 } as const,
  animate: { height: "auto" as const, opacity: 1 } as const,
  exit: { height: 0, opacity: 0 } as const,
};

const spacingValues: Record<CollapsibleSpacing, { trigger: string; text: string; gap: string; itemGap: string; contentPad: string; contentGap: string; icon: number }> = {
  default: { trigger: "px-4 py-3", text: "text-sm", gap: "gap-2", itemGap: "gap-2", contentPad: "pt-3 pb-4", contentGap: "space-y-2", icon: 16 },
  "2x": { trigger: "px-2 py-1.5", text: "text-xs", gap: "gap-1", itemGap: "gap-1", contentPad: "pt-1.5 pb-2", contentGap: "space-y-1", icon: 14 },
  "4x": { trigger: "px-4 py-3", text: "text-sm", gap: "gap-2", itemGap: "gap-2", contentPad: "pt-3 pb-4", contentGap: "space-y-2", icon: 16 },
  "6x": { trigger: "px-5 py-4", text: "text-base", gap: "gap-3", itemGap: "gap-3", contentPad: "pt-4 pb-5", contentGap: "space-y-3", icon: 20 },
  "8x": { trigger: "px-6 py-5", text: "text-lg", gap: "gap-4", itemGap: "gap-4", contentPad: "pt-5 pb-6", contentGap: "space-y-4", icon: 22 },
};

const shapeMap: Record<CollapsibleShape, string> = {
  default: "rounded-lg",
  square: "rounded-none",
  rounded: "rounded-xl",
  sharp: "rounded-[2px]",
};

// ─── Context ────────────────────────────────────────────────────────────

interface CollapsibleContextValue {
  layout: CollapsibleLayout;
  color: CollapsibleColor;
  shape: CollapsibleShape;
  spacing: CollapsibleSpacing;
  open: boolean;
  theme: CollapsibleTheme;
}

const CollapsibleContext = React.createContext<CollapsibleContextValue>({
  layout: "default",
  color: "default",
  shape: "default",
  spacing: "default",
  open: false,
  theme: colorThemeMap.default,
});

const useCollapsibleContext = () => React.useContext(CollapsibleContext);

// ─── Root ───────────────────────────────────────────────────────────────

interface CollapsibleRootProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {
  layout?: CollapsibleLayout;
  color?: CollapsibleColor;
  shape?: CollapsibleShape;
  spacing?: CollapsibleSpacing;
}

const CollapsibleRoot = React.forwardRef<HTMLDivElement, CollapsibleRootProps>(
  ({ layout = "default", color = "default", shape = "default", spacing = "default", className, children, open: controlledOpen, onOpenChange, defaultOpen, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const actualOnOpenChange = React.useCallback((newOpen: boolean) => {
      if (!isControlled) setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    }, [isControlled, onOpenChange]);

    const theme = colorThemeMap[color];
    const shapeClass = shapeMap[shape];
    const sp = spacingValues[spacing];

    return (
      <CollapsibleContext.Provider value={{ layout, color, shape, spacing, open, theme }}>
        <CollapsiblePrimitive.Root
          ref={ref}
          open={open}
          onOpenChange={actualOnOpenChange}
          className={cn(
            layout === "contained" && cn("border", theme.border, theme.bg, shapeClass),
            layout === "card" && cn("border", theme.border, theme.bg, "shadow-sm hover:shadow-md transition-shadow duration-300", shapeClass),
            className
          )}
          {...props}
        >
          {children}
        </CollapsiblePrimitive.Root>
      </CollapsibleContext.Provider>
    );
  }
);
CollapsibleRoot.displayName = "Collapsible";

// ─── Trigger ────────────────────────────────────────────────────────────

const triggerShapeVariants = cva("", {
  variants: {
    layout: {
      default: "",
      minimal: "",
      contained: "",
      card: "",
      sidebar: "",
    },
    shape: {
      default: "rounded-lg",
      square: "rounded-none",
      rounded: "rounded-xl",
      sharp: "rounded-[2px]",
    },
  },
  compoundVariants: [
    { layout: "contained", shape: "default", className: "data-[state=open]:rounded-b-none rounded-t-lg" },
    { layout: "contained", shape: "square", className: "data-[state=open]:rounded-b-none" },
    { layout: "contained", shape: "rounded", className: "data-[state=open]:rounded-b-none rounded-t-xl" },
    { layout: "contained", shape: "sharp", className: "data-[state=open]:rounded-b-none rounded-t-[2px]" },
    { layout: "card", shape: "default", className: "data-[state=open]:rounded-b-none rounded-t-lg" },
    { layout: "card", shape: "square", className: "data-[state=open]:rounded-b-none" },
    { layout: "card", shape: "rounded", className: "data-[state=open]:rounded-b-none rounded-t-xl" },
    { layout: "card", shape: "sharp", className: "data-[state=open]:rounded-b-none rounded-t-[2px]" },
  ],
  defaultVariants: {
    layout: "default",
    shape: "default",
  },
});

interface CollapsibleTriggerProps extends React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger> {
  asChild?: boolean;
}

const CollapsibleTrigger = React.forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { layout, shape, spacing, open, theme } = useCollapsibleContext();
    const sp = spacingValues[spacing];
    const Comp = asChild ? React.Fragment : CollapsiblePrimitive.CollapsibleTrigger;

    const chevron = (
      <motion.div
        animate={{ rotate: layout === "sidebar" ? (open ? 90 : 0) : (open ? 180 : 0) }}
        transition={animationConfig[layout].icon}
        className="shrink-0"
      >
        {layout === "sidebar" ? (
          <ChevronRightIcon size={sp.icon} className={cn(open ? theme.text : theme.textMuted)} />
        ) : (
          <ChevronDownIcon size={sp.icon} className={cn(open ? theme.text : theme.textMuted)} />
        )}
      </motion.div>
    );

    const plusMinus = (
      <div className="relative w-5 h-5 shrink-0">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="minus"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <MinusIcon size={sp.icon} className={theme.text} />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <PlusIcon size={sp.icon} className={theme.textMuted} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    const triggerContent = () => {
      if (layout === "sidebar") {
        return (
          <div className="flex items-center w-full">
            <motion.div
              className={cn("w-[3px] h-4 rounded-full shrink-0", theme.accent)}
              animate={{ height: open ? 16 : 4, opacity: open ? 1 : 0.4 }}
              transition={animationConfig.sidebar.icon}
            />
            <div className="flex items-center justify-between w-full ml-3">
              <span className="flex-1">{children}</span>
              <motion.div
                animate={{ rotate: open ? 90 : 0 }}
                transition={animationConfig.sidebar.icon}
                className="shrink-0"
              >
                <ChevronRightIcon size={sp.icon} className={cn(open ? theme.text : theme.textMuted)} />
              </motion.div>
            </div>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-between w-full">
          <div className={cn("flex-1", layout === "minimal" && "relative", layout === "card" && cn("font-medium", theme.text))}>
            {children}
            {layout === "minimal" && (
              <div
                className={cn("absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-500 ease-out", theme.accent)}
                style={{ width: open ? "100%" : "0%" }}
              />
            )}
          </div>
          <div
            className={cn(
              "shrink-0 overflow-hidden transition-all duration-500 ease-out flex items-center",
              layout === "minimal" ? "opacity-0 max-w-0" : "opacity-100 max-w-[40px]"
            )}
          >
            {layout === "card" ? plusMinus : chevron}
          </div>
        </div>
      );
    };

    if (asChild) {
      return (
        <CollapsiblePrimitive.CollapsibleTrigger ref={ref} asChild {...props}>
          {children}
        </CollapsiblePrimitive.CollapsibleTrigger>
      );
    }

    return (
      <CollapsiblePrimitive.CollapsibleTrigger
        ref={ref}
        className={cn(
          "flex w-full items-center transition-all duration-200 cursor-default text-left font-medium",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          sp.trigger,
          sp.text,
          layout !== "minimal" && sp.gap,
          theme.text,
          theme.bgHover,
          theme.ring,
          layout !== "contained" && layout !== "card" && shapeMap[shape],
          layout === "contained" && cn("border-b", open ? theme.borderActive : theme.border, triggerShapeVariants({ layout: "contained", shape })),
          layout === "card" && triggerShapeVariants({ layout: "card", shape }),
          layout === "sidebar" && "border-l-0",
          className
        )}
        {...props}
      >
        {triggerContent()}
      </CollapsiblePrimitive.CollapsibleTrigger>
    );
  }
);
CollapsibleTrigger.displayName = "CollapsibleTrigger";

// ─── Content ────────────────────────────────────────────────────────────

export interface CollapsibleItemData {
  label: string;
  description?: string;
}

export interface CollapsibleContentProps {
  children?: React.ReactNode;
  items?: CollapsibleItemData[];
  className?: string;
}

const itemCardVariants = cva("transition-all duration-500 ease-out", {
  variants: {
    layout: {
      default: "border rounded-md px-4 py-3",
      minimal: "border-l-2 py-2 pl-3 pr-3",
      contained: "",
      card: "",
      sidebar: "",
    },
    shape: {
      default: "rounded-lg",
      square: "rounded-none",
      rounded: "rounded-xl",
      sharp: "rounded-[2px]",
    },
  },
  compoundVariants: [
    { layout: "contained", className: "" },
    { layout: "card", className: "" },
    { layout: "sidebar", className: "" },
    { layout: "minimal", shape: "default", className: "" },
    { layout: "minimal", shape: "square", className: "" },
    { layout: "minimal", shape: "rounded", className: "" },
    { layout: "minimal", shape: "sharp", className: "" },
  ],
  defaultVariants: {
    layout: "default",
    shape: "default",
  },
});

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({ children, items, className }) => {
  const { layout, color, shape, spacing, open, theme } = useCollapsibleContext();
  const shapeClass = shapeMap[shape];
  const sp = spacingValues[spacing];

  const needsWrap = layout === "default" || layout === "minimal";

  const itemClass = cn(
    itemCardVariants({ layout, shape }),
    needsWrap && color !== "default" && layout === "default" && cn(theme.border, theme.bg, theme.text),
    needsWrap && color === "default" && layout === "default" && "border-border bg-card text-foreground",
    needsWrap && color !== "default" && layout === "minimal" && cn(theme.borderActive, "bg-transparent", theme.text),
    needsWrap && color === "default" && layout === "minimal" && "border-l-foreground bg-transparent text-foreground",
    sp.text,
  );

  const renderItem = (child: React.ReactNode, index: number) => {
    if (!React.isValidElement(child)) return child;
    return <div key={child.key ?? index} className={itemClass}>{child}</div>;
  };

  const contentItems = items
    ? items.map((item, i) => (
        <div key={i} className={itemClass}>
          <div className="font-medium">{item.label}</div>
          {item.description && (
            <div className={cn("text-xs mt-0.5", color !== "default" ? theme.textMuted : "text-muted-foreground")}>{item.description}</div>
          )}
        </div>
      ))
    : needsWrap
      ? React.Children.map(children, renderItem)
      : children;

  const contentClasses = cn(
    "overflow-hidden transition-all duration-500 ease-out",
    layout === "default" && cn(sp.contentPad, "flex flex-col", sp.itemGap),
    layout === "minimal" && cn(sp.contentPad, "flex flex-col", sp.itemGap),
    layout === "contained" && cn("px-4", sp.contentPad, "border-x-0 border-b-0", sp.contentGap, color !== "default" ? cn(theme.border, theme.textMuted) : "text-muted-foreground"),
    layout === "card" && cn("px-5", sp.contentPad, sp.contentGap, color !== "default" ? cn(theme.textMuted) : "text-muted-foreground"),
    layout === "sidebar" && cn("pl-9 pr-4", sp.contentPad, sp.contentGap, color !== "default" ? theme.textMuted : "text-muted-foreground"),
    className
  );

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={contentAnimation.initial}
          animate={contentAnimation.animate}
          exit={contentAnimation.exit}
          transition={animationConfig[layout].content}
          layout
          className="overflow-hidden"
        >
          <div className={cn(contentClasses, "transition-all duration-500 ease-out", layout === "sidebar" && "relative")}>
            {layout === "sidebar" && (
              <motion.div
                className={cn("absolute left-[13px] top-0 bottom-0 w-[2px] rounded-full", theme.accent)}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformOrigin: "top" }}
              />
            )}
            <div className={layout === "sidebar" ? "relative" : undefined}>
              {contentItems}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
CollapsibleContent.displayName = "CollapsibleContent";

export {
  CollapsibleRoot as Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
};
