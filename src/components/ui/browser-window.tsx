"use client";

/**
 * @registry-slug browser-window
 * @registry-name Browser Window
 */

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BrowserWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  contentClassName?: string;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
}

export const BrowserWindow = React.forwardRef<HTMLDivElement, BrowserWindowProps>(
  ({ className, contentClassName, children, scrollRef, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "w-full h-full relative overflow-hidden rounded-2xl border border-border/40 bg-background flex flex-col items-center justify-center shadow-sm", 
          className
        )} 
        {...props}
      >
        {/* Mock Window Header */}
        <div className="absolute top-0 left-0 w-full h-8 bg-muted border-b border-border/40 flex items-center px-4 gap-1.5 z-50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        
        {/* Canvas */}
        <div 
          ref={scrollRef} 
          className={cn("relative w-full h-full pt-8 px-0 pb-0 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden custom-scrollbar", contentClassName)}
        >
          {children}
        </div>
      </div>
    );
  }
);
BrowserWindow.displayName = "BrowserWindow";
