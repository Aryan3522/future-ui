"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * @registry-slug clay-morph-button
 * @registry-name Clay Morphism Button
 * @registry-description A premium, modern Claymorphism button with soft 3D extrusion, inner highlights, and tactile press effects.
 * @registry-category ui
 * @registry-type components:ui
 */

export type ClayMorphButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "neutral"
  | "ghost"
  | "outline"
  | "soft"
  | "elevated"
  | "gradient"
  | "glass";

export type ClayMorphButtonColor =
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
  | "gray"
  | "black"
  | "white";

export type ClayMorphButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ClayMorphButtonShape =
  | "rounded"
  | "soft-rounded"
  | "pill"
  | "square"
  | "circle";

export interface ClayMorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ClayMorphButtonVariant;
  color?: ClayMorphButtonColor;
  size?: ClayMorphButtonSize;
  shape?: ClayMorphButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  elevation?: "flat" | "medium" | "elevated" | "floating";
  glow?: boolean;
}

const colorMap: Record<ClayMorphButtonColor, string> = {
  blue: "bg-blue-500 text-white",
  indigo: "bg-indigo-500 text-white",
  purple: "bg-purple-500 text-white",
  violet: "bg-violet-500 text-white",
  pink: "bg-pink-500 text-white",
  rose: "bg-rose-500 text-white",
  red: "bg-red-500 text-white",
  orange: "bg-orange-500 text-white",
  amber: "bg-amber-500 text-white",
  yellow: "bg-yellow-400 text-zinc-900",
  lime: "bg-lime-400 text-zinc-900",
  green: "bg-green-500 text-white",
  emerald: "bg-emerald-500 text-white",
  teal: "bg-teal-500 text-white",
  cyan: "bg-cyan-500 text-white",
  sky: "bg-sky-500 text-white",
  slate: "bg-slate-500 text-white",
  zinc: "bg-zinc-500 text-white",
  gray: "bg-gray-500 text-white",
  black: "bg-zinc-900 text-white",
  white: "bg-white text-zinc-900",
};

const gradientColorMap: Record<ClayMorphButtonColor, string> = {
  blue: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
  indigo: "bg-gradient-to-br from-indigo-400 to-indigo-600 text-white",
  purple: "bg-gradient-to-br from-purple-400 to-purple-600 text-white",
  violet: "bg-gradient-to-br from-violet-400 to-violet-600 text-white",
  pink: "bg-gradient-to-br from-pink-400 to-pink-600 text-white",
  rose: "bg-gradient-to-br from-rose-400 to-rose-600 text-white",
  red: "bg-gradient-to-br from-red-400 to-red-600 text-white",
  orange: "bg-gradient-to-br from-orange-400 to-orange-600 text-white",
  amber: "bg-gradient-to-br from-amber-400 to-amber-600 text-white",
  yellow: "bg-gradient-to-br from-yellow-300 to-yellow-500 text-zinc-900",
  lime: "bg-gradient-to-br from-lime-300 to-lime-500 text-zinc-900",
  green: "bg-gradient-to-br from-green-400 to-green-600 text-white",
  emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
  teal: "bg-gradient-to-br from-teal-400 to-teal-600 text-white",
  cyan: "bg-gradient-to-br from-cyan-400 to-cyan-600 text-white",
  sky: "bg-gradient-to-br from-sky-400 to-sky-600 text-white",
  slate: "bg-gradient-to-br from-slate-400 to-slate-600 text-white",
  zinc: "bg-gradient-to-br from-zinc-400 to-zinc-600 text-white",
  gray: "bg-gradient-to-br from-gray-400 to-gray-600 text-white",
  black: "bg-gradient-to-br from-zinc-700 to-zinc-950 text-white",
  white: "bg-gradient-to-br from-white to-zinc-100 text-zinc-900",
};

const shapeMap: Record<ClayMorphButtonShape, string> = {
  rounded: "rounded-xl",
  "soft-rounded": "rounded-2xl",
  pill: "rounded-full",
  square: "rounded-none",
  circle: "rounded-full",
};

const getSizeStyles = (size: ClayMorphButtonSize, shape: ClayMorphButtonShape) => {
  const isCircle = shape === "circle";

  switch (size) {
    case "xs": return isCircle ? "w-8 h-8 text-xs p-0" : "px-3 py-1.5 text-xs";
    case "sm": return isCircle ? "w-10 h-10 text-sm p-0" : "px-4 py-2 text-sm";
    case "md": return isCircle ? "w-12 h-12 text-base p-0" : "px-6 py-3 text-base";
    case "lg": return isCircle ? "w-14 h-14 text-lg p-0" : "px-8 py-4 text-lg";
    case "xl": return isCircle ? "w-16 h-16 text-xl p-0" : "px-10 py-5 text-xl font-bold";
    default: return "";
  }
};

const getIconSize = (size: ClayMorphButtonSize) => {
  switch (size) {
    case "xs": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "sm": return "[&>svg]:w-4 [&>svg]:h-4";
    case "md": return "[&>svg]:w-5 [&>svg]:h-5";
    case "lg": return "[&>svg]:w-6 [&>svg]:h-6";
    case "xl": return "[&>svg]:w-7 [&>svg]:h-7";
    default: return "[&>svg]:w-5 [&>svg]:h-5";
  }
};

