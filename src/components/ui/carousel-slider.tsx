/**
 * @registry-slug infinite-slider
 * @registry-name Infinite Carousel Slider
 * @registry-description A Future UI Infinite Carousel Slider component.
 * @registry-category ui
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */
"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";

export type CarouselSliderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type CarouselSliderShape = "default" | "square" | "rounded" | "sharp";
export type CarouselSliderSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type CarouselSliderVariant = "solid" | "outline" | "ghost" | "link";
export type CarouselSliderTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type CarouselSliderAnimation = "translation" | "jumping" | "superposition" | "fading" | "carousel" | "flip" | "vertical" | "slide" | "scale";

export interface CarouselSlide {
  id: string | number;
  image: string;
  title: string;
  tag: string;
  location: string;
  tagBg?: string;
}

export interface CarouselSliderProps {
  slides?: CarouselSlide[];
  className?: string;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  pauseOnHover?: boolean;
  variant?: CarouselSliderVariant;
  theme?: CarouselSliderTheme;
  color?: CarouselSliderColor;
  shape?: CarouselSliderShape;
  spacing?: CarouselSliderSpacing;
  animation?: CarouselSliderAnimation;
}

const colorThemeMap: Record<CarouselSliderColor, { bg: string; text: string; bgSoft: string; border: string; shadow: string; bgSoftest: string; textOnBg: string; bgDot: string; glow: string; brutalShadow: string; hoverBg: string; hoverText: string; groupHoverBg: string; tagBg: string; }> = {
  default: { bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10", border: "border-primary/20", shadow: "shadow-primary/30", bgSoftest: "bg-primary/5", textOnBg: "text-primary-foreground", bgDot: "bg-primary/60", glow: "shadow-foreground/10 dark:shadow-foreground/5", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]", hoverBg: "hover:bg-primary/10", hoverText: "hover:text-primary", groupHoverBg: "group-hover:bg-primary", tagBg: "bg-primary text-primary-foreground" },
  blue: { bg: "bg-blue-600 dark:bg-blue-500", text: "text-blue-600 dark:text-blue-500", bgSoft: "bg-blue-600/10 dark:bg-blue-500/10", border: "border-blue-600/20 dark:border-blue-500/20", shadow: "shadow-blue-600/30 dark:shadow-blue-500/30", bgSoftest: "bg-blue-600/5 dark:bg-blue-500/5", textOnBg: "text-white", bgDot: "bg-blue-600/60 dark:bg-blue-500/60", glow: "shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]", hoverBg: "hover:bg-blue-600/10 dark:hover:bg-blue-500/10", hoverText: "hover:text-blue-600 dark:hover:text-blue-500", groupHoverBg: "group-hover:bg-blue-600 dark:group-hover:bg-blue-500", tagBg: "bg-blue-600 text-white" },
  emerald: { bg: "bg-emerald-600 dark:bg-emerald-500", text: "text-emerald-600 dark:text-emerald-500", bgSoft: "bg-emerald-600/10 dark:bg-emerald-500/10", border: "border-emerald-600/20 dark:border-emerald-500/20", shadow: "shadow-emerald-600/30 dark:shadow-emerald-500/30", bgSoftest: "bg-emerald-600/5 dark:bg-emerald-500/5", textOnBg: "text-white", bgDot: "bg-emerald-600/60 dark:bg-emerald-500/60", glow: "shadow-[0_0_20px_-5px_rgba(5,150,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]", hoverBg: "hover:bg-emerald-600/10 dark:hover:bg-emerald-500/10", hoverText: "hover:text-emerald-600 dark:hover:text-emerald-500", groupHoverBg: "group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500", tagBg: "bg-emerald-600 text-white" },
  rose: { bg: "bg-rose-600 dark:bg-rose-500", text: "text-rose-600 dark:text-rose-500", bgSoft: "bg-rose-600/10 dark:bg-rose-500/10", border: "border-rose-600/20 dark:border-rose-500/20", shadow: "shadow-rose-600/30 dark:shadow-rose-500/30", bgSoftest: "bg-rose-600/5 dark:bg-rose-500/5", textOnBg: "text-white", bgDot: "bg-rose-600/60 dark:bg-rose-500/60", glow: "shadow-[0_0_20px_-5px_rgba(225,29,72,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(225,29,72,1)]", hoverBg: "hover:bg-rose-600/10 dark:hover:bg-rose-500/10", hoverText: "hover:text-rose-600 dark:hover:text-rose-500", groupHoverBg: "group-hover:bg-rose-600 dark:group-hover:bg-rose-500", tagBg: "bg-rose-600 text-white" },
  amber: { bg: "bg-amber-600 dark:bg-amber-500", text: "text-amber-600 dark:text-amber-500", bgSoft: "bg-amber-600/10 dark:bg-amber-500/10", border: "border-amber-600/20 dark:border-amber-500/20", shadow: "shadow-amber-600/30 dark:shadow-amber-500/30", bgSoftest: "bg-amber-600/5 dark:bg-amber-500/5", textOnBg: "text-white", bgDot: "bg-amber-600/60 dark:bg-amber-500/60", glow: "shadow-[0_0_20px_-5px_rgba(217,119,6,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(217,119,6,1)]", hoverBg: "hover:bg-amber-600/10 dark:hover:bg-amber-500/10", hoverText: "hover:text-amber-600 dark:hover:text-amber-500", groupHoverBg: "group-hover:bg-amber-600 dark:group-hover:bg-amber-500", tagBg: "bg-amber-600 text-white" },
  violet: { bg: "bg-violet-600 dark:bg-violet-500", text: "text-violet-600 dark:text-violet-500", bgSoft: "bg-violet-600/10 dark:bg-violet-500/10", border: "border-violet-600/20 dark:border-violet-500/20", shadow: "shadow-violet-600/30 dark:shadow-violet-500/30", bgSoftest: "bg-violet-600/5 dark:bg-violet-500/5", textOnBg: "text-white", bgDot: "bg-violet-600/60 dark:bg-violet-500/60", glow: "shadow-[0_0_20px_-5px_rgba(124,58,237,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(124,58,237,1)]", hoverBg: "hover:bg-violet-600/10 dark:hover:bg-violet-500/10", hoverText: "hover:text-violet-600 dark:hover:text-violet-500", groupHoverBg: "group-hover:bg-violet-600 dark:group-hover:bg-violet-500", tagBg: "bg-violet-600 text-white" },
  indigo: { bg: "bg-indigo-600 dark:bg-indigo-500", text: "text-indigo-600 dark:text-indigo-500", bgSoft: "bg-indigo-600/10 dark:bg-indigo-500/10", border: "border-indigo-600/20 dark:border-indigo-500/20", shadow: "shadow-indigo-600/30 dark:shadow-indigo-500/30", bgSoftest: "bg-indigo-600/5 dark:bg-indigo-500/5", textOnBg: "text-white", bgDot: "bg-indigo-600/60 dark:bg-indigo-500/60", glow: "shadow-[0_0_20px_-5px_rgba(79,70,229,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(79,70,229,1)]", hoverBg: "hover:bg-indigo-600/10 dark:hover:bg-indigo-500/10", hoverText: "hover:text-indigo-600 dark:hover:text-indigo-500", groupHoverBg: "group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500", tagBg: "bg-indigo-600 text-white" },
  sky: { bg: "bg-sky-600 dark:bg-sky-500", text: "text-sky-600 dark:text-sky-500", bgSoft: "bg-sky-600/10 dark:bg-sky-500/10", border: "border-sky-600/20 dark:border-sky-500/20", shadow: "shadow-sky-600/30 dark:shadow-sky-500/30", bgSoftest: "bg-sky-600/5 dark:bg-sky-500/5", textOnBg: "text-white", bgDot: "bg-sky-600/60 dark:bg-sky-500/60", glow: "shadow-[0_0_20px_-5px_rgba(2,132,199,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(2,132,199,1)]", hoverBg: "hover:bg-sky-600/10 dark:hover:bg-sky-500/10", hoverText: "hover:text-sky-600 dark:hover:text-sky-500", groupHoverBg: "group-hover:bg-sky-600 dark:group-hover:bg-sky-500", tagBg: "bg-sky-600 text-white" },
  slate: { bg: "bg-slate-600 dark:bg-slate-500", text: "text-slate-600 dark:text-slate-400", bgSoft: "bg-slate-600/10 dark:bg-slate-500/10", border: "border-slate-600/20 dark:border-slate-500/20", shadow: "shadow-slate-600/30 dark:shadow-slate-500/30", bgSoftest: "bg-slate-600/5 dark:bg-slate-500/5", textOnBg: "text-white", bgDot: "bg-slate-600/60 dark:bg-slate-500/60", glow: "shadow-[0_0_20px_-5px_rgba(71,85,105,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(71,85,105,1)]", hoverBg: "hover:bg-slate-600/10 dark:hover:bg-slate-500/10", hoverText: "hover:text-slate-600 dark:hover:text-slate-400", groupHoverBg: "group-hover:bg-slate-600 dark:group-hover:bg-slate-500", tagBg: "bg-slate-600 text-white" },
  orange: { bg: "bg-orange-600 dark:bg-orange-500", text: "text-orange-600 dark:text-orange-500", bgSoft: "bg-orange-600/10 dark:bg-orange-500/10", border: "border-orange-600/20 dark:border-orange-500/20", shadow: "shadow-orange-600/30 dark:shadow-orange-500/30", bgSoftest: "bg-orange-600/5 dark:bg-orange-500/5", textOnBg: "text-white", bgDot: "bg-orange-600/60 dark:bg-orange-500/60", glow: "shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)]", brutalShadow: "shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]", hoverBg: "hover:bg-orange-600/10 dark:hover:bg-orange-500/10", hoverText: "hover:text-orange-600 dark:hover:text-orange-500", groupHoverBg: "group-hover:bg-orange-600 dark:group-hover:bg-orange-500", tagBg: "bg-orange-600 text-white" },
};

