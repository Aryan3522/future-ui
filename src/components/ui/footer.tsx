"use client";

/**
 * @registry-slug footer
 * @registry-name Footer
 * @registry-description A premium, modern footer component with full theme support, variants, layouts, and sizes.
 * @registry-category ui
 * @registry-dependency next/link
 */

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FooterColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FooterShape = "default" | "square" | "rounded" | "sharp";
export type FooterSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type FooterTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type FooterVariant = "solid" | "outline" | "ghost";
export type FooterSize = "default" | "sm" | "md" | "lg" | "xl" | "full";
export type FooterLayout = "default" | "split" | "centered" | "minimal";

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  color?: FooterColor;
  shape?: FooterShape;
  spacing?: FooterSpacing;
  theme?: FooterTheme;
  variant?: FooterVariant;
  size?: FooterSize;
  layout?: FooterLayout;
}

const colorMap: Record<FooterColor, { border: string; bg: string; text: string; bgActive: string; bgHover: string; ring: string; gradient: string }> = {
  default: { border: "border-foreground/50", bg: "bg-foreground", text: "text-foreground", bgActive: "bg-foreground/5", bgHover: "hover:text-foreground", ring: "focus:ring-ring/20", gradient: "from-foreground/10" },
  blue: { border: "border-blue-500", bg: "bg-blue-600", text: "text-blue-600", bgActive: "bg-blue-600/5", bgHover: "hover:text-blue-500", ring: "focus:ring-blue-600/20", gradient: "from-blue-500/10" },
  emerald: { border: "border-emerald-500", bg: "bg-emerald-600", text: "text-emerald-600", bgActive: "bg-emerald-600/5", bgHover: "hover:text-emerald-500", ring: "focus:ring-emerald-600/20", gradient: "from-emerald-500/10" },
  rose: { border: "border-rose-500", bg: "bg-rose-600", text: "text-rose-600", bgActive: "bg-rose-600/5", bgHover: "hover:text-rose-500", ring: "focus:ring-rose-600/20", gradient: "from-rose-500/10" },
  amber: { border: "border-amber-500", bg: "bg-amber-500", text: "text-amber-600", bgActive: "bg-amber-500/5", bgHover: "hover:text-amber-500", ring: "focus:ring-amber-500/20", gradient: "from-amber-500/10" },
  violet: { border: "border-violet-500", bg: "bg-violet-600", text: "text-violet-600", bgActive: "bg-violet-600/5", bgHover: "hover:text-violet-500", ring: "focus:ring-violet-600/20", gradient: "from-violet-500/10" },
  indigo: { border: "border-indigo-500", bg: "bg-indigo-600", text: "text-indigo-600", bgActive: "bg-indigo-600/5", bgHover: "hover:text-indigo-500", ring: "focus:ring-indigo-600/20", gradient: "from-indigo-500/10" },
  sky: { border: "border-sky-500", bg: "bg-sky-500", text: "text-sky-600", bgActive: "bg-sky-500/5", bgHover: "hover:text-sky-500", ring: "focus:ring-sky-500/20", gradient: "from-sky-500/10" },
  slate: { border: "border-slate-500", bg: "bg-slate-600", text: "text-slate-600", bgActive: "bg-slate-600/5", bgHover: "hover:text-slate-500", ring: "focus:ring-slate-600/20", gradient: "from-slate-500/10" },
  orange: { border: "border-orange-500", bg: "bg-orange-500", text: "text-orange-600", bgActive: "bg-orange-500/5", bgHover: "hover:text-orange-500", ring: "focus:ring-orange-500/20", gradient: "from-orange-500/10" },
};

const getShapeClass = (shape: FooterShape, layout: FooterLayout) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-t-[2px]";
    case "rounded": return "rounded-t-3xl";
    case "default": return "rounded-none";
  }
};

const getSpacingClass = (spacing: FooterSpacing, size: FooterSize) => {
  switch (spacing) {
    case "2x": return size === "sm" ? "py-4 px-4 gap-2" : "py-6 px-4 gap-4";
    case "4x": return size === "sm" ? "py-6 px-6 gap-4" : "py-8 px-6 gap-6";
    case "6x": return size === "sm" ? "py-8 px-8 gap-6" : size === "lg" ? "py-16 px-12 gap-10" : "py-12 px-8 gap-8";
    case "8x": return size === "sm" ? "py-10 px-10 gap-8" : size === "lg" ? "py-24 px-16 gap-16" : "py-20 px-12 gap-12";
    default: return size === "sm" ? "py-6 px-4 gap-4" : size === "lg" ? "py-12 px-8 gap-8" : "py-8 px-6 gap-6";
  }
};

