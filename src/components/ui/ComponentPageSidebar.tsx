/**
 * @registry-slug component-page-sidebar
 * @registry-name Component Page Sidebar
 * @registry-description A collapsible navigation sidebar with theme switching, active route highlighting, and responsive layout support.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 * @registry-dependency next/navigation
 * @registry-dependency next/link
 * @registry-dependency next/image
 * @registry-dependency @radix-ui/react-slot
 */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
    MousePointerClick,
    Square,
    Type,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Home,
    GalleryHorizontal,
    Navigation,
    MessageSquare,
    Compass,
    Newspaper,
    Layout,
    type LucideIcon,
} from "lucide-react";
import { SunIcon, MoonIcon } from "@/icons";

export type ComponentPageSidebarColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type ComponentPageSidebarVariant = "solid" | "outline" | "ghost" | "link";
export type ComponentPageSidebarSize = "sm" | "md" | "lg";
export type ComponentPageSidebarSpacing = "default" | "2x" | "4x" | "6x" | "8x";

interface SidebarItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

const sidebarItems: SidebarItem[] = [
    { label: "Home", to: "/", icon: Home },
    { label: "Insights", to: "/blogs", icon: Newspaper },
    { label: "Discover UI", to: "/components", icon: Compass },
    { label: "Buttons", to: "/components/buttons", icon: MousePointerClick },
    { label: "Cards", to: "/components/cards", icon: Square },
    { label: "Typography", to: "/components/typography", icon: Type },
    { label: "Loaders", to: "/components/loaders", icon: Loader2 },
    { label: "Carousels", to: "/components/carousels", icon: GalleryHorizontal },
    { label: "Navigation", to: "/components/menu", icon: Navigation },
    { label: "Feedback", to: "/components/feedback", icon: MessageSquare },
    { label: "UI Components", to: "/components/ui", icon: Layout },
];

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

export interface ComponentPageSidebarProps extends React.HTMLAttributes<HTMLElement> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color?: ComponentPageSidebarColor;
  variant?: ComponentPageSidebarVariant;
  size?: ComponentPageSidebarSize;
  spacing?: ComponentPageSidebarSpacing;
}

const colorMap = {
  default: {
    solid: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-transparent hover:bg-muted text-primary",
    ghost: "bg-primary/10 text-primary hover:bg-primary/20",
    link: "text-primary underline underline-offset-4 hover:text-primary/80"
  },
  blue: {
    solid: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600/50 bg-transparent hover:bg-blue-600/10 text-blue-600 dark:text-blue-400",
    ghost: "bg-blue-600/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600/20",
    link: "text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-700 dark:hover:text-blue-300"
  },
  emerald: {
    solid: "bg-emerald-500 text-white hover:bg-emerald-600",
    outline: "border border-emerald-500/50 bg-transparent hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    ghost: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20",
    link: "text-emerald-600 dark:text-emerald-400 underline underline-offset-4 hover:text-emerald-700 dark:hover:text-emerald-300"
  },
  rose: {
    solid: "bg-rose-500 text-white hover:bg-rose-600",
    outline: "border border-rose-500/50 bg-transparent hover:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    ghost: "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20",
    link: "text-rose-600 dark:text-rose-400 underline underline-offset-4 hover:text-rose-700 dark:hover:text-rose-300"
  },
  amber: {
    solid: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-amber-500/50 bg-transparent hover:bg-amber-500/10 text-amber-600 dark:text-amber-400",
    ghost: "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20",
    link: "text-amber-600 dark:text-amber-400 underline underline-offset-4 hover:text-amber-700 dark:hover:text-amber-300"
  },
  violet: {
    solid: "bg-violet-600 text-white hover:bg-violet-700",
    outline: "border border-violet-600/50 bg-transparent hover:bg-violet-600/10 text-violet-600 dark:text-violet-400",
    ghost: "bg-violet-600/10 text-violet-600 dark:text-violet-400 hover:bg-violet-600/20",
    link: "text-violet-600 dark:text-violet-400 underline underline-offset-4 hover:text-violet-700 dark:hover:text-violet-300"
  },
  indigo: {
    solid: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-indigo-600/50 bg-transparent hover:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400",
    ghost: "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/20",
    link: "text-indigo-600 dark:text-indigo-400 underline underline-offset-4 hover:text-indigo-700 dark:hover:text-indigo-300"
  },
  sky: {
    solid: "bg-sky-500 text-white hover:bg-sky-600",
    outline: "border border-sky-500/50 bg-transparent hover:bg-sky-500/10 text-sky-600 dark:text-sky-400",
    ghost: "bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20",
    link: "text-sky-600 dark:text-sky-400 underline underline-offset-4 hover:text-sky-700 dark:hover:text-sky-300"
  },
  slate: {
    solid: "bg-slate-600 text-white hover:bg-slate-700",
    outline: "border border-slate-600/50 bg-transparent hover:bg-slate-600/10 text-slate-600 dark:text-slate-400",
    ghost: "bg-slate-600/10 text-slate-600 dark:text-slate-400 hover:bg-slate-600/20",
    link: "text-slate-600 dark:text-slate-400 underline underline-offset-4 hover:text-slate-700 dark:hover:text-slate-300"
  },
  orange: {
    solid: "bg-orange-500 text-white hover:bg-orange-600",
    outline: "border border-orange-500/50 bg-transparent hover:bg-orange-500/10 text-orange-600 dark:text-orange-400",
    ghost: "bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20",
    link: "text-orange-600 dark:text-orange-400 underline underline-offset-4 hover:text-orange-700 dark:hover:text-orange-300"
  }
};

