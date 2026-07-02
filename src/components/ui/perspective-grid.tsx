/**
 * @registry-slug perspective-grid
 * @registry-name Perspective Grid
 * @registry-description A Future UI Perspective Grid component.
 * @registry-category ui
 */
"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type PerspectiveGridColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type PerspectiveGridShape = "default" | "square" | "rounded" | "sharp";
export type PerspectiveGridSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type PerspectiveGridVariant = "solid" | "outline" | "ghost" | "neon" | "retro";
export type PerspectiveGridSize = "sm" | "md" | "lg";

export interface PerspectiveGridProps {
  className?: string;
  gridLineGap?: number;
  showOverlay?: boolean;
  fadeRadius?: number;
  color?: PerspectiveGridColor;
  shape?: PerspectiveGridShape;
  spacing?: PerspectiveGridSpacing;
  variant?: PerspectiveGridVariant;
  size?: PerspectiveGridSize;
}

const solidColorMap: Record<PerspectiveGridColor, string> = {
  default: "text-muted-foreground/30",
  blue: "text-blue-600/30 dark:text-blue-500/30",
  emerald: "text-emerald-600/30 dark:text-emerald-500/30",
  rose: "text-rose-600/30 dark:text-rose-500/30",
  amber: "text-amber-600/30 dark:text-amber-500/30",
  violet: "text-violet-600/30 dark:text-violet-500/30",
  indigo: "text-indigo-600/30 dark:text-indigo-500/30",
  sky: "text-sky-600/30 dark:text-sky-500/30",
  slate: "text-slate-600/30 dark:text-slate-500/30",
  orange: "text-orange-600/30 dark:text-orange-500/30",
};

const outlineColorMap: Record<PerspectiveGridColor, string> = {
  default: "text-muted-foreground/60",
  blue: "text-blue-600/60 dark:text-blue-500/60",
  emerald: "text-emerald-600/60 dark:text-emerald-500/60",
  rose: "text-rose-600/60 dark:text-rose-500/60",
  amber: "text-amber-600/60 dark:text-amber-500/60",
  violet: "text-violet-600/60 dark:text-violet-500/60",
  indigo: "text-indigo-600/60 dark:text-indigo-500/60",
  sky: "text-sky-600/60 dark:text-sky-500/60",
  slate: "text-slate-600/60 dark:text-slate-500/60",
  orange: "text-orange-600/60 dark:text-orange-500/60",
};

const ghostColorMap: Record<PerspectiveGridColor, string> = {
  default: "text-muted-foreground/10",
  blue: "text-blue-600/10 dark:text-blue-500/10",
  emerald: "text-emerald-600/10 dark:text-emerald-500/10",
  rose: "text-rose-600/10 dark:text-rose-500/10",
  amber: "text-amber-600/10 dark:text-amber-500/10",
  violet: "text-violet-600/10 dark:text-violet-500/10",
  indigo: "text-indigo-600/10 dark:text-indigo-500/10",
  sky: "text-sky-600/10 dark:text-sky-500/10",
  slate: "text-slate-600/10 dark:text-slate-500/10",
  orange: "text-orange-600/10 dark:text-orange-500/10",
};

const neonGradientMap: Record<PerspectiveGridColor, string> = {
  default: "bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-purple-600",
  blue: "bg-gradient-to-br from-blue-400 via-blue-600 to-cyan-400",
  emerald: "bg-gradient-to-br from-emerald-400 via-emerald-600 to-teal-400",
  rose: "bg-gradient-to-br from-rose-400 via-rose-600 to-pink-400",
  amber: "bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-400",
  violet: "bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-400",
  indigo: "bg-gradient-to-br from-indigo-400 via-indigo-600 to-blue-500",
  sky: "bg-gradient-to-br from-sky-300 via-sky-500 to-blue-400",
  slate: "bg-gradient-to-br from-slate-400 via-slate-600 to-gray-400",
  orange: "bg-gradient-to-br from-orange-400 via-orange-600 to-red-400",
};