const getThemeClasses = (theme: FooterTheme, colorInfo: any, variant: FooterVariant) => {
  let bgClass = "bg-background";
  let borderClass = "border-t border-border";
  let textClass = "";

  if (variant === "solid") {
    bgClass = "bg-background";
    borderClass = `border-t-4 ${colorInfo.border}`;
  } else if (variant === "ghost") {
    bgClass = colorInfo.bgActive;
    borderClass = "border-transparent";
  } else if (variant === "outline") {
    bgClass = "bg-transparent";
    borderClass = `border-t-2 border-dashed ${colorInfo.border}`;
  }

  switch (theme) {
    case "modern": return `backdrop-blur-xl bg-background/60 border-t border-border/40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]`;
    case "clean": return `bg-transparent border-t border-border/30`;
    case "futuristic": return `bg-black/90 backdrop-blur-md border-t border-white/10 shadow-[0_-5px_30px_rgba(255,255,255,0.03)] text-white`;
    case "brutal": return `bg-background border-t-4 border-foreground shadow-[0_-8px_0px_0px_currentColor]`;
    case "halftone": return `bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:16px_16px] border-t-2 border-dashed ${colorInfo.border}`;
    default: return `${bgClass} ${borderClass} ${textClass}`;
  }
};

export const Footer = React.memo(React.forwardRef<HTMLElement, FooterProps>(
  ({ 
    className, 
    color = "default", 
    shape = "default", 
    spacing = "default", 
    theme = "default",
    variant = "outline",
    size = "md",
    layout = "default",
    ...props 
  }, ref) => {
    const activeTheme = colorMap[color];
    const shapeClass = getShapeClass(shape, layout);
    const spacingClass = getSpacingClass(spacing, size);
    const themeClass = getThemeClasses(theme, activeTheme, variant);

    const isSolid = variant === "solid" && (theme === "default" || theme === "clean");
    const isGhost = variant === "ghost" && (theme === "default" || theme === "clean");
    const isFuturistic = theme === "futuristic";
    
    // Dynamic text colors based on theme/variant
    const titleColor = isSolid || isGhost ? activeTheme.text : isFuturistic ? "text-white" : "text-foreground";
    const subtitleColor = isFuturistic ? "text-white/60" : "text-muted-foreground/60";
    const linkColor = isSolid || isGhost ? `text-muted-foreground ${activeTheme.bgHover}` : isFuturistic ? "text-white/80 hover:text-white" : `text-muted-foreground ${activeTheme.bgHover}`;

    return (
      <footer 
        ref={ref} 
        className={cn(
          "w-full relative z-10 mt-auto transition-all duration-300", 
          themeClass,
          shapeClass, 
          className
        )} 
        {...props}
      >
        <div className={cn(
          "max-w-7xl mx-auto flex flex-col w-full",
          layout === "centered" ? "items-center text-center" : "items-start",
          spacingClass
        )}>
          
          {layout === "split" && (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                <span className={cn("font-display text-2xl font-black tracking-tighter", titleColor)}>FUTURE_UI</span>
                <p className={cn("text-sm max-w-sm leading-relaxed", subtitleColor)}>
                  Precision engineered components for the modern web. Build stunning, highly interactive applications in record time.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className={cn("font-bold text-sm uppercase tracking-widest", titleColor)}>Resources</span>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/components">Components</Link>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/docs">Documentation</Link>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/themes">Themes</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className={cn("font-bold text-sm uppercase tracking-widest", titleColor)}>Legal</span>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/privacy">Privacy Policy</Link>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/terms">Terms of Service</Link>
                <Link className={cn("text-sm transition-colors", linkColor)} href="/cookies">Cookie Policy</Link>
              </div>
            </div>
          )}

          <div className={cn(
            "w-full flex flex-col md:flex-row justify-between items-center gap-6",
            layout === "split" && "pt-8 border-t border-border/20",
            layout === "centered" && "flex-col justify-center"
          )}>
            {layout !== "split" && (
              <div className={cn("flex flex-col gap-1", layout === "centered" ? "items-center" : "items-center md:items-start")}>
                <span className={cn("font-display text-xl font-bold tracking-tighter", titleColor)}>FUTURE_UI</span>
                {layout !== "minimal" && <span className={cn("font-mono text-[11px] uppercase tracking-widest", subtitleColor)}>Precision Engineered</span>}
              </div>
            )}
            
            {layout !== "minimal" && (
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
                <Link className={cn("font-mono text-[13px] transition-colors opacity-80 hover:opacity-100", linkColor)} href="/privacy">Privacy</Link>
                <Link className={cn("font-mono text-[13px] transition-colors opacity-80 hover:opacity-100", linkColor)} href="/terms">Terms</Link>
                <a className={cn("font-mono text-[13px] transition-colors opacity-80 hover:opacity-100", linkColor)} href="https://github.com/Aryan3522/future-ui" target="_blank" rel="noopener noreferrer">Github</a>
                <a className={cn("font-mono text-[13px] transition-colors opacity-80 hover:opacity-100", linkColor)} href="#">Discord</a>
              </div>
            )}

            {layout === "split" && (
              <span className={cn("font-mono text-[11px] uppercase tracking-widest", subtitleColor)}>
                © {new Date().getFullYear()} FUTURE UI. ALL RIGHTS RESERVED.
              </span>
            )}
          </div>
        </div>
      </footer>
    );
  }
));

Footer.displayName = "Footer";
