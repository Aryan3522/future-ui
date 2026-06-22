"use client";

/**
 * @registry-slug command-palette
 * @registry-name Command Palette
 * @registry-description A premium command palette with subtle color themes and clean spacing.
 * @registry-category ui
 * @registry-dependency cmdk
 * @registry-dependency @radix-ui/react-dialog
 * @registry-dependency framer-motion
 * @registry-dependency class-variance-authority
 */

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────

export type CommandVariant = "default" | "compact" | "floating" | "glass" | "spotlight";
export type CommandColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CommandShape = "default" | "square" | "rounded" | "sharp";
export type CommandSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface CommandTheme {
  border: string;
  glow: string;
  accentBg: string;
  accentText: string;
  ring: string;
}

// ─── Context ─────────────────────────────────────────────────────────────

interface CommandContextValue {
  variant: CommandVariant;
  color: CommandColor;
  shape: CommandShape;
  spacing: CommandSpacing;
  theme: CommandTheme;
  spacingMap: Record<string, string>;
}

const CommandContext = React.createContext<CommandContextValue>({} as CommandContextValue);
const useCommandContext = () => React.useContext(CommandContext);

// ─── Color Theme Map (subtle shift — text stays neutral) ────────────────

const colorThemeMap: Record<CommandColor, CommandTheme> = {
  default: {
    border: "border-border/60",
    glow: "shadow-2xl shadow-black/10 dark:shadow-black/40",
    accentBg: "bg-accent",
    accentText: "text-accent-foreground",
    ring: "ring-foreground/20",
  },
  blue: {
    border: "border-blue-200/80 dark:border-blue-800/50",
    glow: "shadow-2xl shadow-blue-500/15 dark:shadow-blue-500/10",
    accentBg: "bg-blue-50 dark:bg-blue-900/30",
    accentText: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-400/30",
  },
  emerald: {
    border: "border-emerald-200/80 dark:border-emerald-800/50",
    glow: "shadow-2xl shadow-emerald-500/15 dark:shadow-emerald-500/10",
    accentBg: "bg-emerald-50 dark:bg-emerald-900/30",
    accentText: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-400/30",
  },
  rose: {
    border: "border-rose-200/80 dark:border-rose-800/50",
    glow: "shadow-2xl shadow-rose-500/15 dark:shadow-rose-500/10",
    accentBg: "bg-rose-50 dark:bg-rose-900/30",
    accentText: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-400/30",
  },
  amber: {
    border: "border-amber-200/80 dark:border-amber-800/50",
    glow: "shadow-2xl shadow-amber-500/15 dark:shadow-amber-500/10",
    accentBg: "bg-amber-50 dark:bg-amber-900/30",
    accentText: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-400/30",
  },
  violet: {
    border: "border-violet-200/80 dark:border-violet-800/50",
    glow: "shadow-2xl shadow-violet-500/15 dark:shadow-violet-500/10",
    accentBg: "bg-violet-50 dark:bg-violet-900/30",
    accentText: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-400/30",
  },
  indigo: {
    border: "border-indigo-200/80 dark:border-indigo-800/50",
    glow: "shadow-2xl shadow-indigo-500/15 dark:shadow-indigo-500/10",
    accentBg: "bg-indigo-50 dark:bg-indigo-900/30",
    accentText: "text-indigo-700 dark:text-indigo-300",
    ring: "ring-indigo-400/30",
  },
  sky: {
    border: "border-sky-200/80 dark:border-sky-800/50",
    glow: "shadow-2xl shadow-sky-500/15 dark:shadow-sky-500/10",
    accentBg: "bg-sky-50 dark:bg-sky-900/30",
    accentText: "text-sky-700 dark:text-sky-300",
    ring: "ring-sky-400/30",
  },
  slate: {
    border: "border-slate-300/80 dark:border-slate-700/50",
    glow: "shadow-2xl shadow-slate-500/15 dark:shadow-slate-500/10",
    accentBg: "bg-slate-100 dark:bg-slate-800/30",
    accentText: "text-slate-700 dark:text-slate-300",
    ring: "ring-slate-400/30",
  },
  orange: {
    border: "border-orange-200/80 dark:border-orange-800/50",
    glow: "shadow-2xl shadow-orange-500/15 dark:shadow-orange-500/10",
    accentBg: "bg-orange-50 dark:bg-orange-900/30",
    accentText: "text-orange-700 dark:text-orange-300",
    ring: "ring-orange-400/30",
  },
};

// ─── Shape Map ────────────────────────────────────────────────────────────

