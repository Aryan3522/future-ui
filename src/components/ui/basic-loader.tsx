/**
 * @registry-slug basic-loader
 * @registry-name Basic Loader
 * @registry-description A modern, animated loading indicator with multiple visual styles.
 * @registry-category ui
 * @registry-dependency framer-motion
 */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export type BasicLoaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type BasicLoaderSize = "sm" | "md" | "lg";
export type BasicLoaderShape = "default" | "square" | "rounded" | "sharp";

export interface BasicLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "modern" | "clean" | "minimal";
  color?: BasicLoaderColor;
  size?: BasicLoaderSize;
  shape?: BasicLoaderShape;
  text?: string;
  customColor?: string; // Kept for exact backwards compatibility if needed
}

const colorThemeMap: Record<BasicLoaderColor, string> = {
  default: "currentColor", // uses current text color / foreground
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  indigo: "#6366f1",
  sky: "#0ea5e9",
  slate: "#64748b",
  orange: "#f97316",
};

const getShapeClass = (shape: BasicLoaderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-[4px]";
    case "rounded": return "rounded-md";
    case "default": return "rounded-full";
  }
};

const getSizeClasses = (variant: string, size: BasicLoaderSize) => {
  if (variant === "modern") {
    switch (size) {
      case "sm": return { outer: "w-8 h-8 border-2", inner: "inset-1 border-2" };
      case "lg": return { outer: "w-24 h-24 border-[6px]", inner: "inset-3 border-[6px]" };
      default: return { outer: "w-16 h-16 border-4", inner: "inset-2 border-4" };
    }
  }
  if (variant === "clean") {
    switch (size) {
      case "sm": return { dot: "w-2 h-2" };
      case "lg": return { dot: "w-4 h-4" };
      default: return { dot: "w-3 h-3" };
    }
  }
  if (variant === "minimal") {
    switch (size) {
      case "sm": return { main: "w-4 h-4 border-2" };
      case "lg": return { main: "w-12 h-12 border-4" };
      default: return { main: "w-8 h-8 border-2" };
    }
  }
  // default case
  switch (size) {
    case "sm": return { main: "w-6 h-6 border-2" };
    case "lg": return { main: "w-14 h-14 border-4" };
    default: return { main: "w-10 h-10 border-4" };
  }
};

const getTextSpacingClass = (size: BasicLoaderSize) => {
  switch (size) {
    case "sm": return "mt-2 text-xs";
    case "lg": return "mt-6 text-base";
    default: return "mt-4 text-sm";
  }
};

export const BasicLoader: React.FC<BasicLoaderProps> = React.memo(({ 
  className, 
  variant = "modern", 
  color = "default", 
  size = "md",
  shape = "default",
  customColor,
  text, 
  ...props 
}) => {
  
  const activeColor = customColor || colorThemeMap[color];
  const sizeClasses = getSizeClasses(variant, size);
  // Shape is only strictly supported/required for "clean", but we define it here
  const shapeClass = getShapeClass(shape);

  const getLoader = () => {
    switch (variant) {
      case "modern":
        return (
          <div className={`relative ${sizeClasses.outer?.split(" ").slice(0, 2).join(" ")}`}>
            <motion.div
              className={cn("absolute inset-0 border-solid border-transparent rounded-full", sizeClasses.outer?.split(" ").slice(2).join(" "))}
              style={{ borderTopColor: activeColor }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className={cn("absolute border-solid border-transparent opacity-50 rounded-full", sizeClasses.inner)}
              style={{ borderBottomColor: activeColor }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
      case "clean":
        return (
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(sizeClasses.dot, shapeClass)}
                style={{ backgroundColor: activeColor }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        );
      case "minimal":
        return (
          <motion.div
            className={cn("border-solid border-transparent rounded-full", sizeClasses.main)}
            style={{ borderTopColor: activeColor }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        );
      default:
        return (
          <div 
            className={cn("border-solid border-muted-foreground/20 border-t-current animate-spin rounded-full", sizeClasses.main)} 
            style={{ color: activeColor }}
          />
        );
    }
  };

  return (
    <div className={cn("flex flex-col justify-center items-center w-full h-full min-h-[inherit]", className)} {...props}>
      {getLoader()}
      {text && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={cn("font-medium text-muted-foreground tracking-wide animate-pulse text-center", getTextSpacingClass(size))}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
});
BasicLoader.displayName = "BasicLoader";
