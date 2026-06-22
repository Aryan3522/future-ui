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
  | "ghost"
  | "outline"
  | "soft"
  | "elevated"
  | "gradient"
  | "glass";

export type ClayMorphButtonColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ClayMorphButtonShape = "default" | "square" | "rounded" | "sharp" | "cut-two" | "cut-all";
export type ClayMorphButtonSpacing = "default" | "2x" | "4x" | "6x" | "8x";

export interface ClayMorphButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ClayMorphButtonVariant;
  color?: ClayMorphButtonColor;
  spacing?: ClayMorphButtonSpacing;
  shape?: ClayMorphButtonShape;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  iconOnly?: boolean;
  elevation?: "flat" | "medium" | "elevated" | "floating";
  glow?: boolean;
}

const colorThemeMap: Record<ClayMorphButtonColor, { radial: string; bg: string; text: string; bgSoft: string; border: string; shadow: string; brutalShadow: string; brutalBg: string; hoverBg: string; textHover: string; glow: string; }> = {
  default: { radial: "rgba(128,128,128,0.5)", bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]", brutalBg: "bg-white dark:bg-zinc-900 border-foreground text-foreground", hoverBg: "hover:bg-primary", textHover: "hover:text-primary-foreground", glow: "shadow-[0_0_40px_-10px_rgba(128,128,128,0.5)]" },
  blue: { radial: "#2563eb", bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/10 dark:shadow-blue-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]", brutalBg: "bg-blue-400 dark:bg-blue-600 border-blue-600 dark:border-blue-400 text-white", hoverBg: "hover:bg-blue-600 dark:hover:bg-blue-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)]" },
  emerald: { radial: "#16a34a", bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/10 dark:shadow-emerald-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(22,163,74,1)]", brutalBg: "bg-emerald-400 dark:bg-emerald-600 border-emerald-600 dark:border-emerald-400 text-white", hoverBg: "hover:bg-emerald-600 dark:hover:bg-emerald-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(22,163,74,0.5)]" },
  rose: { radial: "#e11d48", bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/10 dark:shadow-rose-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(225,29,72,1)]", brutalBg: "bg-rose-400 dark:bg-rose-600 border-rose-600 dark:border-rose-400 text-white", hoverBg: "hover:bg-rose-600 dark:hover:bg-rose-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(225,29,72,0.5)]" },
  amber: { radial: "#d97706", bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/10 dark:shadow-amber-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(217,119,6,1)]", brutalBg: "bg-amber-400 dark:bg-amber-600 border-amber-600 dark:border-amber-400 text-white", hoverBg: "hover:bg-amber-600 dark:hover:bg-amber-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)]" },
  violet: { radial: "#7c3aed", bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/10 dark:shadow-violet-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(124,58,237,1)]", brutalBg: "bg-violet-400 dark:bg-violet-600 border-violet-600 dark:border-violet-400 text-white", hoverBg: "hover:bg-violet-600 dark:hover:bg-violet-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]" },
  indigo: { radial: "#4f46e5", bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/10 dark:shadow-indigo-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(79,70,229,1)]", brutalBg: "bg-indigo-400 dark:bg-indigo-600 border-indigo-600 dark:border-indigo-400 text-white", hoverBg: "hover:bg-indigo-600 dark:hover:bg-indigo-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]" },
  sky: { radial: "#0284c7", bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/10 dark:shadow-sky-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(2,132,199,1)]", brutalBg: "bg-sky-400 dark:bg-sky-600 border-sky-600 dark:border-sky-400 text-white", hoverBg: "hover:bg-sky-600 dark:hover:bg-sky-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(2,132,199,0.5)]" },
  slate: { radial: "#475569", bg: "bg-slate-600 dark:bg-slate-400", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/10 dark:shadow-slate-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(71,85,105,1)]", brutalBg: "bg-slate-400 dark:bg-slate-600 border-slate-600 dark:border-slate-400 text-white", hoverBg: "hover:bg-slate-600 dark:hover:bg-slate-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(71,85,105,0.5)]" },
  orange: { radial: "#ea580c", bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/10 dark:shadow-orange-500/10", brutalShadow: "shadow-[8px_8px_0px_0px_rgba(234,88,12,1)]", brutalBg: "bg-orange-400 dark:bg-orange-600 border-orange-600 dark:border-orange-400 text-white", hoverBg: "hover:bg-orange-600 dark:hover:bg-orange-500", textHover: "hover:text-white", glow: "shadow-[0_0_40px_-10px_rgba(234,88,12,0.5)]" },
};