const shapeMap: Record<CommandShape, { dialog: string; item: string }> = {
  default: { dialog: "rounded-2xl", item: "rounded-xl" },
  square: { dialog: "rounded-none", item: "rounded-none" },
  rounded: { dialog: "rounded-3xl", item: "rounded-2xl" },
  sharp: { dialog: "rounded-lg", item: "rounded-md" },
};

// ─── Spacing Map ─────────────────────────────────────────────────────────

const spacingMap: Record<CommandSpacing, Record<string, string>> = {
  default: { dialog: "p-0", input: "px-5 py-4", inputIcon: "w-5 h-5", list: "pb-3 pt-1", item: "px-5 py-2.5 mx-2 my-0.5 text-sm", groupHead: "px-5 pt-4 pb-1.5", groupLabel: "text-[10px]", separator: "mx-5 my-1.5" },
  "2x": { dialog: "p-0", input: "px-4 py-3", inputIcon: "w-4 h-4", list: "pb-2 pt-0.5", item: "px-4 py-2 mx-1.5 my-0.5 text-xs", groupHead: "px-4 pt-3 pb-1", groupLabel: "text-[9px]", separator: "mx-4 my-1" },
  "4x": { dialog: "p-0", input: "px-5 py-4", inputIcon: "w-5 h-5", list: "pb-3 pt-1", item: "px-5 py-2.5 mx-2 my-0.5 text-sm", groupHead: "px-5 pt-4 pb-1.5", groupLabel: "text-[10px]", separator: "mx-5 my-1.5" },
  "6x": { dialog: "p-0", input: "px-6 py-5", inputIcon: "w-5 h-5", list: "pb-4 pt-2", item: "px-6 py-3 mx-3 my-0.5 text-base", groupHead: "px-6 pt-5 pb-2", groupLabel: "text-[11px]", separator: "mx-6 my-2" },
  "8x": { dialog: "p-0", input: "px-7 py-6", inputIcon: "w-6 h-6", list: "pb-5 pt-2", item: "px-7 py-3.5 mx-4 my-0.5 text-lg", groupHead: "px-7 pt-6 pb-2", groupLabel: "text-[12px]", separator: "mx-7 my-2.5" },
};

// ─── Dialog Variants ──────────────────────────────────────────────────────

const dialogVariants = cva(
  "relative z-[10000] w-full max-w-2xl focus:outline-none flex flex-col overflow-hidden bg-background",
  {
    variants: {
      variant: {
        default: "shadow-2xl shadow-black/10 dark:shadow-black/40 border",
        compact: "shadow-xl shadow-black/10 dark:shadow-black/40 border max-w-xl",
        floating: "shadow-2xl shadow-black/15 dark:shadow-black/40 border ring-1 ring-black/5 dark:ring-white/5 max-w-[90vw] sm:max-w-3xl",
        glass: "shadow-2xl shadow-black/10 dark:shadow-black/40 border bg-background/80 backdrop-blur-2xl",
        spotlight: "shadow-2xl shadow-black/15 dark:shadow-black/40 border-2",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

// ─── Components ───────────────────────────────────────────────────────────

export interface CommandPaletteProps extends DialogPrimitive.DialogProps {
  variant?: CommandVariant;
  color?: CommandColor;
  shape?: CommandShape;
  spacing?: CommandSpacing;
  className?: string;
  container?: HTMLElement | null;
  children: React.ReactNode;
}

export const CommandPalette = React.memo(({
  variant = "default",
  color = "default",
  shape = "default",
  spacing = "default",
  className,
  container,
  children,
  ...props
}: CommandPaletteProps) => {
  const theme = colorThemeMap[color];
  const sp = spacingMap[spacing] as Record<string, string>;
  const shapes = shapeMap[shape];
  const open = props.open !== undefined ? props.open : false;

  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal container={container} forceMount>
        <AnimatePresence>
          {open && (
            <DialogPrimitive.Overlay key="cmd-overlay" asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="fixed inset-0 z-[10000] flex items-start justify-center bg-black/25 dark:bg-black/50 pt-[12vh] sm:pt-[15vh]"
              >
                <DialogPrimitive.Content key="cmd-content" asChild forceMount onOpenAutoFocus={(e) => e.preventDefault()}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: -8 }}
                    transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.9 }}
                    className={cn(
                      dialogVariants({ variant }),
                      shapes.dialog,
                      sp.dialog,
                      theme.border,
                      variant === "spotlight" && theme.glow,
                      className
                    )}
                  >
                    <VisuallyHidden>
                      <DialogPrimitive.Title>Command Palette</DialogPrimitive.Title>
                    </VisuallyHidden>
                    <CommandContext.Provider value={{ variant, color, shape, spacing, theme, spacingMap: sp }}>
                      <CommandPrimitive
                        className="flex h-full w-full flex-col overflow-hidden bg-transparent text-foreground"
                        label="Command Palette"
                      >
                        {children}
                      </CommandPrimitive>
                    </CommandContext.Provider>
                  </motion.div>
                </DialogPrimitive.Content>
              </motion.div>
            </DialogPrimitive.Overlay>
          )}
        </AnimatePresence>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
});
CommandPalette.displayName = "CommandPalette";

