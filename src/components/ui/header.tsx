/**
 * @registry-slug header
 * @registry-name Header
 * @registry-description A Future UI Header component.
 * @registry-category ui
 * @registry-dependency framer-motion lucide-react
 */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import {
  Menu,
  X,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { SearchInput } from "./search-input";
import { GithubIcon, LinkedinIcon, SunIcon, MoonIcon, ChevronRightIcon } from "@/icons";
import { componentsList } from "@/data/component-library-data";

export type HeaderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type HeaderVariant = "solid" | "outline" | "ghost" | "glass";
export type HeaderTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type HeaderShape = "default" | "square" | "rounded" | "sharp";
export type HeaderSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type HeaderLayout = "default" | "centered" | "left";

export interface HeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  color?: HeaderColor;
  variant?: HeaderVariant;
  theme?: HeaderTheme;
  shape?: HeaderShape;
  spacing?: HeaderSpacing;
  layout?: HeaderLayout;
}

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
];

type ColorData = { 
  text: string; 
  border: string; 
  bgSoft: string; 
  solidBg: string; 
  glassBg: string; 
  outlineBorder: string; 
};

const colorThemeMap: Record<HeaderColor, ColorData> = {
  default: { text: "text-foreground", border: "border-border", bgSoft: "bg-muted/50", solidBg: "bg-background", glassBg: "bg-background/80", outlineBorder: "border-border/40" },
  blue: { text: "text-blue-600 dark:text-blue-500", border: "border-blue-600 dark:border-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", solidBg: "bg-blue-50 dark:bg-blue-950/50", glassBg: "bg-blue-50/80 dark:bg-blue-950/40", outlineBorder: "border-blue-600/30 dark:border-blue-500/30" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", border: "border-emerald-600 dark:border-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", solidBg: "bg-emerald-50 dark:bg-emerald-950/50", glassBg: "bg-emerald-50/80 dark:bg-emerald-950/40", outlineBorder: "border-emerald-600/30 dark:border-emerald-500/30" },
  rose: { text: "text-rose-600 dark:text-rose-500", border: "border-rose-600 dark:border-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", solidBg: "bg-rose-50 dark:bg-rose-950/50", glassBg: "bg-rose-50/80 dark:bg-rose-950/40", outlineBorder: "border-rose-600/30 dark:border-rose-500/30" },
  amber: { text: "text-amber-600 dark:text-amber-500", border: "border-amber-600 dark:border-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", solidBg: "bg-amber-50 dark:bg-amber-950/50", glassBg: "bg-amber-50/80 dark:bg-amber-950/40", outlineBorder: "border-amber-600/30 dark:border-amber-500/30" },
  violet: { text: "text-violet-600 dark:text-violet-500", border: "border-violet-600 dark:border-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", solidBg: "bg-violet-50 dark:bg-violet-950/50", glassBg: "bg-violet-50/80 dark:bg-violet-950/40", outlineBorder: "border-violet-600/30 dark:border-violet-500/30" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", border: "border-indigo-600 dark:border-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", solidBg: "bg-indigo-50 dark:bg-indigo-950/50", glassBg: "bg-indigo-50/80 dark:bg-indigo-950/40", outlineBorder: "border-indigo-600/30 dark:border-indigo-500/30" },
  sky: { text: "text-sky-600 dark:text-sky-500", border: "border-sky-600 dark:border-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", solidBg: "bg-sky-50 dark:bg-sky-950/50", glassBg: "bg-sky-50/80 dark:bg-sky-950/40", outlineBorder: "border-sky-600/30 dark:border-sky-500/30" },
  slate: { text: "text-slate-600 dark:text-slate-400", border: "border-slate-600 dark:border-slate-500", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", solidBg: "bg-slate-50 dark:bg-slate-900/50", glassBg: "bg-slate-50/80 dark:bg-slate-900/40", outlineBorder: "border-slate-600/30 dark:border-slate-500/30" },
  orange: { text: "text-orange-600 dark:text-orange-500", border: "border-orange-600 dark:border-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", solidBg: "bg-orange-50 dark:bg-orange-950/50", glassBg: "bg-orange-50/80 dark:bg-orange-950/40", outlineBorder: "border-orange-600/30 dark:border-orange-500/30" },
};

const getHeaderVariantClass = (variant: HeaderVariant, color: HeaderColor, theme: HeaderTheme) => {
  const c = colorThemeMap[color];
  const isBrutal = theme === "brutal";
  const borderStyle = isBrutal ? "border-b-4 border-black dark:border-white" : "border-b";
  
  switch (variant) {
    case "solid": return `${c.solidBg} ${borderStyle} ${color === 'default' ? 'border-border/40' : c.outlineBorder}`;
    case "outline": return `bg-transparent ${borderStyle} ${color === 'default' ? 'border-border/40' : c.outlineBorder}`;
    case "ghost": return "bg-transparent border-transparent";
    case "glass": 
    default: return `${c.glassBg} backdrop-blur-md ${borderStyle} ${color === 'default' ? 'border-border/40' : c.outlineBorder}`;
  }
};

const getHeaderShapeClass = (shape: HeaderShape) => {
  switch (shape) {
    case "square": return "w-full rounded-none top-0 mt-0";
    case "rounded": return "w-[calc(100%-2rem)] mx-auto rounded-2xl top-4 mt-4 border-l border-r border-t"; // Floating rounded
    case "sharp": return "w-[calc(100%-2rem)] mx-auto rounded-sm top-4 mt-4 border-l border-r border-t"; // Floating sharp
    case "default": return "w-full rounded-none top-0 mt-0"; // standard edge to edge
  }
};

const getThemeClass = (theme: HeaderTheme) => {
  switch (theme) {
    case "modern": return "shadow-lg shadow-black/5 dark:shadow-white/5 border-border/20";
    case "clean": return "border-b border-border/10 shadow-none";
    case "futuristic": return "border-b-2 ring-1 ring-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.1)] dark:shadow-[0_0_15px_rgba(var(--primary),0.2)]";
    case "brutal": return "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] rounded-none";
    case "halftone": return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIwLjE1Ij48L2NpcmNsZT4KPC9zdmc+')]";
    case "default":
    default: return "";
  }
};

const getMobileNavThemeClass = (theme: HeaderTheme) => {
  switch (theme) {
    case "modern": return "shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.3)] border-l-0";
    case "clean": return "border-l border-border/10 shadow-none";
    case "futuristic": return "border-l-2 ring-1 ring-primary/20 shadow-[-15px_0_30px_rgba(var(--primary),0.15)]";
    case "brutal": return "border-l-4 border-black dark:border-white shadow-[-4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[-4px_4px_0px_0px_rgba(255,255,255,1)] rounded-none";
    case "halftone": return "bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8Y2lyY2xlIGN4PSIyIiBjeT0iMiIgcj0iMSIgZmlsbD0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIwLjE1Ij48L2NpcmNsZT4KPC9zdmc+')]";
    case "default":
    default: return "";
  }
};

const getShapeClass = (shape: HeaderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-lg";
    case "default": return "rounded-full"; // Icons/buttons default
  }
};

const getMobileNavShapeClass = (shape: HeaderShape, theme: HeaderTheme) => {
  if (theme === "brutal") return "rounded-none";
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-l-md";
    case "rounded": return "rounded-l-2xl";
    case "default": return "rounded-none";
  }
};

const getSpacingClass = (spacing: HeaderSpacing) => {
  switch (spacing) {
    case "2x": return "h-12 px-2 @md:px-4";
    case "4x": return "h-14 px-4 @md:px-6";
    case "6x": return "h-16 px-6 @md:px-8";
    case "8x": return "h-20 px-8 @md:px-10";
    default: return "h-14 px-4 @md:px-6";
  }
};

const getHeightClass = (spacing: HeaderSpacing) => {
  switch (spacing) {
    case "2x": return "h-12";
    case "4x": return "h-14";
    case "6x": return "h-16";
    case "8x": return "h-20";
    default: return "h-14";
  }
};

const getLayoutClasses = (layout: HeaderLayout) => {
  switch (layout) {
    case "centered":
      return {
        left: "flex-1 flex justify-start items-center gap-2",
        center: "flex items-center justify-center shrink-0",
        right: "flex-1 flex justify-end items-center gap-3"
      };
    case "left":
      return {
        left: "flex items-center gap-6 shrink-0", // Logo and nav next to each other
        center: "hidden", // Nav is in left
        right: "flex-1 flex justify-end items-center gap-3"
      };
    case "default":
    default:
      return {
        left: "flex-1 flex justify-start items-center gap-2",
        center: "flex items-center justify-center shrink-0",
        right: "flex-1 flex justify-end items-center gap-3"
      };
  }
};

export const Header = React.memo(React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, color = "default", variant = "glass", theme: propTheme = "default", shape = "default", spacing = "default", layout = "default", ...props }, ref) => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme() as {
    theme: string;
    toggleTheme: () => void;
  };
  const pathname = usePathname();

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  const activeTheme = colorThemeMap[color];
  const shapeClass = getShapeClass(shape);
  const headerShapeClass = getHeaderShapeClass(shape);
  const mobileNavShapeClass = getMobileNavShapeClass(shape, propTheme);
  const spacingClass = getSpacingClass(spacing);
  const heightClass = getHeightClass(spacing);
  
  const variantClass = getHeaderVariantClass(variant, color, propTheme);
  const themeClass = getThemeClass(propTheme);
  const mobileNavThemeClass = getMobileNavThemeClass(propTheme);
  const layoutClasses = getLayoutClasses(layout);

  const Logo = () => (
    <Link href="/" className="flex items-center shrink-0 group gap-2">
      <div className={cn("w-8 h-8 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110", shapeClass)}>
        <Image
          src="/Logo.webp"
          alt="Future UI Logo"
          width={32}
          height={32}
          priority
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-display text-xl font-bold tracking-tighter text-foreground hidden @sm:block">FUTURE_UI</span>
    </Link>
  );

  const DesktopNav = () => (
    <nav className="hidden @lg:flex justify-center items-center gap-8">
      {navItems.map((item) => {
        const isActive = mounted && pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "font-display text-base transition-all duration-300",
              isActive
                ? cn(activeTheme.text, "border-b py-1", activeTheme.border)
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <header
        ref={ref}
        {...props}
        className={cn(
          "sticky z-50 transition-all duration-300 flex justify-center",
          headerShapeClass,
          variantClass,
          themeClass,
          heightClass,
          className
        )}
      >
        <div className={cn("w-full max-w-7xl mx-auto flex justify-between items-center h-full", spacingClass)}>
          {/* Left Section */}
          <div className={layoutClasses.left}>
            {layout === "centered" ? (
              <DesktopNav /> // Nav on left in centered layout
            ) : (
              <Logo />
            )}
            {layout === "left" && <DesktopNav />}
          </div>

          {/* Center Section */}
          <div className={layoutClasses.center}>
            {layout === "centered" ? (
              <Logo /> // Logo in center
            ) : layout === "default" ? (
              <DesktopNav />
            ) : null}
          </div>

          {/* Right Section: Actions & Mobile Toggle */}
          <div className={layoutClasses.right}>
            <div className="hidden @sm:block">
              <SearchInput
                data={componentsList}
                variant="default"
                shape={shape}
                className="w-full max-w-30 @sm:max-w-40 @lg:max-w-50"
              />
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={cn(
                "w-9 h-9 shrink-0 flex items-center justify-center",
                "bg-background",
                "ring-1 ring-border",
                "hover:bg-muted",
                "text-muted-foreground",
                "hover:text-foreground",
                "transition-all duration-200",
                shapeClass
              )}
            >
              {!mounted ? (
                <div className="w-4 h-4" />
              ) : theme === "dark" ? (
                <SunIcon animate className="w-4 h-4" />
              ) : (
                <MoonIcon animate className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              className={cn(
                "@lg:hidden w-9 h-9 shrink-0 flex items-center justify-center",
                "bg-background",
                "ring-1 ring-border",
                "hover:bg-muted",
                "text-muted-foreground",
                "hover:text-foreground",
                "transition-all duration-200",
                shapeClass
              )}
            >
              {isOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] @lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed inset-y-0 left-0 w-72 bg-background/95 backdrop-blur-[60px] border-r border-border/10 z-[60] @lg:hidden flex flex-col p-6", 
                mobileNavShapeClass,
                mobileNavThemeClass
              )}
            >
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center shrink-0 group gap-2" onClick={() => setIsOpen(false)}>
                  <div className={cn("w-8 h-8 flex items-center justify-center overflow-hidden", shapeClass)}>
                    <Image src="/Logo.webp" alt="Future UI Logo" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <span className="font-display text-xl font-bold tracking-tighter text-foreground">FUTURE_UI</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className={cn(
                    "w-9 h-9 flex items-center justify-center",
                    "bg-background",
                    "ring-1 ring-border",
                    "hover:bg-muted",
                    "text-muted-foreground",
                    "hover:text-foreground",
                    "transition-all duration-200",
                    shapeClass
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-4 text-lg font-black italic uppercase transition-all",
                      shapeClass,
                      pathname === item.href
                        ? cn(activeTheme.bgSoft, activeTheme.text)
                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <ChevronRightIcon className="w-5 h-5" />
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-4 border-t border-border/50">
                <span className="text-sm font-bold text-muted-foreground uppercase italic tracking-widest text-center">
                  Socials
                </span>
                <div className="flex items-center justify-center gap-4">
                  <Link href="https://github.com/Aryan3522/future-ui" target="_blank">
                    <Button variant="outline" className={shapeClass}>
                      <GithubIcon animate className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="https://www.linkedin.com/in/aryan-hooda-code/" target="_blank">
                    <Button variant="outline" className={shapeClass}>
                      <LinkedinIcon animate className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}));
Header.displayName = "Header";
