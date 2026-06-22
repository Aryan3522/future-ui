/**
 * @registry-slug accordion
 * @registry-name Accordion
 * @registry-description A Future UI Accordion component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/icons";
import { cva, type VariantProps } from "class-variance-authority";

export type AccordionVariant = "solid" | "outline" | "ghost" | "link";
export type AccordionColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type AccordionShape = "default" | "square" | "rounded" | "sharp";
export type AccordionSpacing = "default" | "2x" | "4x" | "6x" | "8x";

const accordionItemVariants = cva(
  "flex w-full items-center justify-between text-left transition-all relative border border-transparent",
  {
    variants: {
      variant: {
        solid: "",
        outline: "bg-transparent",
        ghost: "bg-transparent",
        link: "bg-transparent hover:underline underline-offset-4",
      },
      color: {
        default: "",
        blue: "",
        emerald: "",
        rose: "",
        amber: "",
        violet: "",
        indigo: "",
        sky: "",
        slate: "",
        orange: "",
      },
      shape: {
        default: "rounded-lg",
        square: "rounded-none",
        rounded: "rounded-xl",
        sharp: "rounded-[2px]",
      },
      spacing: {
        default: "py-4 px-4",
        "2x": "py-2 px-2 text-xs",
        "4x": "py-4 px-4 text-sm",
        "6x": "py-5 px-5 text-base",
        "8x": "py-6 px-6 text-lg",
      }
    },
    compoundVariants: [
      // SOLID VARIANTS
      { variant: "solid", color: "default", className: "bg-muted text-foreground hover:bg-muted/80" },
      { variant: "solid", color: "blue", className: "bg-blue-600 text-white hover:bg-blue-600/90 dark:bg-blue-500 dark:hover:bg-blue-500/90" },
      { variant: "solid", color: "emerald", className: "bg-emerald-500 text-white hover:bg-emerald-500/90 dark:bg-emerald-600 dark:hover:bg-emerald-600/90" },
      { variant: "solid", color: "rose", className: "bg-rose-500 text-white hover:bg-rose-500/90 dark:bg-rose-600 dark:hover:bg-rose-600/90" },
      { variant: "solid", color: "amber", className: "bg-amber-500 text-white hover:bg-amber-500/90 dark:bg-amber-600 dark:hover:bg-amber-600/90" },
      { variant: "solid", color: "violet", className: "bg-violet-600 text-white hover:bg-violet-600/90 dark:bg-violet-500 dark:hover:bg-violet-500/90" },
      { variant: "solid", color: "indigo", className: "bg-indigo-600 text-white hover:bg-indigo-600/90 dark:bg-indigo-500 dark:hover:bg-indigo-500/90" },
      { variant: "solid", color: "sky", className: "bg-sky-500 text-white hover:bg-sky-500/90 dark:bg-sky-600 dark:hover:bg-sky-600/90" },
      { variant: "solid", color: "slate", className: "bg-slate-600 text-white hover:bg-slate-600/90 dark:bg-slate-500 dark:hover:bg-slate-500/90" },
      { variant: "solid", color: "orange", className: "bg-orange-500 text-white hover:bg-orange-500/90 dark:bg-orange-600 dark:hover:bg-orange-600/90" },

      // OUTLINE VARIANTS
      { variant: "outline", color: "default", className: "border-border hover:bg-accent text-foreground" },
      { variant: "outline", color: "blue", className: "border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-950" },
      { variant: "outline", color: "emerald", className: "border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-950" },
      { variant: "outline", color: "rose", className: "border-rose-500 text-rose-600 hover:bg-rose-50 dark:border-rose-500 dark:text-rose-500 dark:hover:bg-rose-950" },
      { variant: "outline", color: "amber", className: "border-amber-500 text-amber-600 hover:bg-amber-50 dark:border-amber-500 dark:text-amber-500 dark:hover:bg-amber-950" },
      { variant: "outline", color: "violet", className: "border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-500 dark:text-violet-500 dark:hover:bg-violet-950" },
      { variant: "outline", color: "indigo", className: "border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-500 dark:text-indigo-500 dark:hover:bg-indigo-950" },
      { variant: "outline", color: "sky", className: "border-sky-500 text-sky-600 hover:bg-sky-50 dark:border-sky-500 dark:text-sky-500 dark:hover:bg-sky-950" },
      { variant: "outline", color: "slate", className: "border-slate-600 text-slate-600 hover:bg-slate-50 dark:border-slate-500 dark:text-slate-500 dark:hover:bg-slate-950" },
      { variant: "outline", color: "orange", className: "border-orange-500 text-orange-600 hover:bg-orange-50 dark:border-orange-500 dark:text-orange-500 dark:hover:bg-orange-950" },

      // GHOST VARIANTS
      { variant: "ghost", color: "default", className: "hover:bg-accent/50 text-foreground" },
      { variant: "ghost", color: "blue", className: "text-foreground hover:text-blue-600 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20" },
      { variant: "ghost", color: "emerald", className: "text-foreground hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20" },
      { variant: "ghost", color: "rose", className: "text-foreground hover:text-rose-600 dark:hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20" },
      { variant: "ghost", color: "amber", className: "text-foreground hover:text-amber-600 dark:hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20" },
      { variant: "ghost", color: "violet", className: "text-foreground hover:text-violet-600 dark:hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20" },
      { variant: "ghost", color: "indigo", className: "text-foreground hover:text-indigo-600 dark:hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" },
      { variant: "ghost", color: "sky", className: "text-foreground hover:text-sky-600 dark:hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20" },
      { variant: "ghost", color: "slate", className: "text-foreground hover:text-slate-600 dark:hover:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/20" },
      { variant: "ghost", color: "orange", className: "text-foreground hover:text-orange-600 dark:hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20" },

      // LINK VARIANTS
      { variant: "link", color: "default", className: "text-foreground" },
      { variant: "link", color: "blue", className: "text-blue-600 dark:text-blue-500" },
      { variant: "link", color: "emerald", className: "text-emerald-600 dark:text-emerald-500" },
      { variant: "link", color: "rose", className: "text-rose-600 dark:text-rose-500" },
      { variant: "link", color: "amber", className: "text-amber-600 dark:text-amber-500" },
      { variant: "link", color: "violet", className: "text-violet-600 dark:text-violet-500" },
      { variant: "link", color: "indigo", className: "text-indigo-600 dark:text-indigo-500" },
      { variant: "link", color: "sky", className: "text-sky-600 dark:text-sky-500" },
      { variant: "link", color: "slate", className: "text-slate-600 dark:text-slate-500" },
      { variant: "link", color: "orange", className: "text-orange-600 dark:text-orange-500" },
    ],
    defaultVariants: {
      variant: "ghost", // Accordion headers are typically ghost by default
      color: "default",
      shape: "default",
      spacing: "default",
    }
  }
);

export interface AccordionItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">, VariantProps<typeof accordionItemVariants> {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
  variant?: AccordionVariant;
  color?: AccordionColor;
  shape?: AccordionShape;
  spacing?: AccordionSpacing;
}

export const AccordionItem: React.FC<AccordionItemProps> = React.memo(({
  title,
  children,
  isOpen,
  onClick,
  className,
  variant,
  color,
  shape,
  spacing,
}) => {
  return (
    <div className={cn(
      variant === "ghost" || variant === "link" ? "border-b border-border last:border-none" : "mb-2 last:mb-0", 
      className
    )}>
      <motion.button
        whileTap={{ scale: 0.99 }}
        onClick={onClick}
        className={cn(accordionItemVariants({ variant, color, shape, spacing }))}
      >
        <span className={cn("font-medium tracking-tight", spacing === "2x" ? "text-xs" : spacing === "6x" || spacing === "8x" ? "text-base" : "text-sm")}>{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDownIcon animate className="h-4 w-4 opacity-70" />
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={cn(
              "pb-4 leading-relaxed", 
              variant === "solid" ? "text-muted-foreground/80 pt-2" : "text-muted-foreground",
              variant === "outline" ? "pt-2" : "",
              spacing === "2x" ? "text-xs px-2" : spacing === "6x" || spacing === "8x" ? "text-base px-5" : "text-sm px-4"
            )}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

export interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
  className?: string;
  variant?: AccordionVariant;
  color?: AccordionColor;
  shape?: AccordionShape;
  spacing?: AccordionSpacing;
}

export const Accordion: React.FC<AccordionProps> = React.memo(({
  items,
  allowMultiple = false,
  className,
  variant = "ghost",
  color = "default",
  shape = "default",
  spacing = "default",
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn(
      "w-full", 
      (variant === "ghost" || variant === "link") ? "border border-border" : "border-none",
      shape === "square" ? "rounded-none" : shape === "rounded" ? "rounded-2xl" : shape === "sharp" ? "rounded-[2px]" : "rounded-xl", 
      className
    )}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openIndices.includes(index)}
          onClick={() => handleToggle(index)}
          variant={variant}
          color={color}
          shape={shape}
          spacing={spacing}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
});
Accordion.displayName = "Accordion";