export const Command = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { variant?: CommandVariant; color?: CommandColor; shape?: CommandShape; spacing?: CommandSpacing }
>(({ className, variant = "default", color = "default", shape = "default", spacing = "default", ...props }, ref) => {
  const theme = colorThemeMap[color];
  const shapes = shapeMap[shape];
  const sp = spacingMap[spacing] as Record<string, string>;

  return (
    <CommandContext.Provider value={{ variant, color, shape, spacing, theme, spacingMap: sp }}>
      <CommandPrimitive
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden bg-background text-foreground",
          shapes.dialog,
          sp.dialog,
          theme.border,
          className
        )}
        {...props}
      />
    </CommandContext.Provider>
  );
}));
Command.displayName = CommandPrimitive.displayName;

// ─── Input ────────────────────────────────────────────────────────────────

export const CommandInput = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => {
  const { variant, theme, spacingMap: sp } = useCommandContext();

  return (
    <div className={cn("flex items-center gap-3 border-b transition-all duration-300", theme.border, sp.input)} cmdk-input-wrapper="">
      <Search className={cn("shrink-0 text-muted-foreground/40 transition-colors duration-300", sp.inputIcon)} />
      <CommandPrimitive.Input
        ref={ref}
        className={cn(
          "flex-1 bg-transparent outline-none text-foreground",
          "placeholder:text-muted-foreground/40 placeholder:transition-colors placeholder:duration-300",
          "font-medium tracking-tight",
          className
        )}
        {...props}
      />
    </div>
  );
}));
CommandInput.displayName = CommandPrimitive.Input.displayName;

// ─── List ─────────────────────────────────────────────────────────────────

export const CommandList = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => {
  const { spacingMap: sp } = useCommandContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut", delay: 0.04 }}
      className="flex-1 overflow-hidden"
    >
      <CommandPrimitive.List
        ref={ref}
        className={cn(
          "max-h-[320px] sm:max-h-[400px] overflow-y-auto overflow-x-hidden",
          "scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-transparent",
          sp.list,
          className
        )}
        {...props}
      />
    </motion.div>
  );
}));
CommandList.displayName = CommandPrimitive.List.displayName;

// ─── Empty ────────────────────────────────────────────────────────────────

export const CommandEmpty = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className={cn("py-14 text-center text-sm text-muted-foreground/50", className)}
    {...props}
  />
)));
CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

// ─── Group ────────────────────────────────────────────────────────────────

export const CommandGroup = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => {
  const { spacingMap: sp } = useCommandContext();

  return (
    <CommandPrimitive.Group
      ref={ref}
      className={cn(
        "overflow-hidden text-foreground",
        "[[cmdk-group-heading]]:font-semibold",
        "[[cmdk-group-heading]]:uppercase",
        "[[cmdk-group-heading]]:tracking-[0.15em]",
        "[[cmdk-group-heading]]:text-muted-foreground/50",
        sp.groupHead,
        cn("[[cmdk-group-heading]]:" + sp.groupLabel),
        className
      )}
      {...props}
    />
  );
}));
CommandGroup.displayName = CommandPrimitive.Group.displayName;

// ─── Separator ────────────────────────────────────────────────────────────

export const CommandSeparator = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => {
  const { spacingMap: sp } = useCommandContext();

  return (
    <CommandPrimitive.Separator
      ref={ref}
      className={cn("h-px bg-border/40", sp.separator, className)}
      {...props}
    />
  );
}));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

// ─── Item ─────────────────────────────────────────────────────────────────

export const CommandItem = React.memo(React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { theme, shape, spacingMap: sp } = useCommandContext();
  const itemShape = shapeMap[shape].item;

  return (
    <CommandPrimitive.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center gap-3 outline-none",
        "transition-all duration-150",
        sp.item,
        itemShape,
        "text-foreground/80 data-[selected=true]:text-foreground",
        theme.accentBg,
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
        "data-[selected=true]:shadow-sm",
        className
      )}
      {...props}
    />
  );
}));
CommandItem.displayName = CommandPrimitive.Item.displayName;

// ─── Shortcut ─────────────────────────────────────────────────────────────

export const CommandShortcut = React.memo(({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground/40",
      className
    )}
    {...props}
  />
));
CommandShortcut.displayName = "CommandShortcut";