const hoverColorMap = {
  default: "hover:bg-muted hover:text-primary text-muted-foreground",
  blue: "hover:bg-blue-600/5 hover:text-blue-600 dark:hover:text-blue-400 text-muted-foreground",
  emerald: "hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 text-muted-foreground",
  rose: "hover:bg-rose-500/5 hover:text-rose-600 dark:hover:text-rose-400 text-muted-foreground",
  amber: "hover:bg-amber-500/5 hover:text-amber-600 dark:hover:text-amber-400 text-muted-foreground",
  violet: "hover:bg-violet-600/5 hover:text-violet-600 dark:hover:text-violet-400 text-muted-foreground",
  indigo: "hover:bg-indigo-600/5 hover:text-indigo-600 dark:hover:text-indigo-400 text-muted-foreground",
  sky: "hover:bg-sky-500/5 hover:text-sky-600 dark:hover:text-sky-400 text-muted-foreground",
  slate: "hover:bg-slate-600/5 hover:text-slate-600 dark:hover:text-slate-400 text-muted-foreground",
  orange: "hover:bg-orange-500/5 hover:text-orange-600 dark:hover:text-orange-400 text-muted-foreground",
};

const sizeMap = {
  sm: "text-xs px-2 py-1.5",
  md: "text-sm px-3 py-2",
  lg: "text-base px-4 py-2.5",
};

const iconSizeMap = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

const spacingMap = {
  "default": "gap-1",
  "2x": "gap-2",
  "4x": "gap-4",
  "6x": "gap-6",
  "8x": "gap-8",
};

const ComponentPageSidebar: React.FC<ComponentPageSidebarProps> = ({ 
  open, 
  setOpen, 
  color = "default", 
  variant = "solid", 
  size = "md",
  spacing = "default",
  className,
  ...props 
}) => {
    const { theme, toggleTheme } = useTheme() as { theme: string; toggleTheme: () => void };
    const pathname = usePathname();
    
    const containerClasses = cn(
      "fixed left-0 top-0 z-[9999] h-screen bg-white/60 dark:bg-black/10 backdrop-blur-xl border-r shadow-lg transition-all duration-300",
      open ? "w-64" : "w-16",
      variant === "outline" ? "border-r-2" : "border-border",
      variant === "ghost" ? "border-r-0 shadow-none bg-transparent" : "",
      className
    );

    return (
        <aside className={containerClasses} {...props}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4">
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="overflow-hidden flex items-center justify-start gap-4 cursor-pointer"
                    >
                        <motion.div
                            className={cn("w-8 h-8 rounded-md overflow-hidden flex items-center justify-center cursor-pointer transition-colors", color === "default" ? "bg-primary" : `bg-${color}-500`)}
                        >
                            <button onClick={scrollToTop} aria-label="Logo">
                                <Image
                                    src="/FUI.webp"
                                    alt="Logo"
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        </motion.div>
                        <Button
                            variant="ghost"
                            onClick={toggleTheme}
                            className="w-9 h-9 p-0 hover:bg-transparent md:hover:bg-subtle"
                        >
                            {theme === "dark" ? (
                                <SunIcon animate className="h-4 w-4" />
                            ) : (
                                <MoonIcon animate className="h-4 w-4" />
                            )}
                        </Button>
                    </motion.div>
                )}

                <button
                    onClick={() => setOpen((v) => !v)}
                    className={cn("ml-auto rounded-md p-1 transition-colors", hoverColorMap[color])}
                    aria-label="Toggle Sidebar"
                >
                    {open ? (
                        <ChevronLeft className="h-5 w-5" />
                    ) : (
                        <ChevronRight className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Nav */}
            <nav className={cn("flex flex-col px-2", spacingMap[spacing])}>
                {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.to ||
                        (item.to !== "/" && pathname.startsWith(item.to));
                        
                    const itemStyle = isActive 
                      ? colorMap[color][variant] 
                      : hoverColorMap[color];
                      
                    return (
                        <Link
                            key={item.label}
                            href={item.to}
                            title={!open ? item.label : undefined}
                            className={cn(
                                "flex items-center gap-3 rounded-md font-medium transition-all duration-200",
                                sizeMap[size],
                                open ? "justify-start" : "justify-center",
                                itemStyle
                            )}
                        >
                            <Icon className={cn("flex-shrink-0", iconSizeMap[size])} />
                            {open && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default ComponentPageSidebar;
