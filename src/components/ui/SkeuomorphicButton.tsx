"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug skeuomorphic-button
 * @registry-name Skeuomorphic Button
 * @registry-description A premium, production-ready skeuomorphic button with realistic depth, tactile interactions, and modern aesthetics.
 * @registry-category ui
 * @registry-type components:ui
 */

export type SkeuomorphicButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "ghost"
  | "outline"
  | "glass"
  | "gradient"
  | "elevated"
  | "soft";

export type SkeuomorphicButtonColor =
  | "blue"
  | "indigo"
  | "purple"
  | "violet"
  | "pink"
  | "rose"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "slate"
  | "zinc"
  | "stone"
  | "gray"
  | "black"
  | "white";

export type SkeuomorphicButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type SkeuomorphicButtonShape =
  | "rounded"
  | "pill"
  | "square"
  | "soft-rounded"
  | "circle";

export interface SkeuomorphicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SkeuomorphicButtonVariant;
  color?: SkeuomorphicButtonColor;
  size?: SkeuomorphicButtonSize;
  shape?: SkeuomorphicButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  elevation?: "low" | "medium" | "high";
  glow?: boolean;
  pressedEffect?: boolean;
}

const colorMap: Record<SkeuomorphicButtonColor, string> = {
  blue: "from-blue-500 to-blue-600 shadow-blue-900/40",
  indigo: "from-indigo-500 to-indigo-600 shadow-indigo-900/40",
  purple: "from-purple-500 to-purple-600 shadow-purple-900/40",
  violet: "from-violet-500 to-violet-600 shadow-violet-900/40",
  pink: "from-pink-500 to-pink-600 shadow-pink-900/40",
  rose: "from-rose-500 to-rose-600 shadow-rose-900/40",
  red: "from-red-500 to-red-600 shadow-red-900/40",
  orange: "from-orange-500 to-orange-600 shadow-orange-900/40",
  amber: "from-amber-500 to-amber-600 shadow-amber-900/40",
  yellow: "from-yellow-400 to-yellow-500 shadow-yellow-900/40",
  lime: "from-lime-500 to-lime-600 shadow-lime-900/40",
  green: "from-green-500 to-green-600 shadow-green-900/40",
  emerald: "from-emerald-500 to-emerald-600 shadow-emerald-900/40",
  teal: "from-teal-500 to-teal-600 shadow-teal-900/40",
  cyan: "from-cyan-500 to-cyan-600 shadow-cyan-900/40",
  sky: "from-sky-500 to-sky-600 shadow-sky-900/40",
  slate: "from-slate-500 to-slate-600 shadow-slate-900/40",
  zinc: "from-zinc-500 to-zinc-600 shadow-zinc-900/40",
  stone: "from-stone-500 to-stone-600 shadow-stone-900/40",
  gray: "from-gray-500 to-gray-600 shadow-gray-900/40",
  black: "from-black to-zinc-900 shadow-black/60",
  white: "from-white to-gray-100 shadow-gray-300/40 text-gray-900",
};

const shapeMap: Record<SkeuomorphicButtonShape, string> = {
  rounded: "rounded-xl",
  pill: "rounded-full",
  square: "rounded-none",
  "soft-rounded": "rounded-3xl",
  circle: "rounded-full",
};

const getSizeStyles = (size: SkeuomorphicButtonSize, shape: SkeuomorphicButtonShape) => {
  const isCircle = shape === "circle";
  
  switch (size) {
    case "xs": return isCircle ? "w-7 h-7 text-xs p-0" : "px-2.5 py-1 text-xs";
    case "sm": return isCircle ? "w-9 h-9 text-sm p-0" : "px-3 py-1.5 text-sm";
    case "md": return isCircle ? "w-11 h-11 text-base p-0" : "px-5 py-2.5 text-base";
    case "lg": return isCircle ? "w-14 h-14 text-lg p-0" : "px-8 py-3.5 text-lg";
    case "xl": return isCircle ? "w-16 h-16 text-xl p-0" : "px-10 py-4.5 text-xl font-bold";
    default: return "";
  }
};

const getIconSize = (size: SkeuomorphicButtonSize) => {
  switch (size) {
    case "xs": return "[&>svg]:w-3 [&>svg]:h-3";
    case "sm": return "[&>svg]:w-4 [&>svg]:h-4";
    case "md": return "[&>svg]:w-5 [&>svg]:h-5";
    case "lg": return "[&>svg]:w-6 [&>svg]:h-6";
    case "xl": return "[&>svg]:w-7 [&>svg]:h-7";
    default: return "[&>svg]:w-5 [&>svg]:h-5";
  }
};

