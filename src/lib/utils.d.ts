import { type ClassValue } from "clsx";
/**
 * Utility function to merge class names with Tailwind
 */
export declare function cn(...inputs: ClassValue[]): string;
/**
 * Generates the unified URL for filtering by a specific component category.
 */
export declare function getCategoryUrl(categoryName: string): string;
/**
 * Utility function to format a number with currency
 */
export declare function formatCurrency(amount: number, currency?: string, options?: Intl.NumberFormatOptions): string;
/**
 * Utility function to generate a unique ID
 */
export declare function generateUniqueId(prefix?: string): string;
/**
 * Utility function to truncate text
 */
export declare function truncateText(text: string, maxLength: number): string;
/**
 * Utility function to format date
 */
export declare function formatDate(date: Date | number, options?: Intl.DateTimeFormatOptions): string;
/**
 * Utility function to debounce function calls
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Utility function to throttle function calls
 */
export declare function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void;
