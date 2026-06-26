"use client";

/**
 * @registry-slug form-builder
 * @registry-name FormBuilder
 * @registry-description A highly dynamic, JSON-driven form builder with built-in validation, variants, and themes.
 * @registry-category ui
 * @registry-dependency react-hook-form
 * @registry-dependency zod
 * @registry-dependency @hookform/resolvers
 * @registry-dependency framer-motion
 * @registry-dependency lucide-react
 */

import React, { useMemo } from "react";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// TYPES & SCHEMAS
// ==========================================

export type FormBuilderColor = "default" | "blue" | "emerald" | "rose" | "amber" | "violet" | "indigo" | "sky" | "slate" | "orange";
export type FormBuilderShape = "default" | "square" | "rounded" | "sharp";
export type FormBuilderSpacing = "default" | "2x" | "4x" | "6x" | "8x";
export type FormBuilderTheme = "default" | "modern" | "clean" | "futuristic" | "brutal" | "halftone";
export type FormBuilderVariant = "solid" | "outline" | "ghost" | "link";
export type FormBuilderSize = "default" | "sm" | "md" | "lg" | "xl" | "full";
export type LayoutOption = "single" | "two" | "three" | "auto";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "group"
  | "array"
  | "custom";

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  regex?: string;
  regexMessage?: string;
  custom?: (val: any) => boolean | string;
}

export interface SchemaField {
  name: string;
  type: FieldType;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  requiredMessage?: string;
  defaultValue?: any;
  colSpan?: 1 | 2 | 3 | "full";
  options?: FieldOption[];
  validation?: FieldValidation;
  showIf?: (values: any) => boolean;
  
  // For 'group' and 'array' types
  fields?: SchemaField[];
  
  // Custom Render
  render?: (methods: UseFormReturn<any>, name: string) => React.ReactNode;
}

export interface FormBuilderProps {
  schema: SchemaField[];
  defaultValues?: Record<string, any>;
  onSubmit: (data: any, methods: UseFormReturn<any>) => void | Promise<void>;
  color?: FormBuilderColor;
  shape?: FormBuilderShape;
  spacing?: FormBuilderSpacing;
  theme?: FormBuilderTheme;
  variant?: FormBuilderVariant;
  size?: FormBuilderSize;
  layout?: LayoutOption;
  submitText?: string;
  className?: string;
  isLoading?: boolean;
}

// ==========================================
// DYNAMIC ZOD SCHEMA BUILDER
// ==========================================

const buildZodSchema = (fields: SchemaField[]): z.ZodObject<any, any> => {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny = z.any();

    if (field.type === "group" && field.fields) {
      fieldSchema = buildZodSchema(field.fields);
      if (!field.required) fieldSchema = fieldSchema.optional();
    } else if (field.type === "array" && field.fields) {
      const itemSchema = buildZodSchema(field.fields);
      fieldSchema = z.array(itemSchema);
      if (field.validation?.min !== undefined) {
        fieldSchema = (fieldSchema as z.ZodArray<any>).min(field.validation.min, `Requires at least ${field.validation.min} items`);
      }
      if (field.validation?.max !== undefined) {
        fieldSchema = (fieldSchema as z.ZodArray<any>).max(field.validation.max, `Requires at most ${field.validation.max} items`);
      }
      if (!field.required) fieldSchema = fieldSchema.optional();
    } else if (field.type === "checkbox") {
      fieldSchema = z.boolean();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodBoolean).refine((v) => v === true, {
          message: field.requiredMessage || "Required",
        });
      } else {
        fieldSchema = fieldSchema.optional();
      }
    } else if (field.type === "number") {
      fieldSchema = z.coerce.number();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodNumber).refine((v) => !isNaN(v), {
          message: field.requiredMessage || "Required",
        });
      } else {
        fieldSchema = fieldSchema.optional();
      }
      if (field.validation?.min !== undefined) fieldSchema = (fieldSchema as z.ZodNumber).min(field.validation.min);
      if (field.validation?.max !== undefined) fieldSchema = (fieldSchema as z.ZodNumber).max(field.validation.max);
    } else {
      fieldSchema = z.string();
      if (field.required) {
        fieldSchema = (fieldSchema as z.ZodString).min(1, field.requiredMessage || "Required");
      } else {
        fieldSchema = (fieldSchema as z.ZodString).optional().or(z.literal(""));
      }

      if (field.type === "email") fieldSchema = (fieldSchema as z.ZodString).email("Invalid email");
      if (field.validation?.regex) fieldSchema = (fieldSchema as z.ZodString).regex(new RegExp(field.validation.regex), field.validation.regexMessage || "Invalid format");
      if (field.validation?.min !== undefined) fieldSchema = (fieldSchema as z.ZodString).min(field.validation.min);
      if (field.validation?.max !== undefined) fieldSchema = (fieldSchema as z.ZodString).max(field.validation.max);
    }

    if (field.validation?.custom) {
      fieldSchema = fieldSchema.refine((val) => {
        const res = field.validation!.custom!(val);
        return typeof res === "boolean" ? res : true;
      }, {
        message: "Invalid value",
      });
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
};