const getShapeClass = (shape: ClayMorphButtonShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[2px]";
    case "rounded": return "rounded-xl";
    case "cut-two": return "rounded-none [clip-path:polygon(10px_0,100%_0,100%_calc(100%-10px),calc(100%-10px)_100%,0_100%,0_10px)]";
    case "cut-all": return "rounded-none [clip-path:polygon(10px_0,calc(100%-10px)_0,100%_10px,100%_calc(100%-10px),calc(100%-10px)_100%,10px_100%,0_calc(100%-10px),0_10px)]";
    case "default": return "rounded-3xl"; // A bit more rounded for claymorphism by default
  }
};

const getSpacingStyles = (spacing: ClayMorphButtonSpacing, iconOnly: boolean) => {
  if (iconOnly) {
    switch (spacing) {
      case "2x": return "w-7 h-7 p-0 flex items-center justify-center text-xs";
      case "4x": return "w-9 h-9 p-0 flex items-center justify-center text-sm";
      case "6x": return "w-12 h-12 p-0 flex items-center justify-center text-base";
      case "8x": return "w-16 h-16 p-0 flex items-center justify-center text-lg";
      default: return "w-10 h-10 p-0 flex items-center justify-center text-sm";
    }
  }
  switch (spacing) {
    case "2x": return "px-3 py-1.5 text-xs";
    case "4x": return "px-4 py-2 text-sm";
    case "6x": return "px-6 py-3 text-base";
    case "8x": return "px-8 py-4 text-lg";
    default: return "px-5 py-2.5 text-sm";
  }
};

const getIconSize = (spacing: ClayMorphButtonSpacing) => {
  switch (spacing) {
    case "2x": return "[&>svg]:w-3.5 [&>svg]:h-3.5";
    case "4x": return "[&>svg]:w-4 [&>svg]:h-4";
    case "6x": return "[&>svg]:w-5 [&>svg]:h-5";
    case "8x": return "[&>svg]:w-6 [&>svg]:h-6";
    default: return "[&>svg]:w-4 [&>svg]:h-4";
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
      color = "default",
      spacing = "default",
      shape = "default",
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = "left",
      iconOnly = false,
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
      getShapeClass(shape),
      getSpacingStyles(spacing, iconOnly),
      disabled && "opacity-50 cursor-not-allowed grayscale",
      className
    );

    const activeTheme = colorThemeMap[color];
    const isDefault = color === "default";
    
    const variantStyles = {
      primary: cn(
        isDefault ? "bg-foreground text-background" : cn(activeTheme.bg, "text-white"), 
        getElevationStyles(elevation)
      ),
      ghost: cn(
        "bg-transparent hover:bg-accent",
        activeTheme.text,
        "shadow-none active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.05)] dark:active:shadow-[inset_2px_4px_8px_rgba(0,0,0,0.3)]"
      ),
      outline: cn(
        "bg-transparent border-2 hover:bg-accent",
        activeTheme.border, activeTheme.text,
        "shadow-[4px_4px_10px_rgba(0,0,0,0.02),-4px_-4px_10px_rgba(255,255,255,0.5)] dark:shadow-[4px_4px_10px_rgba(0,0,0,0.3),-4px_-4px_10px_rgba(255,255,255,0.02)]"
      ),
      soft: cn(
        isDefault ? "bg-foreground/10 text-foreground" : cn(activeTheme.bgSoft, activeTheme.text),
        "shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.6),inset_2px_4px_8px_rgba(255,255,255,0.8),inset_-2px_-4px_8px_rgba(0,0,0,0.02)]",
        "dark:shadow-[4px_4px_10px_rgba(0,0,0,0.4),-4px_-4px_10px_rgba(255,255,255,0.02),inset_2px_4px_8px_rgba(255,255,255,0.05),inset_-2px_-4px_8px_rgba(0,0,0,0.2)]"
      ),
      elevated: cn(
        isDefault ? "bg-foreground text-background" : cn(activeTheme.bg, "text-white"), 
        getElevationStyles("elevated")
      ),
      gradient: cn(
        isDefault ? "bg-gradient-to-br from-foreground/80 to-foreground text-background dark:from-background dark:to-background/80 dark:text-foreground" : cn(activeTheme.bg, "text-white bg-gradient-to-br from-white/10 to-transparent mix-blend-multiply dark:mix-blend-screen"),
        getElevationStyles(elevation)
      ),
      glass: cn(
        "backdrop-blur-lg border",
        isDefault ? "bg-foreground/5 dark:bg-background/10 border-foreground/10 text-foreground" : cn(activeTheme.bgSoft, activeTheme.border, activeTheme.text),
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
                getIconSize(spacing)
              )}
            >
              {icon}
            </span>
          )}

          {!iconOnly && children && <span className="truncate">{children}</span>}

          {!loading && icon && iconPosition === "right" && (
            <span
              className={cn(
                "shrink-0 inline-flex items-center justify-center",
                getIconSize(spacing)
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
