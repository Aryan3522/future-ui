/**
 * @registry-slug calculator
 * @registry-name Calculator
 * @registry-description A Future UI Calculator component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  Minus, 
  X, 
  Divide, 
  Delete, 
  RotateCcw, 
  Percent, 
  Equal 
} from "lucide-react";

export type CalculatorColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CalculatorShape = "default" | "square" | "rounded" | "sharp";
export type CalculatorSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type CalculatorVariant = "solid" | "outline" | "ghost" | "link";
export type CalculatorTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";

export interface CalculatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  variant?: CalculatorVariant;
  theme?: CalculatorTheme;
  color?: CalculatorColor;
  shape?: CalculatorShape;
  spacing?: CalculatorSpacing;
}

const colorThemeMap: Record<CalculatorColor, { text: string; bg: string; border: string; glow: string; bgSoft: string; shadow: string }> = {
  default: { text: "text-foreground", bg: "bg-foreground text-background", border: "border-border", glow: "shadow-foreground/20", bgSoft: "bg-foreground/5", shadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]" },
  blue: { text: "text-blue-600 dark:text-blue-500", bg: "bg-blue-600 text-white", border: "border-blue-600 dark:border-blue-500", glow: "shadow-blue-500/50", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]" },
  emerald: { text: "text-emerald-600 dark:text-emerald-500", bg: "bg-emerald-600 text-white", border: "border-emerald-600 dark:border-emerald-500", glow: "shadow-emerald-500/50", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]" },
  rose: { text: "text-rose-600 dark:text-rose-500", bg: "bg-rose-600 text-white", border: "border-rose-600 dark:border-rose-500", glow: "shadow-rose-500/50", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]" },
  amber: { text: "text-amber-600 dark:text-amber-500", bg: "bg-amber-600 text-white", border: "border-amber-600 dark:border-amber-500", glow: "shadow-amber-500/50", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]" },
  violet: { text: "text-violet-600 dark:text-violet-500", bg: "bg-violet-600 text-white", border: "border-violet-600 dark:border-violet-500", glow: "shadow-violet-500/50", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]" },
  indigo: { text: "text-indigo-600 dark:text-indigo-500", bg: "bg-indigo-600 text-white", border: "border-indigo-600 dark:border-indigo-500", glow: "shadow-indigo-500/50", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]" },
  sky: { text: "text-sky-600 dark:text-sky-500", bg: "bg-sky-600 text-white", border: "border-sky-600 dark:border-sky-500", glow: "shadow-sky-500/50", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(2,132,199,1)]" },
  slate: { text: "text-slate-600 dark:text-slate-400", bg: "bg-slate-600 text-white", border: "border-slate-600 dark:border-slate-500", glow: "shadow-slate-500/50", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(71,85,105,1)]" },
  orange: { text: "text-orange-600 dark:text-orange-500", bg: "bg-orange-600 text-white", border: "border-orange-600 dark:border-orange-500", glow: "shadow-orange-500/50", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", shadow: "shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]" },
};

const getShapeClass = (shape: CalculatorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-md";
    case "rounded": return "rounded-3xl";
    case "default": return "rounded-[2.5rem]";
  }
};

const getButtonShapeClass = (shape: CalculatorShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": return "rounded-xl";
    case "default": return "rounded-2xl";
  }
};

const getSpacingClass = (spacing: CalculatorSpacing) => {
  switch (spacing) {
    case "2x": return "p-4 gap-4";
    case "4x": return "p-5 sm:p-8 gap-6";
    case "6x": return "p-6 sm:p-10 gap-8";
    case "8x": return "p-8 sm:p-12 gap-10";
    default: return "p-5 sm:p-8 gap-6";
  }
};

export const Calculator: React.FC<CalculatorProps> = React.memo(({
          className,
          variant = "solid",
          theme = "default",
          color = "default",
          shape = "default",
          spacing = "default",
          ...props
        }) => {
          const [display, setDisplay] = useState("0");
          const [prevValue, setPrevValue] = useState<number | null>(null);
          const [operation, setOperation] = useState<string | null>(null);
          const [waitingForOperand, setWaitingForOperand] = useState(false);

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const btnShapeClass = getButtonShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);

          const isOutline = variant === "outline";
          const isLink = variant === "link";
          const isGhost = variant === "ghost";
          const isSolid = variant === "solid";

          const clearAll = () => {
            setDisplay("0");
            setPrevValue(null);
            setOperation(null);
            setWaitingForOperand(false);
          };

          const inputDigit = (digit: string) => {
            if (waitingForOperand) {
              setDisplay(digit);
              setWaitingForOperand(false);
            } else {
              setDisplay(display === "0" ? digit : display + digit);
            }
          };

          const inputDot = () => {
            if (waitingForOperand) {
              setDisplay("0.");
              setWaitingForOperand(false);
            } else if (!display.includes(".")) {
              setDisplay(display + ".");
            }
          };

          const performOperation = (nextOperation: string) => {
            const inputValue = parseFloat(display);

            if (prevValue === null) {
              setPrevValue(inputValue);
            } else if (operation) {
              const currentValue = prevValue || 0;
              const newValue = calculate(currentValue, inputValue, operation);
              setPrevValue(newValue);
              setDisplay(String(newValue));
            }

            setWaitingForOperand(true);
            setOperation(nextOperation);
          };

          const calculate = (prev: number, next: number, op: string) => {
            switch (op) {
              case "+": return prev + next;
              case "-": return prev - next;
              case "*": return prev * next;
              case "/": return prev / next;
              default: return next;
            }
          };

          const handleEquals = () => {
            const inputValue = parseFloat(display);
            if (prevValue !== null && operation) {
              const newValue = calculate(prevValue, inputValue, operation);
              setDisplay(String(newValue));
              setPrevValue(null);
              setOperation(null);
              setWaitingForOperand(true);
            }
          };

          const toggleSign = () => {
            setDisplay(String(parseFloat(display) * -1));
          };

          const inputPercent = () => {
            setDisplay(String(parseFloat(display) / 100));
          };

          const deleteLast = () => {
            if (display.length > 1) {
              setDisplay(display.slice(0, -1));
            } else {
              setDisplay("0");
            }
          };

          const getContainerStyles = () => {
            const baseBg = isOutline || isGhost ? "bg-transparent" : "bg-background";
            const baseBorder = isGhost ? "border-transparent" : "border-border";

            switch (theme) {
              case "modern":
                return cn(isOutline || isGhost ? "bg-transparent" : "bg-background/40", "backdrop-blur-3xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative overflow-hidden transition-all duration-500", color !== "default" ? activeTheme.border : "border-border/50", color !== "default" ? activeTheme.glow : "");
              case "brutal":
                return cn(baseBg, "border-4 relative", isGhost ? "border-transparent" : activeTheme.border, color !== "default" ? activeTheme.shadow : "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]");
              case "futuristic":
                return cn(baseBg, "border relative overflow-hidden transition-all duration-500", isOutline || isGhost ? activeTheme.border : cn(activeTheme.border, activeTheme.glow));
              case "halftone":
                return cn(baseBg, "border-2 border-dashed relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]", isGhost ? "border-transparent" : activeTheme.border, color !== "default" ? activeTheme.shadow : "");
              case "clean":
                return cn(baseBg, isGhost ? "border-transparent" : "border-border/40 border-[0.5px]", "relative overflow-hidden transition-all duration-500", color !== "default" ? activeTheme.glow : "shadow-sm");
              case "default":
              default:
                return cn(baseBg, isGhost ? "border-transparent shadow-none" : "border-border border", "relative overflow-hidden transition-all duration-500", color !== "default" ? activeTheme.glow : "shadow-xl shadow-black/5 dark:shadow-black/20");
            }
          };

          const getDisplayStyles = () => {
            switch (theme) {
              case "modern":
                return cn("text-5xl font-light tracking-tighter", color !== "default" ? activeTheme.text : "text-foreground");
              case "brutal":
                return cn("text-5xl font-mono font-black uppercase tracking-tighter border-b-4 mb-2 pb-4", isGhost ? "border-transparent" : activeTheme.border, color !== "default" ? activeTheme.text : "text-foreground");
              case "futuristic":
                return cn("text-5xl font-mono font-bold tracking-widest", color !== "default" ? activeTheme.text : "text-foreground");
              case "halftone":
                return cn("text-5xl font-serif font-black italic tracking-tighter border-b-2 border-dashed mb-2 pb-4", isGhost ? "border-transparent" : activeTheme.border, color !== "default" ? activeTheme.text : "text-foreground");
              case "clean":
                return cn("text-6xl font-extralight tracking-tight", color !== "default" ? activeTheme.text : "text-foreground");
              case "default":
              default:
                return cn("text-5xl font-medium tracking-tight", color !== "default" ? activeTheme.text : "text-foreground");
            }
          };

          const Button = ({ 
            children, 
            onClick, 
            className, 
            type = "digit" 
          }: { 
            children: React.ReactNode; 
            onClick: () => void; 
            className?: string;
            type?: "digit" | "op" | "func" | "equal";
          }) => {
            const getVariantButtonStyles = () => {
              let btnBase = cn("h-14 sm:h-16 flex items-center justify-center text-xl transition-all", btnShapeClass);

              switch (theme) {
                case "modern": {
                  btnBase = cn(btnBase, "font-medium duration-300");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:underline underline-offset-4 shadow-none border-transparent");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4 shadow-none border-transparent");
                  }

                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.bgSoft, "hover:brightness-110");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-white/10 dark:hover:bg-black/10");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-white/5 dark:hover:bg-black/5");
                    return cn(btnBase, "text-foreground hover:bg-white/5 dark:hover:bg-black/5");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "border border-white/20 dark:border-black/20");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, "hover:bg-white/10 dark:hover:bg-black/10");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-white/10 dark:hover:bg-black/10");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-white/5 dark:hover:bg-black/5");
                    return cn(btnBase, "text-foreground hover:bg-white/5 dark:hover:bg-black/5");
                  }

                  // solid
                  btnBase = cn(btnBase, "border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]");
                  if (type === "equal") return cn(btnBase, activeTheme.bg, "hover:brightness-90 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] text-white");
                  if (type === "op") return cn(btnBase, activeTheme.bgSoft, activeTheme.text, "hover:brightness-90");
                  if (type === "func") return cn(btnBase, "bg-muted/50 text-muted-foreground hover:bg-muted/80");
                  return cn(btnBase, "bg-foreground/5 text-foreground hover:bg-foreground/10");
                }
                case "brutal": {
                  btnBase = cn(btnBase, "font-mono font-bold");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:underline underline-offset-4");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4");
                  }

                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:bg-muted");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-muted/80");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-muted/50");
                    return cn(btnBase, "text-foreground hover:bg-muted/30");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "border-2 shadow-[3px_3px_0px_0px] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none bg-transparent");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, activeTheme.shadow);
                    if (type === "op") return cn(btnBase, "text-foreground border-foreground shadow-foreground/40");
                    if (type === "func") return cn(btnBase, "text-muted-foreground border-muted-foreground shadow-muted-foreground/40");
                    return cn(btnBase, "text-foreground border-border shadow-border");
                  }

                  // solid
                  btnBase = cn(btnBase, "border-2 shadow-[3px_3px_0px_0px] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none");
                  if (type === "equal") return cn(btnBase, activeTheme.bg, activeTheme.border, activeTheme.text, activeTheme.shadow, "text-white");
                  if (type === "op") return cn(btnBase, activeTheme.bgSoft, "border-foreground shadow-foreground/20 text-foreground");
                  if (type === "func") return cn(btnBase, "bg-muted border-foreground shadow-foreground/20 text-muted-foreground");
                  return cn(btnBase, "bg-card border-foreground shadow-foreground/20 text-foreground");
                }
                case "futuristic": {
                  btnBase = cn(btnBase, "font-mono font-medium duration-300");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.glow, "hover:underline underline-offset-4");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4");
                  }

                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.bgSoft, activeTheme.glow, "hover:brightness-125");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-foreground/10");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-foreground/5");
                    return cn(btnBase, "text-foreground hover:bg-foreground/5");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "border bg-transparent hover:brightness-110");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, activeTheme.glow);
                    if (type === "op") return cn(btnBase, "text-foreground border-foreground/50 hover:border-foreground");
                    if (type === "func") return cn(btnBase, "text-muted-foreground border-muted-foreground/30 hover:border-muted-foreground");
                    return cn(btnBase, "text-foreground border-border hover:border-foreground/30");
                  }

                  // solid
                  btnBase = cn(btnBase, "border hover:brightness-110");
                  if (type === "equal") return cn(btnBase, activeTheme.bg, activeTheme.border, activeTheme.shadow, activeTheme.glow, "text-white");
                  if (type === "op") return cn(btnBase, activeTheme.border, activeTheme.text, activeTheme.bgSoft);
                  if (type === "func") return cn(btnBase, "border-muted-foreground/30 text-muted-foreground hover:bg-muted-foreground/10");
                  return cn(btnBase, "border-transparent text-foreground hover:bg-muted");
                }
                case "halftone": {
                  btnBase = cn(btnBase, "font-serif font-bold italic");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:underline underline-offset-4");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4");
                  }

                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:bg-muted");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-muted/80");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-muted/50");
                    return cn(btnBase, "text-foreground hover:bg-muted/30");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "border-2 border-dashed shadow-[2px_2px_0px_0px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none bg-transparent");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, activeTheme.shadow);
                    if (type === "op") return cn(btnBase, "text-foreground border-foreground shadow-foreground/40");
                    if (type === "func") return cn(btnBase, "text-muted-foreground border-muted-foreground shadow-muted-foreground/40");
                    return cn(btnBase, "text-foreground border-border shadow-border");
                  }

                  // solid
                  btnBase = cn(btnBase, "border-2 border-dashed shadow-[2px_2px_0px_0px] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none");
                  if (type === "equal") return cn(btnBase, activeTheme.bg, activeTheme.border, activeTheme.shadow, "text-white");
                  if (type === "op") return cn(btnBase, activeTheme.bgSoft, "border-foreground shadow-foreground/20 text-foreground");
                  if (type === "func") return cn(btnBase, "bg-background border-foreground shadow-foreground/20 text-muted-foreground");
                  return cn(btnBase, "bg-background border-foreground shadow-foreground/20 text-foreground");
                }
                case "clean": {
                  btnBase = cn(btnBase, "font-light text-2xl duration-300 hover:scale-105");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:underline underline-offset-4");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4");
                  }

                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:bg-muted/50");
                    if (type === "op") return cn(btnBase, "text-foreground hover:bg-muted/30");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-muted/20");
                    return cn(btnBase, "text-foreground hover:bg-muted/10");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "border bg-transparent");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, "hover:bg-muted/50");
                    if (type === "op") return cn(btnBase, "text-foreground border-border/80 hover:bg-muted/30");
                    if (type === "func") return cn(btnBase, "text-muted-foreground border-border/40 hover:bg-muted/20");
                    return cn(btnBase, "text-foreground border-border/20 hover:bg-muted/10");
                  }

                  // solid
                  if (type === "equal") return cn(btnBase, activeTheme.text, "bg-transparent border border-border/40 hover:bg-muted/50");
                  if (type === "op") return cn(btnBase, activeTheme.text, "bg-transparent hover:bg-muted/30");
                  if (type === "func") return cn(btnBase, "text-muted-foreground bg-transparent hover:bg-muted/20");
                  return cn(btnBase, "bg-transparent text-foreground hover:bg-muted/10");
                }
                case "default":
                default: {
                  btnBase = cn(btnBase, "font-medium duration-200");
                  
                  if (isLink) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, "hover:underline underline-offset-4");
                    return cn(btnBase, type === "func" ? "text-muted-foreground" : "text-foreground", "hover:underline underline-offset-4");
                  }
                  
                  if (isGhost) {
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.bgSoft, "hover:opacity-80");
                    if (type === "op") return cn(btnBase, color !== "default" ? activeTheme.text : "text-foreground", "hover:bg-muted");
                    if (type === "func") return cn(btnBase, "text-muted-foreground hover:bg-muted/50");
                    return cn(btnBase, "text-foreground hover:bg-muted/30");
                  }

                  if (isOutline) {
                    btnBase = cn(btnBase, "bg-transparent border");
                    if (type === "equal") return cn(btnBase, activeTheme.text, activeTheme.border, "hover:opacity-80");
                    if (type === "op") return cn(btnBase, "border-border", color !== "default" ? activeTheme.text : "text-foreground", "hover:bg-muted");
                    if (type === "func") return cn(btnBase, "border-border/50 text-muted-foreground hover:bg-muted/50");
                    return cn(btnBase, "border-border/30 text-foreground hover:bg-muted/30");
                  }

                  // solid
                  if (type === "equal") return cn(btnBase, activeTheme.bg, "text-white hover:opacity-90 shadow-sm");
                  if (type === "op") return cn(btnBase, color !== "default" ? cn(activeTheme.bgSoft, activeTheme.text) : "bg-muted text-foreground", "hover:brightness-95 shadow-sm");
                  if (type === "func") return cn(btnBase, "bg-muted/50 text-muted-foreground hover:bg-muted/80 shadow-sm");
                  return cn(btnBase, "bg-background border border-border/50 text-foreground hover:bg-muted/30 shadow-sm");
                }
              }
            };

            return (
              <motion.button
                whileTap={{ scale: theme === "brutal" || theme === "halftone" ? 1 : 0.95 }}
                onClick={onClick}
                className={cn(getVariantButtonStyles(), className)}
              >
                {children}
              </motion.button>
            );
          };

          return (
            <div 
              className={cn(
                "max-w-[360px] sm:max-w-[400px] w-full flex flex-col mx-auto",
                getContainerStyles(),
                shapeClass,
                spacingClass,
                className
              )}
              {...props}
            >
              {/* Decorative Neon Orbs */}
              {theme === "futuristic" && (
                <>
                  <div className={cn("absolute -top-20 -left-20 w-40 h-40 blur-[50px] rounded-full pointer-events-none", activeTheme.bgSoft)} />
                  <div className={cn("absolute -bottom-20 -right-20 w-40 h-40 blur-[50px] rounded-full pointer-events-none", activeTheme.bgSoft)} />
                </>
              )}

              {/* Decorative Glass Highlights */}
              {theme === "modern" && (
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              )}

              <div className="flex flex-col items-end justify-end h-28 px-1 sm:px-2 overflow-hidden relative z-10 w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={display}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className={cn("w-full text-right overflow-hidden break-all leading-tight", getDisplayStyles())}
                    style={theme === "futuristic" ? { textShadow: "0 0 10px currentColor" } : {}}
                  >
                    {display}
                  </motion.div>
                </AnimatePresence>
                {operation && (
                  <div className={cn(
                    "text-sm font-medium uppercase tracking-widest mt-2 transition-colors duration-300",
                    theme === "brutal" ? "font-mono font-bold" : "",
                    color !== "default" ? activeTheme.text : "text-muted-foreground",
                    "opacity-80"
                  )}>
                    {prevValue} {operation}
                  </div>
                )}
              </div>

              <div className={cn("grid grid-cols-4 relative z-10", spacing === "8x" ? "gap-4 sm:gap-5" : spacing === "6x" ? "gap-3 sm:gap-4" : spacing === "4x" ? "gap-2 sm:gap-3" : "gap-2")}>
                <Button type="func" onClick={clearAll}><RotateCcw className="w-5 h-5" /></Button>
                <Button type="func" onClick={toggleSign}>+/-</Button>
                <Button type="func" onClick={inputPercent}><Percent className="w-5 h-5" /></Button>
                <Button type="op" onClick={() => performOperation("/")}><Divide className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("7")}>7</Button>
                <Button onClick={() => inputDigit("8")}>8</Button>
                <Button onClick={() => inputDigit("9")}>9</Button>
                <Button type="op" onClick={() => performOperation("*")}><X className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("4")}>4</Button>
                <Button onClick={() => inputDigit("5")}>5</Button>
                <Button onClick={() => inputDigit("6")}>6</Button>
                <Button type="op" onClick={() => performOperation("-")}><Minus className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("1")}>1</Button>
                <Button onClick={() => inputDigit("2")}>2</Button>
                <Button onClick={() => inputDigit("3")}>3</Button>
                <Button type="op" onClick={() => performOperation("+")}><Plus className="w-5 h-5" /></Button>

                <Button onClick={() => inputDigit("0")}>0</Button>
                <Button onClick={inputDot}>.</Button>
                <Button type="func" onClick={deleteLast}><Delete className="w-5 h-5" /></Button>
                <Button type="equal" onClick={handleEquals}>
                  <Equal className="w-5 h-5" />
                </Button>
              </div>
            </div>
          );
        });
Calculator.displayName = "Calculator";