const getShapeClass = (shape: CarouselSliderShape) => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-lg sm:rounded-xl";
    case "rounded": return "rounded-2xl sm:rounded-3xl";
    case "default": return "rounded-3xl sm:rounded-[2.5rem]";
  }
};

const getSpacingClass = (spacing: CarouselSliderSpacing) => {
  switch (spacing) {
    case "2x": return "p-4 md:p-6";
    case "4x": return "p-6 md:p-8";
    case "6x": return "p-8 md:p-12";
    case "8x": return "p-10 md:p-16";
    default: return "p-0";
  }
};

const getHeightClass = (spacing: CarouselSliderSpacing) => {
  switch (spacing) {
    case "2x": return "h-[300px] md:h-[400px]";
    case "4x": return "h-[350px] md:h-[450px]";
    case "6x": return "h-[400px] md:h-[500px]";
    case "8x": return "h-[450px] md:h-[600px]";
    default: return "h-[400px] md:h-[500px]"; 
  }
};

export const CarouselSlider: React.FC<CarouselSliderProps> = React.memo(({ 
          slides = [], 
          className, 
          autoPlayInterval = 5000,
          showArrows = true,
          showDots = true,
          pauseOnHover = true,
          variant = "solid",
          theme = "modern",
          color = "default",
          shape = "default",
          spacing = "default",
          animation = "slide",
        }) => {
          const [currentIndex, setCurrentIndex] = useState(0);
          const [isPaused, setIsPaused] = useState(false);
          const [direction, setDirection] = useState(0);

          const activeTheme = colorThemeMap[color];
          const shapeClass = getShapeClass(shape);
          const spacingClass = getSpacingClass(spacing);
          const heightClass = getHeightClass(spacing);

          const nextSlide = useCallback(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % slides.length);
          }, [slides.length]);

          const prevSlide = useCallback(() => {
            setDirection(-1);
            setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
          }, [slides.length]);

          useEffect(() => {
            if (!slides.length || isPaused) return;
            const interval = setInterval(nextSlide, autoPlayInterval);
            return () => clearInterval(interval);
          }, [slides.length, autoPlayInterval, isPaused, nextSlide]);

          if (!slides.length) return null;

          const getAnimationVariants = (): Variants => {
            switch(animation) {
              case "fading":
                return {
                  enter: { opacity: 0 },
                  center: { zIndex: 1, x: 0, opacity: 1 },
                  exit: { zIndex: 0, opacity: 0 }
                };
              case "scale":
                return {
                  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 0.5 }),
                  center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
                  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", opacity: 0, scale: 1.5 })
                };
              case "flip":
                return {
                  enter: (direction: number) => ({ rotateY: direction > 0 ? 90 : -90, opacity: 0 }),
                  center: { zIndex: 1, rotateY: 0, opacity: 1 },
                  exit: (direction: number) => ({ zIndex: 0, rotateY: direction < 0 ? 90 : -90, opacity: 0 })
                };
              case "vertical":
                return {
                  enter: (direction: number) => ({ y: direction > 0 ? "100%" : "-100%", opacity: 0 }),
                  center: { zIndex: 1, y: 0, opacity: 1 },
                  exit: (direction: number) => ({ zIndex: 0, y: direction < 0 ? "100%" : "-100%", opacity: 0 })
                };
              case "translation":
                return {
                  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%" }),
                  center: { zIndex: 1, x: 0 },
                  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%" })
                };
              case "jumping":
                return {
                  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", y: "-50%", opacity: 0 }),
                  center: { zIndex: 1, x: 0, y: 0, opacity: 1 },
                  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "100%" : "-100%", y: "50%", opacity: 0 })
                };
              case "superposition":
                return {
                  enter: (direction: number) => ({ zIndex: 1, x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
                  center: { zIndex: 1, x: 0, opacity: 1 },
                  exit: { zIndex: 0, x: 0, opacity: 0 }
                };
              case "carousel":
                return {
                  enter: (direction: number) => ({ rotateY: direction > 0 ? 60 : -60, x: direction > 0 ? "50%" : "-50%", opacity: 0, zIndex: 0, scale: 0.8 }),
                  center: { zIndex: 1, rotateY: 0, x: 0, opacity: 1, scale: 1 },
                  exit: (direction: number) => ({ rotateY: direction < 0 ? 60 : -60, x: direction < 0 ? "50%" : "-50%", opacity: 0, zIndex: 0, scale: 0.8 })
                };
              case "slide":
              default:
                return {
                  enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0, scale: 1.1, filter: "blur(10px)" }),
                  center: { zIndex: 1, x: 0, opacity: 1, scale: 1, filter: "blur(0px)" },
                  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? "30%" : "-30%", opacity: 0, scale: 0.9, filter: "blur(5px)" })
                };
            }
          };

          const variants: Variants = getAnimationVariants();

          const isOutline = variant === "outline";
          const isGhost = variant === "ghost";
          const isLink = variant === "link";

          const getContainerStyles = () => {
            const baseBg = isOutline || isGhost || isLink ? "bg-transparent p-2 sm:p-4" : "bg-black";

            switch (theme) {
              case "modern":
                return cn(baseBg, "backdrop-blur-3xl border shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative transition-all duration-500", color !== "default" ? activeTheme.border : "border-border/50", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-[0_20px_50px_0] shadow-foreground/10 dark:shadow-foreground/5", isGhost || isLink ? "border-transparent shadow-none" : "");
              case "brutal":
                return cn(baseBg, "border-4 relative", isGhost || isLink ? "border-transparent shadow-none" : activeTheme.border, !isGhost && !isLink ? activeTheme.brutalShadow : "");
              case "futuristic":
                return cn(baseBg, "border relative transition-all duration-500", isOutline || isGhost || isLink ? (isGhost || isLink ? "border-transparent" : activeTheme.border) : cn(activeTheme.border, activeTheme.glow));
              case "halftone":
                return cn(baseBg, "border-2 border-dashed relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px]", isGhost || isLink ? "border-transparent shadow-none" : activeTheme.border, !isGhost && !isLink ? activeTheme.brutalShadow : "");
              case "clean":
                return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border/40 border-[0.5px]", "relative transition-all duration-500", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
              case "default":
              default:
                return cn(baseBg, isGhost || isLink ? "border-transparent shadow-none" : "border-border border", "relative transition-all duration-500", color !== "default" && !isGhost && !isLink ? activeTheme.glow : "shadow-sm");
            }
          };

          const innerShapeClass = isOutline || isGhost || isLink ? "rounded-[calc(var(--radius)-8px)]" : shapeClass;

          return (
            <div 
              className={cn(
                "group w-full max-w-5xl mx-auto", 
                shapeClass,
                getContainerStyles(),
                className
              )}
              onMouseEnter={() => pauseOnHover && setIsPaused(true)}
              onMouseLeave={() => pauseOnHover && setIsPaused(false)}
            >
              <div className={cn("relative w-full h-full overflow-hidden", innerShapeClass, heightClass)}>
                <div className="hidden">
                {slides.map((slide) => (
                  <Image 
                    key={`preload-${slide.id}`} 
                    src={slide.image} 
                    alt="preload" 
                    width={1200} 
                    height={800} 
                    priority 
                  />
                ))}
              </div>

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.4 },
                    scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    filter: { duration: 0.4 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slides[currentIndex].image}
                      alt={slides[currentIndex].title}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                  </div>

                  <div className={cn("absolute inset-0 z-20 flex flex-col justify-end text-white pointer-events-none", spacingClass)}>
                    <motion.div
                      initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                      className="flex flex-col gap-3 max-w-2xl"
                    >
                      <motion.span 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                        className={cn(
                          "inline-block self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          slides[currentIndex].tagBg || activeTheme.tagBg
                        )}
                      >
                        {slides[currentIndex].tag}
                      </motion.span>
                      
                      <h2 className="text-3xl md:text-6xl font-black leading-tight italic tracking-tighter uppercase">
                        {slides[currentIndex].title}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-xs md:text-sm text-white/80 font-bold italic tracking-wide uppercase">
                        <MapPin size={16} className={activeTheme.text} />
                        {slides[currentIndex].location}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {showArrows && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-4 pointer-events-none">
                  <motion.button
                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className={cn("pointer-events-auto p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 group", activeTheme.bg, activeTheme.textOnBg)}
                  >
                    <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className={cn("pointer-events-auto p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 group", activeTheme.bg, activeTheme.textOnBg)}
                  >
                    <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                  </motion.button>
                </div>
              )}

              {showDots && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === currentIndex) return;
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className="relative h-1.5 rounded-full transition-all duration-300 overflow-hidden bg-white/20"
                      style={{ width: currentIndex === idx ? "32px" : "6px" }}
                    >
                      {currentIndex === idx && (
                        <motion.div
                          layoutId="activeDot"
                          className={cn("absolute inset-0", activeTheme.bg)}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
                 <motion.div 
                   key={currentIndex}
                   initial={{ width: "0%" }}
                   animate={{ width: "100%" }}
                   transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
                   className={cn("h-full", activeTheme.bg)}
                 />
              </div>
              </div>
            </div>
          );
        });
CarouselSlider.displayName = "CarouselSlider";