const elevationMap = {
  low: "shadow-sm",
  medium: "shadow-md",
  high: "shadow-lg",
};

export const SkeuomorphicButton = React.forwardRef<
  HTMLButtonElement,
  SkeuomorphicButtonProps
>(
  (
    {
      variant = "primary",
      color = "blue",
      size = "md",
      shape = "rounded",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      elevation = "medium",
      glow = false,
      pressedEffect = true,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Filter out props that might conflict with motion.button
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const isWhite = color === "white";
    const isBlack = color === "black";

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer overflow-hidden",
      "font-medium tracking-tight select-none",
      "border-t border-white/20 border-l border-white/10",
      fullWidth && "w-full",
      shapeMap[shape],
      getSizeStyles(size, shape),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const variantStyles = {
      primary: cn(
        "bg-gradient-to-b text-white",
        colorMap[color],
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]",
        "active:shadow-[0_2px_0_0_rgba(0,0,0,0.2),0_4px_8px_-2px_rgba(0,0,0,0.3)]"
      ),
      secondary: cn(
        "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.1),0_8px_16px_-4px_rgba(0,0,0,0.1)]",
        "active:shadow-[0_2px_0_0_rgba(0,0,0,0.1),0_4px_8px_-2px_rgba(0,0,0,0.1)]"
      ),
      success: cn(
        "bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-emerald-900/40",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
      ),
      danger: cn(
        "bg-gradient-to-b from-red-500 to-red-600 text-white shadow-red-900/40",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
      ),
      warning: cn(
        "bg-gradient-to-b from-amber-400 to-amber-500 text-white shadow-amber-900/40",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
      ),
      info: cn(
        "bg-gradient-to-b from-sky-400 to-sky-500 text-white shadow-sky-900/40",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
      ),
      neutral: cn(
        "bg-gradient-to-b from-zinc-700 to-zinc-800 text-white shadow-zinc-900/40",
        "shadow-[0_4px_0_0_rgba(0,0,0,0.2),0_8px_16px_-4px_rgba(0,0,0,0.3)]"
      ),
      ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 border-none shadow-none text-zinc-600 dark:text-zinc-400",
      outline: cn(
        "bg-transparent border-2 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800",
        "shadow-[0_2px_0_0_rgba(0,0,0,0.05)] active:shadow-none"
      ),
      glass: cn(
        "bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 text-white",
        "shadow-[0_4px_30px_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        "hover:bg-white/20 transition-all"
      ),
      gradient: cn(
        "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white",
        "shadow-[0_4px_0_0_rgba(79,70,229,0.3),0_8px_20px_-4px_rgba(79,70,229,0.4)]"
      ),
      elevated: cn(
        "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white",
        "shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2),0_6px_6px_-3px_rgba(0,0,0,0.1),inset_0_2px_0_0_rgba(255,255,255,0.5)] dark:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5),0_6px_6px_-3px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      ),
      soft: cn(
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white",
        "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)]"
      ),
    };

    const getGlowStyles = () => {
      if (!glow) return "";
      return "after:absolute after:inset-0 after:z-[-1] after:blur-xl after:opacity-50 after:scale-110 after:bg-inherit hover:after:opacity-80 transition-all";
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { y: -2, scale: 1.01 } : {}}
        whileTap={!disabled && pressedEffect ? { y: 2, scale: 0.98 } : {}}
        className={cn(baseStyles, variantStyles[variant], getGlowStyles())}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {/* Reflection Highlight */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-gradient-to-tr from-white/0 via-white/30 to-white/60 mix-blend-overlay" />
        
        {/* Inner Bevel */}
        <div className="absolute inset-[1px] z-0 pointer-events-none rounded-[inherit] border-t border-white/30 border-l border-white/20" />
        
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          )}
          
          {!loading && icon && iconPosition === "left" && (
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>{icon}</span>
          )}
          
          {children && <span className="truncate">{children}</span>}
          
          {!loading && icon && iconPosition === "right" && (
            <span className={cn("shrink-0 inline-flex items-center justify-center", getIconSize(size))}>{icon}</span>
          )}
        </div>

        {/* Glossy Overlay */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </motion.button>
    );
  }
);

SkeuomorphicButton.displayName = "SkeuomorphicButton";