const getElevationStyles = (elevation: ClayMorphButtonProps["elevation"]) => {
  switch (elevation) {
    case "flat":
      return "shadow-[inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.1),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]";
    case "medium":
      return "shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8),inset_2px_4px_8px_rgba(255,255,255,0.4),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.5),-4px_-4px_10px_rgba(255,255,255,0.03),inset_2px_4px_8px_rgba(255,255,255,0.1),inset_-2px_-4px_8px_rgba(0,0,0,0.3)]";
    case "elevated":
      return "shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.9),inset_2px_4px_8px_rgba(255,255,255,0.5),inset_-2px_-4px_8px_rgba(0,0,0,0.15)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.6),-8px_-8px_16px_rgba(255,255,255,0.05),inset_2px_4px_8px_rgba(255,255,255,0.15),inset_-2px_-4px_8px_rgba(0,0,0,0.4)]";
    case "floating":
      return "shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,1),inset_2px_4px_8px_rgba(255,255,255,0.6),inset_-2px_-4px_8px_rgba(0,0,0,0.1)] dark:shadow-[12px_12px_24px_rgba(0,0,0,0.7),-12px_-12px_24px_rgba(255,255,255,0.06),inset_2px_4px_8px_rgba(255,255,255,0.2),inset_-2px_-4px_8px_rgba(0,0,0,0.5)]";
    default:
      return "";
  }
};

export const ClayMorphButton = React.forwardRef<
  HTMLButtonElement,
  ClayMorphButtonProps
>(
  (
    {
      variant = "primary",
      color = "blue",
      size = "md",
      shape = "soft-rounded",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      elevation = "medium",
      glow = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { onDrag, onDragStart, onDragEnd, onAnimationStart, ...filteredProps } = props as any;

    const baseStyles = cn(
      "relative inline-flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer outline-none select-none",
      "font-semibold tracking-wide",
      fullWidth && "w-full",
      shapeMap[shape],
      getSizeStyles(size, shape),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const variantStyles = {
      primary: cn(colorMap[color], getElevationStyles(elevation)),
      secondary: cn(
        "bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100",
        getElevationStyles(elevation)
      ),
      success: cn("bg-emerald-500 text-white", getElevationStyles(elevation)),
      danger: cn("bg-red-500 text-white", getElevationStyles(elevation)),
      warning: cn("bg-amber-400 text-zinc-900", getElevationStyles(elevation)),
      info: cn("bg-sky-500 text-white", getElevationStyles(elevation)),
      neutral: cn("bg-zinc-500 text-white", getElevationStyles(elevation)),
      ghost: cn(
        "bg-transparent text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800",
        "shadow-none active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.05)] dark:active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.3)]"
      ),
      outline: cn(
        "bg-transparent border-2 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200",
        "hover:bg-zinc-50 dark:hover:bg-zinc-800",
        "shadow-[4px_4px_10px_rgba(0,0,0,0.02),-4px_-4px_10px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.02)]"
      ),
      soft: cn(
        colorMap[color],
        "bg-opacity-20 dark:bg-opacity-20 text-current",
        "shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.6),inset_2px_4px_8px_rgba(255,255,255,0.8),inset_-2px_-4px_8px_rgba(0,0,0,0.02)]",
        "dark:shadow-[4px_4px_10px_rgba(0,0,0,0.4),-4px_-4px_10px_rgba(255,255,255,0.02),inset_2px_4px_8px_rgba(255,255,255,0.05),inset_-2px_-4px_8px_rgba(0,0,0,0.2)]"
      ),
      elevated: cn(colorMap[color], getElevationStyles("elevated")),
      gradient: cn(gradientColorMap[color], getElevationStyles(elevation)),
      glass: cn(
        "bg-white/20 dark:bg-black/20 backdrop-blur-lg border border-white/40 dark:border-white/10 text-zinc-900 dark:text-white",
        getElevationStyles(elevation)
      ),
    };

    const getGlowStyles = () => {
      if (!glow) return "";
      return "after:absolute after:inset-0 after:z-[-1] after:blur-xl after:opacity-40 after:bg-inherit hover:after:opacity-60 transition-all";
    };

    return (
      <motion.button
        ref={ref}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={
          !disabled
            ? {
                scale: 0.96,
                boxShadow:
                  "inset 4px 6px 10px rgba(0,0,0,0.15), inset -4px -6px 10px rgba(255,255,255,0.4)",
              }
            : {}
        }
        className={cn(baseStyles, variantStyles[variant], getGlowStyles())}
        disabled={disabled || loading}
        {...filteredProps}
      >
        {/* Soft Inner Glow Layer for true Claymorphism feel */}
        <div className="absolute inset-0 rounded-[inherit] pointer-events-none bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay" />

        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}

          {!loading && icon && iconPosition === "left" && (
            <span
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                getIconSize(size)
              )}
            >
              {icon}
            </span>
          )}

          {children && <span className="truncate">{children}</span>}

          {!loading && icon && iconPosition === "right" && (
            <span
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                getIconSize(size)
              )}
            >
              {icon}
            </span>
          )}
        </div>
      </motion.button>
    );
  }
);

ClayMorphButton.displayName = "ClayMorphButton";