const retroColorMap: Record<PerspectiveGridColor, string> = {
  default: "text-muted-foreground/50",
  blue: "text-blue-600/50 dark:text-blue-500/50",
  emerald: "text-emerald-600/50 dark:text-emerald-500/50",
  rose: "text-rose-600/50 dark:text-rose-500/50",
  amber: "text-amber-600/50 dark:text-amber-500/50",
  violet: "text-violet-600/50 dark:text-violet-500/50",
  indigo: "text-indigo-600/50 dark:text-indigo-500/50",
  sky: "text-sky-600/50 dark:text-sky-500/50",
  slate: "text-slate-600/50 dark:text-slate-500/50",
  orange: "text-orange-600/50 dark:text-orange-500/50",
};

const getShapeClass = (shape: PerspectiveGridShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-2xl";
    case "default": return "rounded-none"; // Grid typically full bleed
  }
};

const getSpacingValue = (spacing: PerspectiveGridSpacing, defaultGap: number) => {
  if (defaultGap !== 60) return defaultGap; // User provided explicit gap
  switch (spacing) {
    case "2x": return 30;
    case "4x": return 50;
    case "6x": return 70;
    case "8x": return 90;
    default: return 60;
  }
};

const getSizeValue = (size: PerspectiveGridSize) => {
  switch (size) {
    case "sm": return 1;
    case "md": return 2;
    case "lg": return 4;
    default: return 1;
  }
};

const getVariantStyles = (variant: PerspectiveGridVariant, color: PerspectiveGridColor) => {
  switch (variant) {
    case "solid":
      return { wrapperClass: solidColorMap[color], gridClass: "" };
    case "outline":
      return { wrapperClass: outlineColorMap[color], gridClass: "" };
    case "ghost":
      return { wrapperClass: ghostColorMap[color], gridClass: "" };
    case "neon":
      return { 
        wrapperClass: "", 
        gridClass: cn(
          neonGradientMap[color],
          "drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
        )
      };
    case "retro":
      return { wrapperClass: retroColorMap[color], gridClass: "" };
    default:
      return { wrapperClass: solidColorMap[color], gridClass: "" };
  }
};

export const PerspectiveGrid = React.memo(function PerspectiveGrid({
  className,
  gridLineGap = 60,
  showOverlay = true,
  fadeRadius = 80,
  color = "default",
  shape = "default",
  spacing = "default",
  variant = "solid",
  size = "sm"
}: PerspectiveGridProps) {
  const shapeClass = getShapeClass(shape);
  const actualGap = getSpacingValue(spacing, gridLineGap);
  const actualThickness = getSizeValue(size);
  const { wrapperClass, gridClass } = getVariantStyles(variant, color);

  const isNeon = variant === "neon";
  const linePaint = isNeon ? "black" : "currentColor";

  const gridLinesImage = `
    repeating-linear-gradient(
      to right,
      ${linePaint} 0px,
      ${linePaint} ${actualThickness}px,
      transparent ${actualThickness}px,
      transparent ${actualGap}px
    ),
    repeating-linear-gradient(
      to bottom,
      ${linePaint} 0px,
      ${linePaint} ${actualThickness}px,
      transparent ${actualThickness}px,
      transparent ${actualGap}px
    )
  `;

  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-background",
        wrapperClass,
        shapeClass,
        "[--fade-stop:theme(colors.background)]",
        className
      )}
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className={cn("absolute w-[80rem] aspect-square origin-center", gridClass)}
        style={{
          left: "50%",
          top: "50%",
          transform: variant === "retro"
            ? "translate(-50%, -50%) rotateX(60deg) scale(2.5)"
            : "translate(-50%, -50%) rotateX(30deg) rotateY(-5deg) rotateZ(20deg) scale(2)",
          transformStyle: "preserve-3d",
          ...(isNeon 
            ? {
                WebkitMaskImage: gridLinesImage,
                maskImage: gridLinesImage,
              }
            : {
                backgroundImage: gridLinesImage,
              }
          )
        }}
      />

      {showOverlay && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle, transparent 25%, var(--fade-stop) ${fadeRadius}%)`,
          }}
        />
      )}
    </div>
  );
});
PerspectiveGrid.displayName = "PerspectiveGrid";

export default React.memo(PerspectiveGrid);
