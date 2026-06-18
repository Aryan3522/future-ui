"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug minimal-button
 * @registry-name Minimal Button
 * @registry-description An ultra-clean, premium, modern button inspired by Vercel, Linear, and Stripe. Focuses on typography, precise spacing, and subtle interactions.
 * @registry-category ui
 * @registry-type components:ui
 */

export type MinimalButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "solid"
  | "outline"
  | "ghost"
  | "soft"
  | "subtle"
  | "text"
  | "elevated"
  | "gradient-minimal"
  | "link";

export type MinimalButtonColor =
  | "slate" | "gray" | "zinc" | "neutral" | "black" | "white"
  | "blue" | "indigo" | "purple" | "violet" | "pink" | "rose"
  | "red" | "orange" | "amber" | "yellow" | "lime" | "green"
  | "emerald" | "teal" | "cyan" | "sky";

export type MinimalButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type MinimalButtonShape =
  | "rounded"
  | "soft-rounded"
  | "pill"
  | "square"
  | "circle"
  | "stadium"
  | "cut-corners"
  | "squircle";

export interface MinimalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: MinimalButtonVariant;
  color?: MinimalButtonColor;
  size?: MinimalButtonSize;
  shape?: MinimalButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  href?: string;
  target?: string;
}

// Minimal colors focus on exact border, background, and text combinations.
// Using Tailwind's safe classes.
const colorVariants: Record<MinimalButtonColor, { solid: string, soft: string, ghost: string, outline: string }> = {
  slate: { solid: "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200", soft: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700", ghost: "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800", outline: "border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-100 dark:hover:bg-slate-900" },
  gray: { solid: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200", soft: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700", ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800", outline: "border-gray-200 text-gray-900 hover:bg-gray-50 dark:border-gray-800 dark:text-gray-100 dark:hover:bg-gray-900" },
  zinc: { solid: "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200", soft: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700", ghost: "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800", outline: "border-zinc-200 text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-900" },
  neutral: { solid: "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200", soft: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700", ghost: "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800", outline: "border-neutral-200 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900" },
  black: { solid: "bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-100", soft: "bg-zinc-100 text-black hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800", ghost: "text-black hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-900", outline: "border-zinc-300 text-black hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900" },
  white: { solid: "bg-white text-zinc-900 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800", soft: "bg-white/50 text-zinc-900 hover:bg-white/80 dark:bg-zinc-900/50 dark:text-white dark:hover:bg-zinc-900/80", ghost: "text-zinc-900 hover:bg-white dark:text-white dark:hover:bg-zinc-900", outline: "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900" },
  blue: { solid: "bg-blue-600 text-white hover:bg-blue-700", soft: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20", ghost: "text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10", outline: "border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950" },
  indigo: { solid: "bg-indigo-600 text-white hover:bg-indigo-700", soft: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20", ghost: "text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10", outline: "border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950" },
  purple: { solid: "bg-purple-600 text-white hover:bg-purple-700", soft: "bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20", ghost: "text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-500/10", outline: "border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-400 dark:hover:bg-purple-950" },
  violet: { solid: "bg-violet-600 text-white hover:bg-violet-700", soft: "bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20", ghost: "text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-500/10", outline: "border-violet-200 text-violet-700 hover:bg-violet-50 dark:border-violet-800 dark:text-violet-400 dark:hover:bg-violet-950" },
  pink: { solid: "bg-pink-600 text-white hover:bg-pink-700", soft: "bg-pink-50 text-pink-700 hover:bg-pink-100 dark:bg-pink-500/10 dark:text-pink-400 dark:hover:bg-pink-500/20", ghost: "text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-500/10", outline: "border-pink-200 text-pink-700 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-400 dark:hover:bg-pink-950" },
  rose: { solid: "bg-rose-600 text-white hover:bg-rose-700", soft: "bg-rose-50 text-rose-700 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20", ghost: "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10", outline: "border-rose-200 text-rose-700 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-950" },
  red: { solid: "bg-red-600 text-white hover:bg-red-700", soft: "bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20", ghost: "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10", outline: "border-red-200 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950" },
  orange: { solid: "bg-orange-600 text-white hover:bg-orange-700", soft: "bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-500/10 dark:text-orange-400 dark:hover:bg-orange-500/20", ghost: "text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-500/10", outline: "border-orange-200 text-orange-700 hover:bg-orange-50 dark:border-orange-800 dark:text-orange-400 dark:hover:bg-orange-950" },
  amber: { solid: "bg-amber-500 text-white hover:bg-amber-600", soft: "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20", ghost: "text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10", outline: "border-amber-200 text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-950" },
  yellow: { solid: "bg-yellow-400 text-zinc-900 hover:bg-yellow-500", soft: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 dark:hover:bg-yellow-500/20", ghost: "text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-500/10", outline: "border-yellow-200 text-yellow-700 hover:bg-yellow-50 dark:border-yellow-800 dark:text-yellow-400 dark:hover:bg-yellow-950" },
  lime: { solid: "bg-lime-500 text-white hover:bg-lime-600", soft: "bg-lime-50 text-lime-700 hover:bg-lime-100 dark:bg-lime-500/10 dark:text-lime-400 dark:hover:bg-lime-500/20", ghost: "text-lime-600 hover:bg-lime-50 dark:text-lime-400 dark:hover:bg-lime-500/10", outline: "border-lime-200 text-lime-700 hover:bg-lime-50 dark:border-lime-800 dark:text-lime-400 dark:hover:bg-lime-950" },
  green: { solid: "bg-green-600 text-white hover:bg-green-700", soft: "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20", ghost: "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-500/10", outline: "border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950" },
  emerald: { solid: "bg-emerald-600 text-white hover:bg-emerald-700", soft: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20", ghost: "text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-500/10", outline: "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950" },
  teal: { solid: "bg-teal-600 text-white hover:bg-teal-700", soft: "bg-teal-50 text-teal-700 hover:bg-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20", ghost: "text-teal-600 hover:bg-teal-50 dark:text-teal-400 dark:hover:bg-teal-500/10", outline: "border-teal-200 text-teal-700 hover:bg-teal-50 dark:border-teal-800 dark:text-teal-400 dark:hover:bg-teal-950" },
  cyan: { solid: "bg-cyan-600 text-white hover:bg-cyan-700", soft: "bg-cyan-50 text-cyan-700 hover:bg-cyan-100 dark:bg-cyan-500/10 dark:text-cyan-400 dark:hover:bg-cyan-500/20", ghost: "text-cyan-600 hover:bg-cyan-50 dark:text-cyan-400 dark:hover:bg-cyan-500/10", outline: "border-cyan-200 text-cyan-700 hover:bg-cyan-50 dark:border-cyan-800 dark:text-cyan-400 dark:hover:bg-cyan-950" },
  sky: { solid: "bg-sky-500 text-white hover:bg-sky-600", soft: "bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:hover:bg-sky-500/20", ghost: "text-sky-600 hover:bg-sky-50 dark:text-sky-400 dark:hover:bg-sky-500/10", outline: "border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:text-sky-400 dark:hover:bg-sky-950" },
};

const getShapeClass = (shape: MinimalButtonShape) => {
  switch (shape) {
    case "rounded": return "rounded-md";
    case "soft-rounded": return "rounded-xl";
    case "pill": return "rounded-full";
    case "square": return "rounded-none";
    case "circle": return "rounded-full"; // Sizing handled separately
    case "stadium": return "rounded-full"; // Sizing handled separately
    case "squircle": return "rounded-[1.25rem]"; // Apple-like smooth corner
    case "cut-corners": return "rounded-none [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)]";
    default: return "rounded-md";
  }
};

const getSizeClass = (size: MinimalButtonSize, shape: MinimalButtonShape) => {
  const isCircle = shape === "circle";
  const isStadium = shape === "stadium";

  switch (size) {
    case "xs": return isCircle ? "w-7 h-7 p-0" : isStadium ? "h-7 px-5 text-xs" : "h-7 px-2.5 text-xs";
    case "sm": return isCircle ? "w-9 h-9 p-0" : isStadium ? "h-9 px-6 text-sm" : "h-9 px-3.5 text-sm";
    case "md": return isCircle ? "w-10 h-10 p-0" : isStadium ? "h-10 px-8 text-sm" : "h-10 px-4 text-sm";
    case "lg": return isCircle ? "w-11 h-11 p-0" : isStadium ? "h-11 px-10 text-base" : "h-11 px-5 text-base";
    case "xl": return isCircle ? "w-12 h-12 p-0" : isStadium ? "h-12 px-12 text-lg" : "h-12 px-6 text-lg";
    default: return "h-10 px-4 text-sm";
  }
};

const getIconSize = (size: MinimalButtonSize) => {
  switch (size) {
    case "xs": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "sm": return "[&>svg]:w-4 [&>svg]:h-4";
    case "md": return "[&>svg]:w-4 [&>svg]:h-4"; // Refined scaling
    case "lg": return "[&>svg]:w-5 [&>svg]:h-5";
    case "xl": return "[&>svg]:w-5 [&>svg]:h-5";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
  }
};

export const MinimalButton = React.forwardRef<HTMLButtonElement, MinimalButtonProps>(
  (
    {
      variant = "primary",
      color = "zinc",
      size = "md",
      shape = "rounded",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      className,
      children,
      disabled,
      href,
      target,
      ...props
    },
    ref
  ) => {
    // Determine the style logic based on variant intent
    let styleVariant: "solid" | "soft" | "ghost" | "outline" = "solid";
    let mappedColor = color;

    switch (variant) {
      case "primary":
      case "solid":
        styleVariant = "solid";
        break;
      case "secondary":
      case "soft":
      case "subtle":
        styleVariant = "soft";
        break;
      case "tertiary":
      case "ghost":
        styleVariant = "ghost";
        break;
      case "neutral":
        styleVariant = "solid";
        mappedColor = "zinc";
        break;
      case "success":
        styleVariant = "solid";
        mappedColor = "emerald";
        break;
      case "warning":
        styleVariant = "solid";
        mappedColor = "amber";
        break;
      case "danger":
        styleVariant = "solid";
        mappedColor = "red";
        break;
      case "info":
        styleVariant = "solid";
        mappedColor = "blue";
        break;
      case "outline":
        styleVariant = "outline";
        break;
      case "text":
      case "link":
        styleVariant = "ghost";
        break;
      case "elevated":
        styleVariant = "solid";
        break;
      case "gradient-minimal":
        styleVariant = "solid";
        break;
      default:
        styleVariant = "solid";
    }

    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const baseClasses = cn(
      "relative inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap outline-none",
      "transition-colors duration-200 ease-out select-none",
      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      fullWidth && "w-full",
      getShapeClass(shape),
      getSizeClass(size, shape),
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      // Specific variant overrides that fall outside the standard mapping
      variant === "text" || variant === "link" ? "hover:underline bg-transparent hover:bg-transparent px-0" : "",
      variant === "elevated" ? "shadow-sm border border-border/50" : "",
      variant === "outline" ? "border" : "border border-transparent", // Always have border to prevent layout shift
      variant === "gradient-minimal" && color === "zinc" ? "bg-gradient-to-b from-zinc-800 to-zinc-950 border-zinc-700 shadow-sm text-white hover:from-zinc-700 hover:to-zinc-900" : "",
      colorVariants[mappedColor]?.[styleVariant] || colorVariants.zinc.solid,
      className
    );

    const MotionComponent = motion.button;

    return (
      <MotionComponent
        ref={ref}
        whileTap={!disabled ? { scale: 0.97 } : undefined}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        className={baseClasses}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}

        {!loading && icon && iconPosition === "left" && (
          <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>
            {icon}
          </span>
        )}

        {children && <span className="truncate">{children}</span>}

        {!loading && icon && iconPosition === "right" && (
          <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>
            {icon}
          </span>
        )}
      </MotionComponent>
    );
  }
);

MinimalButton.displayName = "MinimalButton";