// ==========================================
// STYLES & THEMING
// ==========================================

const colorMap: Record<FormBuilderColor, { border: string; bg: string; text: string; bgActive: string; bgHover: string; ring: string; gradient: string }> = {
  default: { border: "border-foreground/50", bg: "bg-foreground", text: "text-foreground", bgActive: "bg-foreground/5", bgHover: "hover:bg-foreground/5", ring: "focus:ring-ring/20", gradient: "from-foreground/10" },
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

const getShapeClass = (shape: FormBuilderShape, element: "input" | "button" | "container" = "input") => {
  switch (shape) {
    case "square": return "rounded-none";
    case "sharp": return "rounded-sm";
    case "rounded": 
      return element === "container" ? "rounded-[2rem]" : element === "button" ? "rounded-full" : "rounded-2xl";
    case "default": 
      return element === "container" ? "rounded-xl" : element === "button" ? "rounded-lg" : "rounded-md";
  }
};

const getSpacingStyles = (spacing: FormBuilderSpacing, size: FormBuilderSize, element: "input" | "button" | "label" = "input") => {
  if (element === "button") {
    switch (spacing) {
      case "2x": return size === "sm" ? "px-2 py-1 text-[10px]" : size === "lg" ? "px-4 py-2 text-sm" : "px-3 py-1.5 text-xs";
      case "4x": return size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-6 py-2.5 text-base" : "px-4 py-2 text-sm";
      case "6x": return size === "sm" ? "px-6 py-2.5 text-sm" : size === "lg" ? "px-10 py-4 text-lg" : "px-8 py-3 text-base";
      case "8x": return size === "sm" ? "px-8 py-3 text-base" : size === "lg" ? "px-12 py-5 text-xl" : "px-10 py-4 text-lg";
      default: return size === "sm" ? "px-3 py-1.5 text-xs" : size === "lg" ? "px-8 py-3 text-base" : "px-6 py-2.5 text-sm";
    }
  }
  if (element === "label") {
    switch (spacing) {
      case "2x": return size === "sm" ? "mb-0.5 text-[10px]" : size === "lg" ? "mb-1.5 text-sm" : "mb-1 text-xs";
      case "4x": return size === "sm" ? "mb-1 text-[10px]" : size === "lg" ? "mb-2 text-base" : "mb-1 text-sm";
      case "6x": return size === "sm" ? "mb-1.5 text-xs" : size === "lg" ? "mb-3 text-lg" : "mb-2 text-base";
      case "8x": return size === "sm" ? "mb-2 text-sm" : size === "lg" ? "mb-4 text-xl" : "mb-3 text-lg";
      default: return size === "sm" ? "mb-1 text-xs" : size === "lg" ? "mb-2 text-base" : "mb-1.5 text-sm";
    }
  }
  // input
  switch (spacing) {
    case "2x": return size === "sm" ? "px-2 py-1 text-[10px]" : size === "lg" ? "px-3 py-2 text-sm" : "px-2.5 py-1.5 text-xs";
    case "4x": return size === "sm" ? "px-2.5 py-1.5 text-xs" : size === "lg" ? "px-4 py-2.5 text-base" : "px-3 py-2 text-sm";
    case "6x": return size === "sm" ? "px-3 py-2 text-sm" : size === "lg" ? "px-5 py-3.5 text-lg" : "px-4 py-3 text-base";
    case "8x": return size === "sm" ? "px-4 py-2.5 text-base" : size === "lg" ? "px-6 py-4 text-xl" : "px-5 py-4 text-lg";
    default: return size === "sm" ? "px-2.5 py-1.5 text-xs" : size === "lg" ? "px-4 py-3 text-base" : "px-3 py-2 text-sm";
  }
};

const getThemeClasses = (theme: FormBuilderTheme, colorInfo: any, variant: FormBuilderVariant, type: "input" | "container" | "button" = "input") => {
  if (type === "button") {
    let btnClass = "text-white";
    if (variant === "outline") btnClass = `bg-transparent border-2 ${colorInfo.border} ${colorInfo.text} hover:bg-muted/10`;
    else if (variant === "ghost") btnClass = `bg-transparent ${colorInfo.text} hover:bg-muted/10 border-transparent`;
    else if (variant === "link") btnClass = `bg-transparent ${colorInfo.text} hover:underline underline-offset-4 border-transparent`;
    else btnClass = `${colorInfo.bg} text-white hover:opacity-90`; // solid

    if (theme === "brutal") btnClass += ` border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] hover:shadow-[2px_2px_0px_0px_currentColor] hover:translate-x-[2px] hover:translate-y-[2px]`;
    return btnClass;
  }

  if (type === "container") {
    let containerClass = "bg-muted/5 border-border/40 border shadow-sm";
    
    if (variant === "ghost") containerClass = "bg-transparent border-transparent";
    else if (variant === "solid") containerClass = "bg-muted/20 border-transparent";

    switch (theme) {
      case "modern": return `backdrop-blur-md bg-background/50 border border-border/40 shadow-xl`;
      case "clean": return `bg-transparent border border-border/30`;
      case "futuristic": return `bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]`;
      case "brutal": return `bg-background border-4 border-foreground shadow-[8px_8px_0px_0px_currentColor]`;
      case "halftone": return `bg-[radial-gradient(circle,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:12px_12px] border-2 border-dashed ${colorInfo.border}`;
      default: return containerClass;
    }
  }

  // Input styles
  let inputClass = "bg-background border-border shadow-sm placeholder:text-muted-foreground/40";
  if (variant === "ghost") inputClass = "bg-muted/10 border-transparent focus:bg-background shadow-none";
  else if (variant === "solid") inputClass = "bg-muted/20 border-transparent focus:bg-background";
  
  switch (theme) {
    case "modern": return `${inputClass} backdrop-blur-sm border-border/50`;
    case "clean": return `bg-transparent border-b-2 border-border/50 focus:border-b-foreground rounded-none shadow-none`;
    case "futuristic": return `bg-black/40 border-white/10 text-white placeholder:text-white/30 focus:border-white/30 focus:shadow-[0_0_10px_rgba(255,255,255,0.1)]`;
    case "brutal": return `bg-background border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor] focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px]`;
    case "halftone": return `bg-background border-2 border-dashed ${colorInfo.border}`;
    default: return `${inputClass}`;
  }
};

// ==========================================
// FIELD COMPONENTS
// ==========================================

interface FieldProps {
  field: SchemaField;
  path: string; 
  methods: UseFormReturn<any>;
  color: FormBuilderColor;
  shape: FormBuilderShape;
  spacing: FormBuilderSpacing;
  theme: FormBuilderTheme;
  variant: FormBuilderVariant;
  size: FormBuilderSize;
}

const BaseField: React.FC<FieldProps> = ({ field, path, methods, color, shape, spacing, theme, variant, size }) => {
  const { register, formState: { errors }, watch } = methods;
  
  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  const errorObj = path.split('.').reduce((acc, part) => acc?.[part], errors as any);
  const errorMessage = errorObj?.message as string | undefined;

  const colSpanClass = field.colSpan === "full" ? "col-span-full" : 
                       field.colSpan === 2 ? "col-span-1 @[512px]:col-span-2" : 
                       field.colSpan === 3 ? "col-span-1 @[512px]:col-span-3" : "col-span-1";

  if (field.type === "custom" && field.render) {
    return (
      <div className={cn("w-full", colSpanClass)}>
        {field.render(methods, path)}
        {errorMessage && <p className="text-[11px] text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/>{errorMessage}</p>}
      </div>
    );
  }

  const activeTheme = colorMap[color];

  if (field.type === "group" && field.fields) {
    return (
      <div className={cn(
        "w-full p-4 @[512px]:p-6 space-y-4 @[512px]:space-y-5 transition-all duration-300", 
        getShapeClass(shape, "container"), 
        colSpanClass, 
        getThemeClasses(theme, activeTheme, variant, "container")
      )}>
        <div>
          {field.label && <h4 className={cn("font-bold text-lg", theme === "futuristic" ? "text-white" : "text-foreground")}>{field.label}</h4>}
          {field.description && <p className={cn("text-sm -mt-1", theme === "futuristic" ? "text-white/60" : "text-muted-foreground")}>{field.description}</p>}
        </div>
        <div className="grid grid-cols-1 @[512px]:grid-cols-2 gap-4 @[512px]:gap-6">
          {field.fields.map((subField) => (
            <BaseField 
              key={subField.name} 
              field={subField} 
              path={`${path}.${subField.name}`} 
              methods={methods} 
              color={color} 
              shape={shape} 
              spacing={spacing} 
              theme={theme}
              variant={variant}
              size={size}
            />
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "array" && field.fields) {
    return (
      <ArrayField 
        field={field} 
        path={path} 
        methods={methods} 
        color={color} 
        shape={shape} 
        spacing={spacing} 
        theme={theme}
        variant={variant}
        size={size}
        colSpanClass={colSpanClass} 
      />
    );
  }

  const inputClass = cn(
    "w-full min-w-0 transition-all focus-visible:outline-none border",
    getShapeClass(shape, "input"),
    getSpacingStyles(spacing, size, "input"),
    getThemeClasses(theme, activeTheme, variant, "input"),
    errorMessage ? "border-destructive focus:border-destructive focus:ring-destructive/10 focus:ring-2" : `focus:border-transparent focus:ring-2 ${activeTheme.ring}`
  );

  return (
    <div className={cn("w-full flex flex-col min-w-0", colSpanClass)}>
      {field.label && field.type !== 'checkbox' && (
        <label className={cn(
          "block font-bold tracking-tight break-words", 
          getSpacingStyles(spacing, size, "label"),
          theme === "futuristic" ? "text-white/90" : "text-foreground"
        )}>
          {field.label} {field.required && <span className={cn("text-destructive", activeTheme.text)}>*</span>}
        </label>
      )}
      {field.description && <p className={cn("text-xs mb-2 break-words", theme === "futuristic" ? "text-white/50" : "text-muted-foreground")}>{field.description}</p>}
      
      {field.type === "textarea" ? (
        <textarea
          {...register(path)}
          placeholder={field.placeholder}
          rows={4}
          className={inputClass}
        />
      ) : field.type === "select" ? (
        <select {...register(path)} className={cn(inputClass, "appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:16px_12px] pr-8 text-ellipsis overflow-hidden")} style={{ backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='${theme === "futuristic" ? "%23ffffff" : "%236b7280"}' viewBox='0 0 20 20'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")` }}>
          <option value="" disabled hidden>{field.placeholder || "Select option"}</option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-foreground bg-background">{opt.label}</option>
          ))}
        </select>
      ) : field.type === "checkbox" ? (
        <div className="flex items-start gap-2 mt-1 min-w-0">
          <input
            type="checkbox"
            {...register(path)}
            id={path}
            className={cn(
              "w-4 h-4 mt-0.5 shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2", 
              getShapeClass(shape, "input") === "rounded-none" ? "rounded-none" : "rounded",
              activeTheme.text, activeTheme.ring,
              theme === "futuristic" ? "bg-black/50 border-white/30" : "border-border",
              errorMessage && "border-destructive focus:ring-destructive"
            )}
          />
          <label htmlFor={path} className={cn("text-sm cursor-pointer font-medium break-words min-w-0", theme === "futuristic" ? "text-white/90" : "text-foreground", errorMessage && "text-destructive")}>
            {field.label} {field.required && <span className="text-destructive">*</span>}
          </label>
        </div>
      ) : field.type === "radio" ? (
        <div className="flex flex-wrap gap-4 mt-1 min-w-0">
          {field.options?.map((opt) => (
            <label key={opt.value} className={cn("flex items-start gap-2 text-sm cursor-pointer font-medium break-words min-w-0", theme === "futuristic" ? "text-white/90" : "text-foreground")}>
              <input
                type="radio"
                value={opt.value}
                {...register(path)}
                className={cn("w-4 h-4 mt-0.5 shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2", activeTheme.text, activeTheme.ring, theme === "futuristic" ? "bg-black/50 border-white/30" : "border-border/80")}
              />
              <span className="min-w-0 break-words">{opt.label}</span>
            </label>
          ))}
        </div>
      ) : (
        <input
          type={field.type}
          {...register(path)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}

      {errorMessage && (
        <motion.p 
          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
          className="text-[11px] text-destructive mt-1.5 flex items-start gap-1 font-bold break-words min-w-0"
        >
          <AlertCircle className="w-3 h-3 shrink-0 mt-0.5"/>
          <span className="min-w-0">{errorMessage}</span>
        </motion.p>
      )}
    </div>
  );
};

// ==========================================
// ARRAY FIELD COMPONENT (Repeatable)
// ==========================================

const ArrayField: React.FC<FieldProps & { colSpanClass: string }> = ({ field, path, methods, color, shape, spacing, theme, variant, size, colSpanClass }) => {
  const { control, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: path,
  });

  const formValues = watch();
  if (field.showIf && !field.showIf(formValues)) return null;

  const activeTheme = colorMap[color];

  return (
    <div className={cn(
      "w-full p-4 @[512px]:p-6 space-y-4 @[512px]:space-y-5 transition-all duration-300", 
      getShapeClass(shape, "container"), 
      colSpanClass, 
      getThemeClasses(theme, activeTheme, variant, "container")
    )}>
      <div className="flex items-center justify-between">
        <div>
          {field.label && <h4 className={cn("font-bold text-lg", theme === "futuristic" ? "text-white" : "text-foreground")}>{field.label}</h4>}
          {field.description && <p className={cn("text-xs mt-0.5", theme === "futuristic" ? "text-white/60" : "text-muted-foreground")}>{field.description}</p>}
        </div>
      </div>

      <div className="space-y-3 @[512px]:space-y-4">
        <AnimatePresence initial={false}>
          {fields.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={cn(
                "relative p-4 @[512px]:p-5 transition-colors overflow-hidden", 
                getShapeClass(shape, "container"),
                theme === "clean" ? "border-l-4 border-l-border" : "border",
                theme === "futuristic" ? "bg-black/20 border-white/10" : "bg-muted/10 hover:bg-muted/20 border-border/30"
              )}
            >
              <div className="absolute right-2 top-2 z-10">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className={cn("p-1.5 rounded-md transition-colors", theme === "futuristic" ? "text-white/40 hover:text-rose-400 hover:bg-rose-900/30" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10")}
                  aria-label={`Remove item ${index + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 @[512px]:grid-cols-2 gap-4 @[512px]:gap-6 mt-2">
                {field.fields?.map((subField) => (
                  <BaseField 
                    key={subField.name} 
                    field={subField} 
                    path={`${path}.${index}.${subField.name}`} 
                    methods={methods} 
                    color={color} 
                    shape={shape} 
                    spacing={spacing} 
                    theme={theme}
                    variant={variant}
                    size={size}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => {
          const newItem = field.fields?.reduce((acc, f) => ({ ...acc, [f.name]: f.defaultValue || "" }), {});
          append(newItem);
        }}
        className={cn(
          "w-full @[400px]:w-auto flex items-center justify-center gap-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
          activeTheme.ring,
          getThemeClasses(theme, activeTheme, "outline", "button"),
          getShapeClass(shape, "button"),
          getSpacingStyles(spacing, size, "button")
        )}
      >
        <Plus className="w-4 h-4 shrink-0" /> Add {field.label ? field.label.slice(0, -1) : "Item"}
      </button>
    </div>
  );
};

// ==========================================
// ROOT FORM BUILDER COMPONENT
// ==========================================

export const FormBuilder = React.memo(function FormBuilder({
  schema,
  defaultValues,
  onSubmit,
  color = "default",
  shape = "default",
  spacing = "default",
  theme = "default",
  variant = "outline",
  size = "md",
  layout = "auto",
  submitText = "Submit",
  className,
  isLoading = false
}: FormBuilderProps) {
  
  const zodSchema = useMemo(() => buildZodSchema(schema), [schema]);
  
  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues || {},
    mode: "onTouched"
  });

  const { handleSubmit, formState: { isSubmitting } } = methods;

  const handleFormSubmit = async (data: any) => {
    await onSubmit(data, methods);
  };

  const layoutClass = useMemo(() => {
    switch (layout) {
      case "single": return "grid-cols-1";
      case "two": return "grid-cols-1 @[512px]:grid-cols-2";
      case "three": return "grid-cols-1 @[512px]:grid-cols-3";
      case "auto": return "grid-cols-1 @[512px]:grid-cols-2 @[768px]:grid-cols-12";
      default: return "grid-cols-1";
    }
  }, [layout]);

  const activeTheme = colorMap[color];

  return (
    <div className={cn("w-full @container", className)}>
      <div className={cn(
        "relative p-6 @[512px]:p-8 transition-all duration-300", 
        getThemeClasses(theme, activeTheme, variant, "container"),
        getShapeClass(shape, "container")
      )}>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full space-y-6 @[512px]:space-y-8 relative z-10">
          <div className={cn("grid gap-5 @[512px]:gap-8 items-start", layoutClass)}>
            {schema.map((field) => (
              <div 
                key={field.name} 
                className={cn(
                  "w-full min-w-0", 
                  layout === "auto" ? (
                    field.colSpan === "full" ? "@[512px]:col-span-2 @[768px]:col-span-12" :
                    field.colSpan === 3 ? "@[512px]:col-span-2 @[768px]:col-span-9" :
                    field.colSpan === 2 ? "@[512px]:col-span-2 @[768px]:col-span-6" : "@[512px]:col-span-1 @[768px]:col-span-3"
                  ) : ""
                )}
              >
                <BaseField 
                  field={field} 
                  path={field.name} 
                  methods={methods} 
                  color={color} 
                  shape={shape} 
                  spacing={spacing} 
                  theme={theme}
                  variant={variant}
                  size={size}
                />
              </div>
            ))}
          </div>

          <div className="pt-6 flex @[400px]:justify-end border-t border-border/20">
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={cn(
                "w-full @[400px]:w-auto flex items-center justify-center gap-2 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
                activeTheme.ring,
                getThemeClasses(theme, activeTheme, variant === "ghost" ? "solid" : variant, "button"),
                getShapeClass(shape, "button"),
                getSpacingStyles(spacing, size, "button"),
                (isSubmitting || isLoading) && "opacity-70 cursor-not-allowed"
              )}
            >
              {(isSubmitting || isLoading) ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {submitText}
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});
FormBuilder.displayName = "FormBuilder";
