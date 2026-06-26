"use client";

import React from "react";
import dynamic from "next/dynamic";
import { GithubIcon, LinkedinIcon } from "@/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, type ContextMenuShape, type ContextMenuSpacing } from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
<<<<<<< Updated upstream
import VelocityMarquee from "@/components/ui/velocity-marquee";
import { PreviewContainer, DEFAULT_COLORS } from "./preview-engine/PreviewContainer";
import { MigratedPreviews } from "./previews/migrated-previews";
import type { PreviewRegistryMap } from "./preview-engine/preview-types";
import {
  ToastPreview,
  ModalPreview,
  DrawerPreview,
  TogglePreview,
  ErrorPagePreview,
  CinematicErrorPreview,
  CalendarPreview,
  CalculatorPreview,
  DynamicFormPreview,
  SelectPreview,
  FileUploadPreview,
  FormBuilderPreview,
  OTPVerificationPreview,
  PremiumOtpInputPreview,
  FilterBuilderPreview,
  HeaderPreview,
  NavMenuPreview,
  SidebarButtonPreview,
  AccordionPreview,
  DockPreview,
  CommandPalettePreview,
  GlobalBreadcrumbPreview,
  ComponentPageSidebarPreview,
  BasicLoaderPreview,
  BoxyRotatePreview,
  BoxyBouncePreview,
  BoxyShiftPreview,
  BasicCardPreview,
  StandardCardPreview,
  GlassPanelPreview,
  HoverGlareCardPreview,
  ExpandingCardPreview,
  NexusCardPreview,
  FooterPreview,
  PremiumUploadButtonPreview,
  InfiniteSliderPreview,
  NoirHero3DPreview,
  PrimaryButtonPreview,
  GlowyButtonPreview,
  SkeuomorphicButtonPreview,
  ClayMorphButtonPreview,
  MinimalButtonPreview,
  TextSystemPreview,
  DotBackgroundPreview,
  ParticlesPreview,
  PerspectiveGridPreview,
  PointCursorPreview,
  KanbanPreview,
  WorkflowPreview,
  RichTextEditorPreview,
  AIChatPreview,
  AutomotiveCarouselPreview,
  ScifiHelmetPreview,
  BmwM4Preview,
  BrowserWindowPreview,
  TerminalPreview,
  CursorGlowButtonPreview,
  ScrollTextRevealPreview,
  SlideUpRevealPreview,
  SearchPreview,
  SearchInputPreview,
  IconsPreview,
} from "./previews";

/**
 * Registry of all component previews.
 * Previews are extracted into category-based files in ./previews/
 */
export const PreviewRegistry: PreviewRegistryMap = {
  ...MigratedPreviews,
  // Feedback
  toast: function ToastWrapper() {
=======
import { motion, AnimatePresence } from "framer-motion";

// Typography helper components for the preview
const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold lg:text-5xl",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold",
      h4: "scroll-m-20 text-xl font-semibold",
      h5: "text-lg font-semibold",
      h6: "text-base font-semibold",
    },
  },
  defaultVariants: { variant: "h1" },
});

const textVariants = cva("text-foreground", {
  variants: {
    variant: {
      default: "leading-7 [&:not(:first-child)]:mt-6",
      lead: "text-xl text-muted-foreground",
      large: "text-lg font-semibold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 italic",
    },
  },
  defaultVariants: { variant: "default" },
});

const Heading: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "h1", ...props }) => (
  <Tag className={cn(headingVariants({ variant, className }))} {...props} />
);

const Text: React.FC<{
  className?: string;
  variant?: any;
  as?: any;
  children: React.ReactNode;
}> = ({ className, variant, as: Tag = "p", ...props }) => (
  <Tag className={cn(textVariants({ variant, className }))} {...props} />
);

const Label: React.FC<{
  className?: string;
  as?: any;
  children: React.ReactNode;
}> = ({ className, as: Tag = "label", ...props }) => (
  <Tag
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...props}
  />
);

const Code: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  ...props
}) => (
  <code
    className={cn(
      "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className,
    )}
    {...props}
  />
);

// ==========================================
// STANDARD PREVIEW WRAPPER
// ==========================================

interface PreviewContainerProps {
  title: string;
  description?: string;
  variants?: readonly string[];
  activeVariant?: string;
  onVariantChange?: (variant: any) => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  isVirtualScreen?: boolean;
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  canvasClassName?: string;
  extraControls?: React.ReactNode;
}

const PreviewContainer: React.FC<PreviewContainerProps> = ({
  title,
  description,
  variants,
  activeVariant,
  onVariantChange,
  children,
  className,
  contentClassName,
  isVirtualScreen = true,
  scrollRef,
  canvasClassName,
  extraControls,
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col overflow-y-auto bg-background", className)}>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between w-full shrink-0 relative z-10 px-2 py-2 md:px-8 md:py-6 bg-transparent">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
          {variants && variants.length > 0 && onVariantChange && (
            <div className="flex flex-col gap-1.5 w-full md:items-end">
              <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground hidden md:block">Layout Variant</span>
              <div className="flex items-center flex-wrap gap-2 p-1 bg-muted/30 rounded-lg max-w-full">
                {variants.map(v => (
                  <button
                    key={v}
                    onClick={() => onVariantChange(v)}
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-all duration-200 whitespace-nowrap",
                      activeVariant === v 
                        ? "bg-background shadow-sm text-foreground" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {extraControls}
        </div>
      </div>

      {/* Content Area */}
      <div className={cn("flex items-center justify-center flex-1 w-full relative px-2 md:px-4 pb-4 md:pb-8 pt-2 md:pt-4", contentClassName)}>
        {isVirtualScreen ? (
          <BrowserWindow 
            className="md:w-[80%] aspect-[9/16] md:aspect-[3/4] lg:aspect-video max-h-[90vh]"
            contentClassName={canvasClassName}
            scrollRef={scrollRef}
          >
            {children}
          </BrowserWindow>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

const ToastPreview: React.FC = () => {
  const { toast } = useToast();
  const [position, setPosition] = React.useState<
    "top-right" | "top-left" | "bottom-right" | "bottom-left"
  >("bottom-right");

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full p-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full max-w-md justify-items-stretch">
        {(
          ["top-left", "top-right", "bottom-left", "bottom-right"] as const
        ).map((pos) => (
          <Button
            key={pos}
            variant={position === pos ? "default" : "outline"}
            size="sm"
            onClick={() => setPosition(pos)}
            className="capitalize w-full"
          >
            {pos.replace("-", " ")}
          </Button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              title: "Success",
              description: "Toast integrated successfully!",
              position,
            });
          }}
        >
          Show Success Toast
        </Button>

        <Button
          variant="destructive"
          className="w-full sm:w-auto"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Something went wrong!",
              position,
            });
          }}
        >
          Show Destructive Toast
        </Button>
      </div>
    </div>
  );
};

const CalendarPreview: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [highlighted, setHighlighted] = React.useState<Date[]>([]);
  const [variant, setVariant] = React.useState<"modern" | "clean">("modern");

  const toggleHighlight = (targetDate: Date) => {
    setHighlighted((prev) => {
      const exists = prev.some(
        (d) => d.toDateString() === targetDate.toDateString(),
      );
      if (exists) {
        return prev.filter(
          (d) => d.toDateString() !== targetDate.toDateString(),
        );
      }
      return [...prev, targetDate];
    });
  };

  return (
    <PreviewContainer 
      title="Calendar" 
      description="A beautiful, interactive calendar with selection and highlighting."
      variants={["modern", "clean"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-6 gap-8">
        <Calendar
          value={date}
          onChange={setDate}
          highlightedDates={highlighted}
          onHighlightToggle={toggleHighlight}
          variant={variant}
        />

        <div className="flex flex-col gap-6 items-center w-full max-w-sm">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
          <div className="flex flex-col gap-4 items-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setHighlighted([])}
              className="text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
            >
              Clear Highlights
            </Button>
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.1em] font-bold text-center leading-relaxed">
              Interact with the grid to{" "}
              <span className="text-primary/60 italic underline underline-offset-4">
                Toggle Highlighting
              </span>{" "}
              or select dates.
            </p>
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const CalculatorPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"glass" | "brutal" | "neon">(
    "glass",
  );

  return (
    <PreviewContainer
      title="Calculator"
      description="A fully functional, styled calculator with various aesthetic variants."
      variants={["glass", "brutal", "neon"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex items-center justify-center w-full flex-1">
        <Calculator variant={variant} />
      </div>
    </PreviewContainer>
  );
};

const DynamicFormPreview: React.FC = () => {
  const [activeDemo, setActiveDemo] = React.useState<"contact" | "wizard" | "login">("contact");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  const contactFields: FieldConfig[] = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "e.g. John Doe",
      required: true,
      icon: User,
      colSpan: 1
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "e.g. john@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "subject",
      type: "autocomplete",
      label: "Inquiry Subject",
      placeholder: "Select or search...",
      required: true,
      options: [
        { label: "Product Integration Support", value: "integration" },
        { label: "Enterprise Licensing & Sales", value: "sales" },
        { label: "Partnership Opportunities", value: "partnerships" },
        { label: "Other inquiries", value: "other" }
      ],
      colSpan: 2
    },
    {
      name: "otherSubjectDetails",
      type: "text",
      label: "Inquiry Details",
      placeholder: "Provide more details on other subject",
      required: true,
      condition: (values) => values.subject === "other",
      colSpan: 2
    },
    {
      name: "message",
      type: "textarea",
      label: "Detailed Description",
      placeholder: "How can we help your business succeed?",
      required: true,
      colSpan: 2
    },
    {
      name: "interests",
      type: "multi-select",
      label: "Areas of Interest",
      placeholder: "Choose subjects...",
      options: [
        { label: "Next.js 16 Framework", value: "nextjs" },
        { label: "React 19 Server Components", value: "react19" },
        { label: "Tailwind CSS v4.0", value: "tailwind4" },
        { label: "Framer Motion Physics", value: "framer" }
      ],
      colSpan: 2
    },
    {
      name: "newsletter",
      type: "switch",
      label: "Subscribe to our developer newsletters",
      defaultValue: true,
      colSpan: 2
    }
  ];

  const wizardFields: FieldConfig[] = [
    {
      name: "username",
      type: "text",
      label: "Desired Username",
      placeholder: "e.g. johndoe_dev",
      required: true,
      icon: User,
      colSpan: 2
    },
    {
      name: "companyUrl",
      type: "url",
      label: "Company Website URL",
      placeholder: "e.g. https://google.com",
      required: true,
      icon: Globe,
      colSpan: 2
    },
    {
      name: "wizardEmail",
      type: "email",
      label: "Primary Email",
      placeholder: "e.g. dev@company.com",
      required: true,
      icon: Mail,
      colSpan: 1
    },
    {
      name: "wizardPhone",
      type: "phone",
      label: "Phone Number",
      placeholder: "e.g. +1 555-0199",
      required: true,
      icon: PhoneIcon,
      colSpan: 1
    },
    {
      name: "verificationCode",
      type: "otp",
      label: "Enter 6-digit Verification Code",
      required: true,
      otpLength: 6,
      colSpan: 2
    }
  ];

  const wizardSteps = [
    { title: "Profile Credentials", fieldNames: ["username", "companyUrl"] },
    { title: "Contact Details", fieldNames: ["wizardEmail", "wizardPhone"] },
    { title: "Verification Grid", fieldNames: ["verificationCode"] }
  ];

  const loginFields: FieldConfig[] = [
    {
      name: "loginEmail",
      type: "email",
      label: "Corporate Email Address",
      placeholder: "you@enterprise.com",
      required: true,
      icon: Mail,
      colSpan: 2
    },
    {
      name: "loginPassword",
      type: "password",
      label: "Access Password",
      placeholder: "Enter account password",
      required: true,
      icon: Lock,
      colSpan: 2
    },
    {
      name: "rememberMe",
      type: "checkbox",
      label: "Remember this device for 30 days",
      defaultValue: true,
      colSpan: 2
    }
  ];

  return (
    <PreviewContainer
      title="Dynamic Form"
      description="A highly dynamic, JSON-driven form builder with built-in validation."
      variants={["contact", "wizard", "login"]}
      activeVariant={activeDemo}
      contentClassName="items-start py-8"
      onVariantChange={(v) => {
        setActiveDemo(v);
        setSubmittedData(null);
      }}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-5xl">
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <AnimatePresence mode="wait">
            {activeDemo === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="modern"
                  fields={contactFields}
                  submitButtonText="Send Inquiry"
                  showResetButton={true}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "wizard" && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full"
              >
                <DynamicForm
                  variant="glass"
                  fields={wizardFields}
                  steps={wizardSteps}
                  submitButtonText="Verify & Register"
                  showResetButton={false}
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}

            {activeDemo === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="w-full max-w-md mx-auto"
              >
                <DynamicForm
                  variant="dark"
                  fields={loginFields}
                  submitButtonText="Authorize Session"
                  showResetButton={true}
                  autoSaveKey="saas_login_autosave"
                  onSubmit={(data) => {
                    setSubmittedData(data);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-full lg:w-80 shrink-0 flex flex-col justify-between p-6 rounded-2xl border border-border/40 bg-muted/10 backdrop-blur-sm">
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-black text-primary flex items-center gap-1.5 select-none">
              <Terminal className="w-4 h-4" /> Live Engine Output
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Submit any of the live forms to see the processed type-safe JSON payload emitted by the validation resolver in real time.
            </p>
          </div>

          <div className="mt-4 flex-1 flex flex-col justify-center min-h-[200px] border border-dashed border-border/60 rounded-xl p-4 bg-black/5 dark:bg-black/40 overflow-hidden">
            {submittedData ? (
              <div className="space-y-3 h-full flex flex-col justify-between">
                <div className="text-[10px] font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                  <CheckIcon className="w-3.5 h-3.5" /> Payload Validation Passed
                </div>
                <pre className="text-[11px] font-mono text-foreground/80 overflow-auto max-h-48 custom-scrollbar bg-muted/40 p-2 rounded-lg leading-relaxed flex-1 select-text">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSubmittedData(null)}
                  className="w-full h-8 text-[10px] uppercase font-bold tracking-wider"
                >
                  Clear Output
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-4 text-muted-foreground/40 space-y-2 select-none h-full">
                <Sparkles className="w-8 h-8 animate-pulse text-muted-foreground/30" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Awaiting Form Submit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const DockPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"modern" | "clean" | "interactive">("modern");

  return (
    <PreviewContainer
      title="Dock"
      description="A macOS style animated dock with interactive icons."
      variants={["modern", "clean", "interactive"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center w-full flex-1 justify-center transition-all duration-500 ease-in-out pb-20 pt-16">
        <Dock variant={variant}>
          <DockItem label="Home" href="#"><Home size={20} /></DockItem>
          <DockItem label="Explore" href="#"><Compass size={20} /></DockItem>
          {variant !== "clean" && <DockDivider />}
          <DockItem label="Messages" href="#"><MessageSquare size={20} /></DockItem>
          <DockItem label="Apps" href="#"><Plus size={20} /></DockItem>
          <DockItem label="Desktop" href="#"><Monitor size={20} /></DockItem>
          {variant !== "clean" && <DockDivider />}
          <DockItem label="Settings" onClick={() => {}}><Settings size={20} /></DockItem>
        </Dock>
        
        <div className="mt-12 text-sm text-center max-w-sm h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={variant}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-muted-foreground"
            >
              {variant === "modern" && "The standard macOS style dock with smooth cinematic scaling and a glassmorphic backdrop."}
              {variant === "clean" && "A minimal, non-scaling dock perfect for standard enterprise dashboards and clean minimal UIs."}
              {variant === "interactive" && "A highly bouncy, playful variant with intense physics, floating elements, and deep shadows."}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </PreviewContainer>
  );
};


const DrawerPreview: React.FC = () => {
  const [placement, setPlacement] = React.useState<"left" | "right" | "top" | "bottom">("right");
  const [variant, setVariant] = React.useState<"default" | "compact" | "glass" | "elevated" | "floating">("default");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  
  return (
    <PreviewContainer
      title="Drawer"
      description="A flexible drawer with placement options and multiple styles."
      variants={["default", "compact", "glass", "elevated", "floating"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      contentClassName="relative overflow-hidden"
      extraControls={
        <div className="flex flex-col gap-1.5 md:items-end">
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Placement</span>
          <div className="flex flex-wrap gap-1.5">
            {(["left", "right", "top", "bottom"] as const).map(p => (
              <Button key={p} variant={placement === p ? "default" : "outline"} size="sm" onClick={() => setPlacement(p)} className="h-7 text-xs">{p}</Button>
            ))}
          </div>
        </div>
      }
    >
      <div ref={setContainer} className="flex-1 flex items-center justify-center w-full h-full min-h-[300px] relative overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <Drawer placement={placement} variant={variant}>
          <DrawerTrigger asChild>
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">Open Drawer</Button>
          </DrawerTrigger>
        <DrawerContent container={container}>
          <DrawerHeader>
            <DrawerTitle>Premium Drawer</DrawerTitle>
            <DrawerDescription>A native feeling interaction powered by Framer Motion.</DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4 pt-4">
              <div className="w-full h-32 rounded-xl bg-muted animate-pulse" />
              <div className="w-3/4 h-8 rounded-lg bg-muted animate-pulse" />
              <div className="w-1/2 h-8 rounded-lg bg-muted animate-pulse" />
            </div>
          </DrawerBody>
          <DrawerFooter>
            <Button className="w-full">Confirm Action</Button>
            <DrawerClose asChild>
              <Button variant="outline" className="w-full">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    </PreviewContainer>
  );
};

const TogglePreview: React.FC = () => {
  return (
    <PreviewContainer title="Toggle" description="A flexible toggle component with multiple states and variants.">
      <div className="flex flex-col items-center justify-center w-full h-full p-12 space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 justify-items-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Default</span>
            <Toggle size="md" variant="default" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Modern</span>
            <Toggle size="md" variant="modern" defaultChecked />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Glass</span>
            <Toggle size="md" variant="glass" />
          </div>
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Neon</span>
            <Toggle size="md" variant="neon" defaultChecked />
          </div>
        </div>
        
        <div className="w-full h-px bg-border/40" />
        
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Sizes</span>
          <div className="flex items-center gap-8">
            <Toggle size="sm" variant="default" />
            <Toggle size="md" variant="default" defaultChecked />
            <Toggle size="lg" variant="default" />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
};

const ModalPreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "floating" | "glass" | "elevated" | "minimal" | "spotlight">("default");
  const [size, setSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl" | "full-width" | "full-screen">("md");
  const [position, setPosition] = React.useState<"center" | "top-center" | "bottom-sheet" | "left-side" | "right-side">("center");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  return (
    <PreviewContainer
      title="Modal"
      description="A premium modal interface with diverse variants and positions."
      variants={["default", "floating", "glass", "elevated", "minimal", "spotlight"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <div className="flex flex-col gap-1.5 md:items-end">
          <div className="flex flex-wrap gap-4 md:justify-end">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Size</span>
              <div className="flex flex-wrap gap-1.5">
                {(["xs", "sm", "md", "lg", "xl", "full-width", "full-screen"] as const).map(s => (
                  <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSize(s)} className="h-7 text-xs">{s}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Position</span>
              <div className="flex flex-wrap gap-1.5">
                {(["center", "top-center", "bottom-sheet", "left-side", "right-side"] as const).map(p => (
                  <Button key={p} variant={position === p ? "default" : "outline"} size="sm" onClick={() => setPosition(p)} className="capitalize h-7 text-xs">{p.replace("-", " ")}</Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div ref={setContainer} className="flex-1 flex flex-col items-center justify-center w-full min-h-[400px] md:min-h-[500px] h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full h-64 relative">
          <Button onClick={() => setOpen(true)} size="lg" className="rounded-full shadow-lg shadow-primary/20 px-8">Open Modal</Button>
        </div>
        
        <Modal open={open} onOpenChange={setOpen} variant={variant} size={size} position={position} container={container}>
          <ModalContent container={container}>
            <ModalHeader>
              <ModalTitle>Premium Modal Interface</ModalTitle>
              <ModalDescription>Configure variants, sizes, and positions effortlessly.</ModalDescription>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4 py-2">
                <div className="w-full h-32 rounded-xl bg-muted/50 animate-pulse border border-border/50" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-full animate-pulse" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </PreviewContainer>
  );
};

const CommandPalettePreview: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [variant, setVariant] = React.useState<"default" | "compact" | "floating" | "glass" | "spotlight">("spotlight");
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <PreviewContainer
      title="Command Palette"
      description="A quick, keyboard-accessible command palette."
      variants={["default", "compact", "floating", "glass", "spotlight"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <p className="text-xs text-muted-foreground md:text-right mt-1">
          Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">⌘</span>K</kbd> or <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Ctrl</span>K</kbd> to open.
        </p>
      }
    >
      <div ref={setContainer} className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full h-32 border border-dashed border-border/50 rounded-2xl relative cursor-pointer hover:bg-muted/50 transition-colors" onClick={() => setOpen(true)}>
          <p className="text-muted-foreground font-medium">Click here or press <CommandShortcut className="ml-2 inline-flex bg-background px-1.5 py-0.5 rounded-md border">Cmd+K</CommandShortcut> to open</p>
        </div>

        <CommandPalette open={open} onOpenChange={setOpen} variant={variant} container={container}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Search className="mr-2 h-4 w-4" />
                <span>Search Projects</span>
              </CommandItem>
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>Create New Project</span>
              </CommandItem>
              <CommandItem>
                <Terminal className="mr-2 h-4 w-4" />
                <span>Run Terminal Command</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile Settings</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Preferences</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Appearance</span>
                <CommandShortcut>⌘A</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandPalette>
      </div>
    </PreviewContainer>
  );
};

const SelectPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "soft" | "floating" | "glass" | "minimal">("default");
  const [size, setSize] = React.useState<"sm" | "md" | "lg">("md");
  const [isMulti, setIsMulti] = React.useState(false);
  const [searchable, setSearchable] = React.useState(true);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);

  const frameworks = [
    { value: "nextjs", label: "Next.js" },
    { value: "sveltekit", label: "SvelteKit" },
    { value: "nuxtjs", label: "Nuxt.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
    { value: "gatsby", label: "Gatsby" },
    { value: "redwood", label: "RedwoodJS" },
    { value: "solidstart", label: "SolidStart" },
  ];

  return (
    <PreviewContainer
      title="Select Input"
      description="A highly customizable select component with search and multi-select capabilities."
      variants={["default", "soft", "floating", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <div className="flex flex-col gap-1.5 md:items-end">
          <div className="flex flex-wrap gap-4 md:justify-end">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Size</span>
              <div className="flex flex-wrap gap-1.5">
                {(["sm", "md", "lg"] as const).map((s) => (
                  <Button key={s} variant={size === s ? "default" : "outline"} size="sm" onClick={() => setSize(s)} className="h-7 text-xs">{s}</Button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Mode</span>
              <div className="flex flex-wrap gap-1.5">
                <Button variant={!isMulti ? "default" : "outline"} size="sm" onClick={() => setIsMulti(false)} className="h-7 text-xs">Single</Button>
                <Button variant={isMulti ? "default" : "outline"} size="sm" onClick={() => setIsMulti(true)} className="h-7 text-xs">Multi</Button>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div ref={setContainer} className="flex flex-col items-center justify-start w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-start justify-center w-full h-full flex-1 pt-12">
          <Select 
            key={isMulti ? "multi" : "single"}
            variant={variant} 
            size={size} 
            multiSelect={isMulti} 
            searchable={searchable} 
            container={container}
          >
            <SelectTrigger placeholder={isMulti ? "Select frameworks..." : "Select a framework..."} />
            <SelectContent>
              <SelectSearch placeholder="Search framework..." />
              <SelectList>
                <SelectEmpty>No frameworks found.</SelectEmpty>
                <SelectGroup heading="Popular">
                  {frameworks.slice(0, 4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup heading="Rising">
                  {frameworks.slice(4).map((fw) => (
                    <SelectItem key={fw.value} value={fw.value} label={fw.label}>
                      {fw.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectList>
            </SelectContent>
          </Select>
        </div>
      </div>
    </PreviewContainer>
  );
};

const FileUploadPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "card" | "glass" | "minimal">("default");
  const [files, setFiles] = React.useState<FileState[]>([]);

  // Simulate an upload process
  const handleUpload = (filesToUpload: File[]) => {
    // In a real app, this would use XMLHttpRequest or fetch.
    // For the preview, we'll simulate progress per file.
    filesToUpload.forEach((file) => {
      // Small delay before starting
      setTimeout(() => {
        setFiles(prev => prev.map(f => {
          if (f.file === file && f.status === 'idle') return { ...f, status: 'uploading', progress: 0 };
          return f;
        }));

        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 15 + 5;
          
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, status: 'success', progress };
              return f;
            }));
          } else {
            setFiles(prev => prev.map(f => {
              if (f.file === file) return { ...f, progress };
              return f;
            }));
          }
        }, 300);
      }, 500);
    });
  };

  return (
    <PreviewContainer
      title="File Upload"
      description="A drag-and-drop file upload component with real-time progress."
      variants={["default", "compact", "card", "glass", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="flex flex-col items-center justify-center w-full h-full p-4 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="flex items-center justify-center w-full max-w-md flex-1 mb-32 pt-12">
          <FileUpload
            variant={variant}
            maxFiles={5}
            maxSize={1024 * 1024 * 10} // 10MB
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif"],
              "video/*": [".mp4", ".webm"],
              "application/pdf": [".pdf"]
            }}
            onUpload={handleUpload}
            onFilesChange={setFiles}
          >
            <UploadDropzone />
            <UploadPreview />
            <UploadProgress />
          </FileUpload>
        </div>
      </div>
    </PreviewContainer>
  );
};

const sampleSchema: SchemaField[] = [
  {
    name: "personalInfo",
    type: "group",
    label: "Personal Information",
    description: "Please provide your basic details.",
    colSpan: "full",
    fields: [
      { name: "firstName", type: "text", label: "First Name", placeholder: "John", required: true, colSpan: 2 },
      { name: "lastName", type: "text", label: "Last Name", placeholder: "Doe", required: true, colSpan: 2 },
      { name: "email", type: "email", label: "Email Address", placeholder: "john@example.com", required: true, colSpan: "full" },
    ]
  },
  {
    name: "role",
    type: "select",
    label: "Role",
    placeholder: "Select a role",
    required: true,
    colSpan: 2,
    options: [
      { label: "Developer", value: "developer" },
      { label: "Designer", value: "designer" },
      { label: "Manager", value: "manager" },
    ]
  },
  {
    name: "experience",
    type: "number",
    label: "Years of Experience",
    placeholder: "e.g. 5",
    required: true,
    colSpan: 2,
    validation: { min: 0, max: 50 }
  },
  {
    name: "teamMembers",
    type: "array",
    label: "Team Members",
    description: "Add members who will report to you.",
    colSpan: "full",
    showIf: (values) => values.role === "manager",
    fields: [
      { name: "name", type: "text", label: "Member Name", placeholder: "Jane Doe", required: true, colSpan: 2 },
      { name: "title", type: "text", label: "Title", placeholder: "Engineer", required: true, colSpan: 2 },
    ]
  },
  {
    name: "terms",
    type: "checkbox",
    label: "I agree to the terms and conditions",
    required: true,
    colSpan: "full"
  }
];

const FormBuilderPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "minimal" | "enterprise" | "compact">("default");
  const [layout, setLayout] = React.useState<"single" | "two" | "three" | "auto">("auto");
  const [submittedData, setSubmittedData] = React.useState<any>(null);

  return (
    <PreviewContainer
      title="Form Builder"
      description="A schema-driven form builder for rapid layout construction."
      variants={["default", "minimal", "enterprise", "compact"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      extraControls={
        <div className="flex flex-col gap-1.5 md:items-end">
          <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Layout Mode</span>
          <div className="flex flex-wrap gap-1.5">
            {(["auto", "single", "two", "three"] as const).map((l) => (
              <Button key={l} variant={layout === l ? "default" : "outline"} size="sm" onClick={() => setLayout(l)} className="h-7 text-xs">{l}</Button>
            ))}
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-start w-full h-full p-4 md:p-8 relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <FormBuilder
              schema={sampleSchema}
              variant={variant}
              layout={layout}
              onSubmit={(data) => setSubmittedData(data)}
            />
          </div>
          {submittedData && (
            <div className="w-full lg:w-80 shrink-0">
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <h4 className="text-sm font-semibold mb-2">Submitted Data</h4>
                <pre className="text-xs overflow-auto p-3 rounded-lg bg-background border border-border/50">
                  {JSON.stringify(submittedData, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </PreviewContainer>
  );
};

const initialKanbanData: KanbanColumnData[] = [
  {
    id: "col-todo",
    title: "To Do",
    cards: [
      { id: "c1", title: "Research competitors", priority: "medium", dueDate: "Oct 12", labels: [{ text: "Design", color: "#8b5cf6" }] },
      { id: "c2", title: "Setup monorepo", priority: "high", dueDate: "Oct 14", labels: [{ text: "Engineering", color: "#3b82f6" }], assignees: [{ name: "Alex" }] },
      { id: "c3", title: "Draft documentation", priority: "low", comments: 2 },
    ]
  },
  {
    id: "col-prog",
    title: "In Progress",
    cards: [
      { id: "c4", title: "Implement Kanban Board", priority: "urgent", dueDate: "Oct 10", labels: [{ text: "Feature", color: "#10b981" }], assignees: [{ name: "Sam" }, { name: "Jordan" }] },
      { id: "c5", title: "Fix API routing bug", priority: "high", attachments: 1 },
    ]
  },
  {
    id: "col-done",
    title: "Done",
    cards: [
      { id: "c6", title: "Design system audit", priority: "medium", labels: [{ text: "Design", color: "#8b5cf6" }] },
    ]
  }
];

const KanbanPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "enterprise" | "minimal">("enterprise");

  return (
    <PreviewContainer
      title="Kanban Board"
      description="A highly interactive, drag-and-drop Kanban board."
      variants={["default", "compact", "enterprise", "minimal"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="w-full flex justify-center self-start p-2 sm:p-8" style={{ transform: 'translateZ(0)' }}>
        <KanbanBoard variant={variant} initialColumns={initialKanbanData} />
      </div>
    </PreviewContainer>
  );
};

const WorkflowPreview: React.FC = () => {
  const [variant, setVariant] = React.useState<"default" | "compact" | "enterprise" | "minimal" | "glass">("enterprise");

  return (
    <PreviewContainer
      title="Workflow Builder"
      description="A node-based visual workflow editor for powerful automation pipelines."
      variants={["default", "enterprise", "minimal", "glass", "compact"]}
      activeVariant={variant}
      onVariantChange={setVariant}
    >
      <div className="w-full h-full min-h-[600px] p-4 md:p-8 flex items-center justify-center relative z-10">
        <div className="w-full h-[600px] max-w-5xl bg-background/20 rounded-xl overflow-hidden p-0 border border-border/50 relative shadow-xl">
          <WorkflowBuilder 
            variant={variant}
            initialNodes={[
              { id: "trigger-1", type: "trigger", position: { x: 100, y: 150 }, data: { label: "Schedule Trigger", description: "Runs every 1 hour" } },
              { id: "agent-1", type: "agent", position: { x: 450, y: 150 }, data: { label: "AI Classifier", description: "Analyzes incoming data" } },
              { id: "action-1", type: "action", position: { x: 800, y: 50 }, data: { label: "Slack Notification", description: "Send positive reviews" } },
              { id: "action-2", type: "action", position: { x: 800, y: 250 }, data: { label: "Zendesk Ticket", description: "Flag negative reviews" } }
            ]}
            initialEdges={[
              { id: "e1", source: "trigger-1", target: "agent-1", animated: true },
              { id: "e2", source: "agent-1", target: "action-1" },
              { id: "e3", source: "agent-1", target: "action-2" }
            ]}
            className="w-full h-full"
          >
            <WorkflowCanvas />
            <WorkflowToolbar />
            <WorkflowMiniMap />
          </WorkflowBuilder>
        </div>
      </div>
    </PreviewContainer>
  );
};

// ==========================================
// FILTER BUILDER
// ==========================================

const DEMO_TASKS = [
  { id: 1, title: "Implement new dashboard", status: "in_progress", priority: "critical", assignee: "Alice", due_date: "2026-06-15", story_points: 8, is_active: true, tags: ["frontend", "ui"] },
  { id: 2, title: "Fix login bug", status: "todo", priority: "high", assignee: "Bob", due_date: "2026-06-05", story_points: 3, is_active: true, tags: ["bug", "auth"] },
  { id: 3, title: "Update dependencies", status: "done", priority: "low", assignee: "Charlie", due_date: "2026-05-20", story_points: 2, is_active: false, tags: ["chore"] },
  { id: 4, title: "Write API documentation", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-06-10", story_points: 5, is_active: true, tags: ["docs", "api"] },
  { id: 5, title: "Design landing page", status: "in_progress", priority: "high", assignee: "Bob", due_date: "2026-06-25", story_points: 13, is_active: true, tags: ["design", "marketing"] },
  { id: 6, title: "Setup CI/CD pipeline", status: "done", priority: "critical", assignee: "Diana", due_date: "2026-05-15", story_points: 8, is_active: false, tags: ["devops", "infrastructure"] },
  { id: 7, title: "Optimize database queries", status: "todo", priority: "high", assignee: "Charlie", due_date: "2026-06-30", story_points: 5, is_active: true, tags: ["backend", "performance"] },
  { id: 8, title: "User testing session", status: "in_progress", priority: "medium", assignee: "Diana", due_date: "2026-06-12", story_points: 3, is_active: true, tags: ["research", "qa"] },
  { id: 9, title: "Refactor state management", status: "todo", priority: "medium", assignee: "Alice", due_date: "2026-07-05", story_points: 13, is_active: false, tags: ["frontend", "tech-debt"] },
  { id: 10, title: "Fix payment gateway timeout", status: "in_progress", priority: "critical", assignee: "Charlie", due_date: "2026-06-02", story_points: 8, is_active: true, tags: ["bug", "payments"] },
  { id: 11, title: "Create email templates", status: "done", priority: "low", assignee: "Bob", due_date: "2026-05-28", story_points: 2, is_active: false, tags: ["design", "email"] },
  { id: 12, title: "Audit security policies", status: "todo", priority: "high", assignee: "Diana", due_date: "2026-06-20", story_points: 5, is_active: true, tags: ["security", "compliance"] },
];

const evaluateRule = (task: any, rule: FilterRule) => {
  const taskValue = task[rule.fieldId];
  const filterValue = rule.value;
  
  if (rule.operatorId === "is_empty") return !taskValue;
  if (rule.operatorId === "is_not_empty") return !!taskValue;
  
  if (taskValue === undefined) return false;
  
  const valString = String(taskValue).toLowerCase();
  const filterString = String(filterValue).toLowerCase();
  
  switch (rule.operatorId) {
    case "eq": return valString === filterString;
    case "neq": return valString !== filterString;
    case "contains": return valString.includes(filterString);
    case "not_contains": return !valString.includes(filterString);
    case "starts_with": return valString.startsWith(filterString);
    case "ends_with": return valString.endsWith(filterString);
    case "gt": return Number(taskValue) > Number(filterValue);
    case "lt": return Number(taskValue) < Number(filterValue);
    default: return false;
  }
};

const evaluateGroup = (task: any, group: FilterGroup): boolean => {
  if (!group.children || group.children.length === 0) return true;
  
  if (group.logicalOperator === "AND") {
    return group.children.every(child => 
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  } else {
    return group.children.some(child => 
      child.type === "group" ? evaluateGroup(task, child as FilterGroup) : evaluateRule(task, child as FilterRule)
    );
  }
};

function FilterBuilderPreview() {
  const [variant, setVariant] = useState<"default" | "minimal" | "enterprise" | "compact" | "glass">("default");
  
  const fields: FilterField[] = [
    { id: "status", label: "Status", type: "select", options: [
      { value: "todo", label: "To Do" },
      { value: "in_progress", label: "In Progress" },
      { value: "done", label: "Done" }
    ]},
    { id: "priority", label: "Priority", type: "select", options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
      { value: "critical", label: "Critical" }
    ]},
    { id: "assignee", label: "Assignee", type: "user" },
    { id: "due_date", label: "Due Date", type: "date" },
    { id: "story_points", label: "Story Points", type: "number" },
    { id: "title", label: "Title", type: "text" },
    { id: "tags", label: "Labels", type: "tags" },
    { id: "is_active", label: "Active", type: "boolean" },
  ];

  const [data, setData] = useState<FilterGroup>(() => {
    // Initial realistic data with hardcoded IDs to prevent SSR hydration mismatch
    const root: FilterGroup = {
      type: "group",
      id: "root-group-1",
      logicalOperator: "AND",
      children: []
    };
    root.children = [
      { type: "rule", id: "r1", fieldId: "status", operatorId: "eq", value: "in_progress" },
      { 
        type: "group", 
        id: "g1", 
        logicalOperator: "OR", 
        children: [
          { type: "rule", id: "r2", fieldId: "priority", operatorId: "eq", value: "high" },
          { type: "rule", id: "r3", fieldId: "priority", operatorId: "eq", value: "critical" },
        ]
      }
    ];
    return root;
  });

  return (
    <PreviewContainer
      title="Filter Builder"
      description="Manage and filter your project tasks with advanced query logic."
      variants={["default", "minimal", "enterprise", "compact", "glass"]}
      activeVariant={variant}
      onVariantChange={setVariant}
      contentClassName="bg-transparent border-none p-4 md:p-8 shadow-none min-h-0 items-start overflow-y-auto custom-scrollbar"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        <div className="lg:col-span-2 space-y-6">
          
          {/* The Component Itself */}
          <div className={cn(
            "rounded-2xl transition-all duration-500",
            variant === "glass" ? "p-6 bg-gradient-to-br from-background/40 to-background/10 backdrop-blur-xl border border-white/10 shadow-2xl" : "",
            variant !== "glass" && variant !== "minimal" ? "p-6 bg-background border shadow-sm" : "",
            variant === "minimal" ? "p-2" : ""
          )}>
            <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter Rules
            </div>
            <FilterBuilder 
              initialData={data} 
              onChange={setData} 
              fields={fields}
              variant={variant}
            />
          </div>

          {/* Active Results Table */}
          <div className="bg-background rounded-2xl border shadow-sm overflow-hidden flex flex-col h-[300px]">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-4 border-b bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
              <div className="col-span-2">Task Title</div>
              <div>Status</div>
              <div>Priority</div>
              <div className="hidden sm:block">Assignee</div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {DEMO_TASKS.filter(t => evaluateGroup(t, data)).length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center p-8 opacity-60"
                  >
                    <Filter className="w-8 h-8 text-muted-foreground mb-3" />
                    <h3 className="text-sm font-medium">No tasks found</h3>
                    <p className="text-xs text-muted-foreground mt-1">Try adjusting your filter rules.</p>
                  </motion.div>
                ) : (
                  DEMO_TASKS.filter(t => evaluateGroup(t, data)).map(task => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={task.id} 
                      className="grid grid-cols-4 sm:grid-cols-5 gap-4 p-3 rounded-xl hover:bg-muted/50 items-center text-sm transition-colors border border-transparent hover:border-border/50 mb-1"
                    >
                      <div className="col-span-2 font-medium truncate">{task.title}</div>
                      <div className="min-w-0 flex">
                        <Badge variant={task.status === "done" ? "default" : task.status === "in_progress" ? "secondary" : "outline"} className="capitalize max-w-full">
                          <span className="truncate block w-full text-center">{task.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <div>
                        <span className={cn(
                          "text-xs font-medium px-2 py-1 rounded-md capitalize",
                          task.priority === "critical" && "bg-red-500/10 text-red-500",
                          task.priority === "high" && "bg-orange-500/10 text-orange-500",
                          task.priority === "medium" && "bg-blue-500/10 text-blue-500",
                          task.priority === "low" && "bg-slate-500/10 text-slate-500"
                        )}>
                          {task.priority}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                          {task.assignee.charAt(0)}
                        </div>
                        <span className="text-muted-foreground truncate">{task.assignee}</span>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
          
        </div>
        
        {/* Output State Viewer */}
        <div className="bg-background rounded-2xl border p-5 overflow-hidden flex flex-col h-[500px] lg:h-auto shadow-sm relative group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-foreground">Output JSON</span>
            </div>
            <div className="px-2 py-1 rounded bg-muted text-[10px] text-muted-foreground font-medium">
              Live State
            </div>
          </div>
          <div className="flex-1 overflow-auto rounded-xl border bg-muted/30 p-4 custom-scrollbar">
            <pre 
              className="text-[11px] leading-relaxed text-foreground font-mono whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(data, null, 2).replace(/"([^"]+)":/g, '<span class="text-indigo-300">"$1"</span>:')
              }}
            />
          </div>
        </div>
      </div>
    </PreviewContainer>
  );
}

export const PreviewRegistry: Record<string, React.FC> = {
  primary: function PrimaryPreview() {
    return (
      <PreviewContainer title="Primary Button" description="Semantic primary buttons with micro-interactions.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[300px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-items-center w-full">
            <PrimaryButton variant="primary">Primary</PrimaryButton>
            <PrimaryButton variant="success">Success</PrimaryButton>
            <PrimaryButton variant="warning">Warning</PrimaryButton>
            <PrimaryButton variant="danger">Danger</PrimaryButton>
            <PrimaryButton variant="info">Info</PrimaryButton>
            <PrimaryButton variant="secondary">Secondary</PrimaryButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  glowy: function GlowyPreview() {
    return (
      <PreviewContainer title="Glowy Button" description="Buttons with a highly aesthetic background glow effect on hover.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[300px]">
          <div className="flex flex-wrap gap-6 items-center justify-center w-full">
            <GlowyButton variant="primary">Primary</GlowyButton>
            <GlowyButton variant="success">Success</GlowyButton>
            <GlowyButton variant="danger">Danger</GlowyButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "basic-card": function BasicCardPreview() {
    const [variant, setVariant] = React.useState<
      "default" | "elevated" | "interactive" | "feature" | "stats" | "content" | "compact" | "media"
    >("default");

    return (
      <PreviewContainer
        title="Basic Card"
        description="A premium composable card system. Each variant is purpose-built for a specific UI context."
        variants={["default", "elevated", "interactive", "feature", "stats", "content", "compact", "media"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="w-full flex items-center justify-center p-8">
          <BasicCard variant={variant} />
        </div>
      </PreviewContainer>
    );
  },
  "boxy-rotate": function BoxyRotatePreview() {
    return (
      <PreviewContainer title="Boxy Rotate Loader" description="A minimal 3D rotating box loader.">
        <BoxyRotateLoader />
      </PreviewContainer>
    );
  },
  "boxy-bounce": function BoxyBouncePreview() {
    return (
      <PreviewContainer title="Boxy Bounce Loader" description="A playful bouncing box loader.">
        <BoxyBounceLoader />
      </PreviewContainer>
    );
  },
  "boxy-shift": function BoxyShiftPreview() {
    return (
      <PreviewContainer title="Boxy Shift Loader" description="An elegant shifting box loader.">
        <BoxyShiftLoader />
      </PreviewContainer>
    );
  },
  "text-system": function TextSystemPreview() {
    return (
      <PreviewContainer title="Text System" description="A robust and fully responsive typography system.">
        <div className="max-w-2xl w-full flex flex-col gap-8 select-text text-left">
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-blue-500">
              Semantic Headings
            </Label>
            <Heading variant="h1">Heading 1</Heading>
            <Heading variant="h2">Heading 2</Heading>
            <Heading variant="h3">Heading 3</Heading>
          </div>
          <div className="space-y-4">
            <Label className="text-xs uppercase tracking-widest text-emerald-500">
              Text Variants
            </Label>
            <Text variant="lead">
              This is a lead paragraph with larger font and muted color.
            </Text>
            <Text>
              This is the default body text that users will read most of the time.
            </Text>
            <Text variant="large">This is large text for emphasis.</Text>
            <Text variant="muted">
              This is muted text for secondary information.
            </Text>
            <Text variant="blockquote">
              &quot;This is a blockquote variant for citing sources or
              highlighting quotes.&quot;
            </Text>
          </div>
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-widest text-orange-500">
              Form Elements
            </Label>
            <div className="flex flex-col gap-2">
              <Label>Input Label</Label>
              <div className="flex items-center gap-2">
                <Code>npm install futureuikit</Code>
              </div>
            </div>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "infinite-slider": function InfiniteSliderPreview() {
    return (
      <PreviewContainer title="Carousel Slider" description="An expansive interactive image slider." contentClassName="p-0 border-none">
        <CarouselSlider
          slides={[
            {
              id: 1,
              tag: "EXPLORE",
              title: "EXOTIC ADVENTURE",
              location: "Bali, Indonesia",
              image:
                "https://images.unsplash.com/photo-1556206079-747a7a424d3d?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-indigo-600",
            },
            {
              id: 2,
              tag: "CITY",
              title: "URBAN EXPLORER",
              location: "Tokyo, Japan",
              image:
                "https://images.unsplash.com/photo-1571900670723-a317a66e3fb7?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-emerald-600",
            },
            {
              id: 3,
              tag: "NATURE",
              title: "MOUNTAIN RETREAT",
              location: "Swiss Alps",
              image:
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80",
              tagBg: "bg-amber-600",
            },
          ]}
        />
      </PreviewContainer>
    );
  },
  menu: function NavMenuPreview() {
    return (
      <PreviewContainer title="Navigation Menu" description="A dynamic floating menu." contentClassName="relative">
        <NavMenu />
      </PreviewContainer>
    );
  },
  "error-page": function ErrorPagePreview() {
    return (
      <PreviewContainer title="Error Page" description="A clean, full-screen error component." contentClassName="p-0">
        <ErrorPage errorCode="404" errorText="ERROR" />
      </PreviewContainer>
    );
  },
  "expanding-card": function ExpandingCardPreview() {
    return (
      <PreviewContainer title="Expanding Flex Card" description="A beautiful, interactive expanding flex layout.">
        <ExpandingFlexCard
          options={[
            {
              id: 1,
              main: "Forest",
              sub: "Majestic trees",
              img: "https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg",
              icon: "🚶",
            },
            {
              id: 2,
              main: "Winter",
              sub: "Delicate fall",
              img: "https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg",
              icon: "❄️",
            },
            {
              id: 3,
              main: "Ocean",
              sub: "Deep blue",
              img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
              icon: "🌊",
            },
            {
              id: 4,
              main: "Desert",
              sub: "Golden sands",
              img: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?ixlib=rb-4.0.3&q=80",
              icon: "☀️",
            },
          ]}
        />
      </PreviewContainer>
    );
  },
  basic: function BasicLoaderPreview() {
    const [variant, setVariant] = useState<"modern" | "clean" | "minimal">("modern");
    return (
      <PreviewContainer 
        title="Basic Loader" 
        description="Versatile spinning or pulsing loaders."
        variants={["modern", "clean", "minimal"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="flex flex-col gap-4 items-center justify-center min-h-[300px]">
          <BasicLoader
            variant={variant}
            color={variant === "clean" ? "#10b981" : variant === "minimal" ? "#f59e0b" : "#3b82f6"}
            text={variant === "clean" ? "Clean Dots..." : variant === "minimal" ? "Minimal..." : "Modern Rings..."}
          />
        </div>
      </PreviewContainer>
    );
  },
  toast: function ToastWrapperPreview() {
>>>>>>> Stashed changes
    return (
      <PreviewContainer title="Toast Notifications" description="Customizable toast notification system.">
        <ToastPreview />
      </PreviewContainer>
    );
  },
  modal: ModalPreview,
  drawer: DrawerPreview,
  toggle: TogglePreview,
  "error-page": ErrorPagePreview,
  "cinematic-error": CinematicErrorPreview,

  // Forms
  calendar: CalendarPreview,
  calculator: CalculatorPreview,
  "dynamic-form": DynamicFormPreview,
  select: SelectPreview,
  "file-upload": FileUploadPreview,
  "form-builder": FormBuilderPreview,
  "otp-verification": OTPVerificationPreview,
  "otp-input": PremiumOtpInputPreview,
  "filter-builder": FilterBuilderPreview,

  // Navigation
  header: HeaderPreview,
  menu: NavMenuPreview,
  "sidebar-button": SidebarButtonPreview,
  accordion: AccordionPreview,
  dock: DockPreview,
  "command-palette": CommandPalettePreview,
  "global-breadcrumb": GlobalBreadcrumbPreview,
  "component-page-sidebar": ComponentPageSidebarPreview,

  // Loaders
  "basic-loader": BasicLoaderPreview,
  "boxy-rotate": BoxyRotatePreview,
  "boxy-bounce": BoxyBouncePreview,
  "boxy-shift": BoxyShiftPreview,

  // Cards
  "basic-card": BasicCardPreview,
  card: StandardCardPreview,
  "glass-panel": GlassPanelPreview,
  "hover-glare-card": HoverGlareCardPreview,
  "expanding-card": ExpandingCardPreview,
  "nexus-card": NexusCardPreview,

  // Layout & Buttons
  footer: FooterPreview,
  "premium-upload-button": PremiumUploadButtonPreview,
  "infinite-slider": InfiniteSliderPreview,
  "noir-hero-3d": NoirHero3DPreview,
  primary: PrimaryButtonPreview,
  glowy: GlowyButtonPreview,
  "skeuomorphic-button": SkeuomorphicButtonPreview,
  "clay-morph-button": ClayMorphButtonPreview,
  "minimal-button": MinimalButtonPreview,

  // Typography
  "text-system": TextSystemPreview,

  // Backgrounds & Cursor
  "dot-background": DotBackgroundPreview,
  particles: ParticlesPreview,
  "perspective-grid": PerspectiveGridPreview,
  "point-cursor": PointCursorPreview,

  // Advanced
  kanban: KanbanPreview,
  "workflow-builder": WorkflowPreview,
  "rich-text-editor": RichTextEditorPreview,
  "ai-chat": AIChatPreview,
  "automotive-carousel": AutomotiveCarouselPreview,
  "scifi-helmet": ScifiHelmetPreview,
  "bmw-m4": BmwM4Preview,
  "browser-window": BrowserWindowPreview,
  terminal: TerminalPreview,
  "cursor-glow-button": CursorGlowButtonPreview,
  "scroll-text-reveal": ScrollTextRevealPreview,
  "slide-up-reveal": SlideUpRevealPreview,

  // Search
  search: SearchPreview,
  "search-input": SearchInputPreview,

  icons: IconsPreview,

  "components-grid": function ComponentsGridPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<string>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<string>("default");
    const [rx, setRx] = React.useState(0);
    const [ry, setRy] = React.useState(0);
    const [gx, setGx] = React.useState(50);
    const [gy, setGy] = React.useState(50);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (previewVariant !== "interactive" || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setRx((y - 0.5) * -8);
      setRy((x - 0.5) * 8);
      setGx(x * 100);
      setGy(y * 100);
    };

    const handleMouseLeave = () => {
      if (previewVariant !== "interactive") return;
      setRx(0); setRy(0); setGx(50); setGy(50);
    };

    const colorMap: Record<string, string> = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      blue: "bg-blue-600 text-white hover:bg-blue-700",
      emerald: "bg-emerald-600 text-white hover:bg-emerald-700",
      rose: "bg-rose-600 text-white hover:bg-rose-700",
      amber: "bg-amber-600 text-white hover:bg-amber-700",
      violet: "bg-violet-600 text-white hover:bg-violet-700",
      indigo: "bg-indigo-600 text-white hover:bg-indigo-700",
      sky: "bg-sky-600 text-white hover:bg-sky-700",
      slate: "bg-slate-600 text-white hover:bg-slate-700",
      orange: "bg-orange-600 text-white hover:bg-orange-700",
    };

    const bgMap: Record<string, string> = {
      default: "from-primary/5 to-primary/10",
      blue: "from-blue-500/5 to-blue-500/10",
      emerald: "from-emerald-500/5 to-emerald-500/10",
      rose: "from-rose-500/5 to-rose-500/10",
      amber: "from-amber-500/5 to-amber-500/10",
      violet: "from-violet-500/5 to-violet-500/10",
      indigo: "from-indigo-500/5 to-indigo-500/10",
      sky: "from-sky-500/5 to-sky-500/10",
      slate: "from-slate-500/5 to-slate-500/10",
      orange: "from-orange-500/5 to-orange-500/10",
    };

    const borderMap: Record<string, string> = {
      default: "border-border/60 hover:border-foreground/20",
      blue: "border-blue-500/30 hover:border-blue-500/50",
      emerald: "border-emerald-500/30 hover:border-emerald-500/50",
      rose: "border-rose-500/30 hover:border-rose-500/50",
      amber: "border-amber-500/30 hover:border-amber-500/50",
      violet: "border-violet-500/30 hover:border-violet-500/50",
      indigo: "border-indigo-500/30 hover:border-indigo-500/50",
      sky: "border-sky-500/30 hover:border-sky-500/50",
      slate: "border-slate-500/30 hover:border-slate-500/50",
      orange: "border-orange-500/30 hover:border-orange-500/50",
    };

    const variantCardMap: Record<string, string> = {
      default: "border shadow-sm hover:shadow-2xl backdrop-blur-xl bg-card/40 dark:bg-card/20",
      elevated: "border shadow-lg hover:shadow-3xl bg-card",
      bordered: "border-2 shadow-none bg-transparent",
      minimal: "border-0 shadow-none bg-transparent hover:bg-muted/10",
      interactive: "border shadow-sm hover:shadow-xl bg-card",
    };

    const variantBgMap: Record<string, string> = {
      default: "bg-linear-to-br transition-all duration-500",
      elevated: "bg-linear-to-br transition-all duration-500",
      bordered: "bg-muted/5",
      minimal: "bg-muted/5",
      interactive: "bg-linear-to-br transition-all duration-500",
    };

    const badgeColorMap: Record<string, string> = {
      default: "border-primary/40 text-primary",
      blue: "border-blue-500/40 text-blue-600 dark:text-blue-500",
      emerald: "border-emerald-500/40 text-emerald-600 dark:text-emerald-500",
      rose: "border-rose-500/40 text-rose-600 dark:text-rose-500",
      amber: "border-amber-500/40 text-amber-600 dark:text-amber-500",
      violet: "border-violet-500/40 text-violet-600 dark:text-violet-500",
      indigo: "border-indigo-500/40 text-indigo-600 dark:text-indigo-500",
      sky: "border-sky-500/40 text-sky-600 dark:text-sky-500",
      slate: "border-slate-500/40 text-slate-600 dark:text-slate-400",
      orange: "border-orange-500/40 text-orange-600 dark:text-orange-500",
    };

    const colorBorderVariants = ["default", "elevated", "bordered", "interactive"];
    const colorPreviewVariants = ["default", "elevated", "interactive"];

    const shapeMap: Record<string, string> = {
      default: "rounded-2xl sm:rounded-3xl",
      square: "rounded-none",
      rounded: "rounded-xl sm:rounded-2xl",
      sharp: "rounded-lg",
    };

    const spacingPadMap: Record<string, string> = {
      "2x": "p-3",
      "4x": "p-4",
      "6x": "p-6",
      "8x": "p-7",
      default: "p-5",
    };

    const variants = ["default", "elevated", "bordered", "minimal", "interactive"] as const;

    return (
      <PreviewContainer
        title="Components Grid"
        description="A responsive grid layout for displaying component cards with preview thumbnails, color themes, shape, and spacing variants."
        variants={variants}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "square", "rounded", "sharp"] as const).map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s}
                </button>
              ))}
            </div>
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s === "2x" ? "2X" : s === "4x" ? "4X" : s === "6x" ? "6X" : s === "8x" ? "8X" : s}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="w-full flex justify-center px-2 sm:px-4 md:px-6 py-6 md:py-10">
          <div className="w-full max-w-md">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={previewVariant === "interactive" ? { transform: `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`, transition: 'transform 0.1s ease-out' } : undefined}
              className={cn("flex flex-col overflow-hidden transition-all duration-500 group", variantCardMap[previewVariant], shapeMap[previewShape], colorBorderVariants.includes(previewVariant) && borderMap[previewColor])}
            >
              <div className="relative w-full min-h-[200px] sm:min-h-[220px] flex-1 overflow-hidden bg-muted/10 flex items-center justify-center">
                <div className={cn("absolute inset-0 z-0 transition-all duration-500", variantBgMap[previewVariant], colorPreviewVariants.includes(previewVariant) && bgMap[previewColor])} />
                <div className="relative z-10">
                  <button className={cn("px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-black/10", colorMap[previewColor])}>
                    Click me
                  </button>
                </div>
                {previewVariant === "interactive" && (
                  <div
                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 60%)` }}
                  />
                )}
              </div>
              <div className={cn(spacingPadMap[previewSpacing], "pb-2")}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold h-4", badgeColorMap[previewColor])}>UI</span>
                </div>
                <h3 className="text-lg font-bold italic transition-colors truncate">Button</h3>
              </div>
              <div className={cn(spacingPadMap[previewSpacing], "pt-0 mt-auto")}>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
                  A versatile button component with color themes, variants, and shape/spacing options for any interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </PreviewContainer>
    );
  },

  "velocity-marquee": function VelocityMarqueePreview() {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [color, setColor] = React.useState<string>("default");
    const [shape, setShape] = React.useState<string>("default");
    const [spacing, setSpacing] = React.useState<string>("default");
    const demoItems = [
      {
        name: "React",
        purpose: "UI Library",
        impact: 95,
        description: "The fundamental view layer allowing declarative component composition.",
        color: "from-cyan-500 to-blue-500",
      },
      {
        name: "Next.js",
        purpose: "React Framework",
        impact: 100,
        description: "Provides the overarching architecture, routing, and rendering strategies.",
        color: "from-neutral-700 to-neutral-500",
      },
      {
        name: "Tailwind CSS",
        purpose: "Styling Engine",
        impact: 90,
        description: "Utility-first CSS framework enabling rapid UI development without context switching.",
        color: "from-teal-400 to-cyan-500",
      },
      {
        name: "Framer Motion",
        purpose: "Animation Library",
        impact: 85,
        description: "Powers the fluid, physics-based animations and layout transitions throughout the site.",
        color: "from-fuchsia-500 to-purple-600",
      },
      {
        name: "Radix UI",
        purpose: "Accessible Primitives",
        impact: 80,
        description: "Unstyled, accessible components forming the foundation of complex interactive elements.",
        color: "from-indigo-500 to-blue-500",
      },
      {
        name: "Lucide",
        purpose: "Iconography",
        impact: 70,
        description: "Beautiful, consistent icons providing visual anchors for interactive elements.",
        color: "from-rose-400 to-red-500",
      },
    ];

    return (
      <PreviewContainer scrollRef={scrollRef} title="Velocity Marquee" description="An interactive marquee grid featuring glowing cards." isVirtualScreen={true} contentClassName="p-0 border-none"
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Color</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "blue", "emerald", "rose", "amber", "violet", "indigo", "sky", "slate", "orange"] as const).map(c => (
                  <button key={c} onClick={() => setColor(c)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", color === c ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{c}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setShape(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", shape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setSpacing(s)}
                    className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", spacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="flex flex-col w-full min-h-[150vh] justify-center items-center relative overflow-hidden bg-background">
          <div className="absolute top-20 flex flex-col items-center text-muted-foreground opacity-50">
            <span className="animate-bounce">↓ Scroll the page to see physics animations ↓</span>
          </div>
          <VelocityMarquee items={demoItems} containerRef={scrollRef} color={color as any} shape={shape as any} spacing={spacing as any} />
        </div>
      </PreviewContainer>
    );
  },

  // Previews not yet moved (as per specific list)
  button: function StandardButtonPreview() {
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewVariant, setPreviewVariant] = React.useState<any>("solid");
    const [previewSize, setPreviewSize] = React.useState<any>("md");
    const [previewShape, setPreviewShape] = React.useState<any>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<any>("default");

    return (
      <PreviewContainer 
        title="Standard Button" 
        description="The base button component matching Radix / shadcn spec with Future UI standard styling."
        colors={DEFAULT_COLORS} activeColor={previewColor} onColorChange={setPreviewColor} 
        variants={["solid", "outline", "ghost", "link"]} activeVariant={previewVariant} onVariantChange={setPreviewVariant}
        extraControls={
          <>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Size</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["sm", "md", "lg", "icon"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSize(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSize === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "square", "rounded", "sharp"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewShape(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
              <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["default", "2x", "4x", "6x", "8x"] as const).map(s => (
                  <button key={s} onClick={() => setPreviewSpacing(s)}
                    className={`px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap ${previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          </>
        }
      >
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-75">
          <div className="flex flex-wrap gap-8 items-center justify-center w-full">
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? <GithubIcon className="w-4 h-4" /> : (
                <>
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </>
              )}
            </Button>
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? <LinkedinIcon className="w-4 h-4" /> : "LinkedIn"}
            </Button>
            <Button variant={previewVariant} color={previewColor} size={previewSize} shape={previewShape} spacing={previewSpacing}>
              {previewSize === "icon" ? "A" : "Primary Action"}
            </Button>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "scroll-progress": function ScrollProgressPreview() {
    return (
      <PreviewContainer 
        title="Scroll Progress" 
        description="A minimal scroll progress indicator."
        isVirtualScreen={true}
      >
        <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center relative min-h-75">
          <p className="text-muted-foreground font-medium">
            Scroll down the main page to see the global scroll progress bar in action!
          </p>
        </div>
      </PreviewContainer>
    );
  },
  "puzzle-video": function PuzzleVideoPreview() {
    const PuzzleVideo = React.useMemo(() => dynamic(() => import('@/components/ui/puzzle-video').then(mod => mod.default || mod.PuzzleVideo), { ssr: false }), []);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [variant, setVariant] = React.useState<"jigsaw" | "jigsaw-uneven" | "glass">("jigsaw");
    const [aspectRatio, setAspectRatio] = React.useState<"landscape" | "portrait" | "square" | "video">("video");

    return (
      <PreviewContainer 
        scrollRef={scrollRef} 
        title="Puzzle Video" 
        description="A video player that shatters into a jigsaw puzzle based on scroll progress." 
        isVirtualScreen={true} 
        align="start" 
        contentClassName="p-0 border-none"
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Options</span>
            <div className="flex flex-wrap items-center gap-4 w-full">
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                {(["jigsaw", "jigsaw-uneven", "glass"] as const).map(v => (
                  <button key={v} onClick={() => setVariant(v)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", variant === v ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                    {v === "jigsaw-uneven" ? "Uneven" : v}
                  </button>
                ))}
              </div>
              <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
                <span className="text-[10px] uppercase font-bold text-muted-foreground mx-2">Aspect Ratio:</span>
                {(["video", "portrait", "square"] as const).map(a => (
                  <button key={a} onClick={() => setAspectRatio(a)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", aspectRatio === a ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                    {a === "video" ? "Landscape" : a}
                  </button>
                ))}
              </div>
            </div>
          </div>
<<<<<<< Updated upstream
=======
        </PointCursor>
      </PreviewContainer>
    );
  },
  accordion: function AccordionPreview() {
    return (
      <PreviewContainer title="Accordion" description="A vertically collapsing accordion component.">
        <div className="flex items-center justify-center w-full max-w-2xl h-full p-4 mx-auto">
          <Accordion
            items={[
              {
                title: "What is Future UI?",
                content:
                  "Future UI is a modern, high-performance UI component library built for Next.js 16 and React 19. It leverages Tailwind CSS 4 and Framer Motion to provide visually stunning, reusable components.",
              },
              {
                title: "How do I install components?",
                content:
                  "You can use our custom CLI tool to add components directly to your project. Simply run 'npx futureuikit add <slug>' and we'll handle the rest, including dependencies and path aliases.",
              },
              {
                title: "Is it customizable?",
                content:
                  "Yes! Since you download the source code, you have full ownership and can customize every aspect of the components to fit your specific needs and design system.",
              },
            ]}
          />
        </div>
      </PreviewContainer>
    );
  },
  calendar: CalendarPreview,
  calculator: CalculatorPreview,
  "cinematic-error": function CinematicErrorPreview() {
    return (
      <PreviewContainer 
        title="Cinematic Error" 
        description="A dramatic and immersive error page."
        contentClassName="p-0 bg-transparent border-0 shadow-none min-h-[100dvh]"
      >
        <div className="w-full h-full absolute inset-0 overflow-hidden">
          <CinematicError />
        </div>
      </PreviewContainer>
    );
  },
  "nexus-card": function NexusCardPreview() {
    const [variant, setVariant] = React.useState<"default" | "glass" | "solid" | "neon">("default");
    
    return (
      <PreviewContainer 
        title="Nexus Card" 
        description="A premium 3D parallax card with reactive spotlight."
        variants={["default", "glass", "solid", "neon"]}
        activeVariant={variant}
        onVariantChange={setVariant as any}
      >
        <div className="flex items-center justify-center w-full h-full p-4 sm:p-8">
          <NexusCard className="w-80 h-96" variant={variant}>
            <h2 className="text-2xl font-bold text-foreground mb-2">Nexus Design</h2>
            <p className="text-muted-foreground">Hover over this card to experience the premium tactile feel, reactive spotlight, and 3D parallax tilt.</p>
          </NexusCard>
        </div>
      </PreviewContainer>
    );
  },
  "scroll-text-reveal": function ScrollTextRevealPreview() {
    const scrollContainer = React.useRef<HTMLDivElement>(null);
    const [screenHeight, setScreenHeight] = React.useState<string | number>("100vh");

    React.useEffect(() => {
      if (scrollContainer.current) {
        // Measure the virtual screen height to perfectly center the text
        setScreenHeight(scrollContainer.current.clientHeight);
      }
    }, []);

    return (
      <PreviewContainer 
        title="Scroll Text Reveal" 
        description="Text that reveals itself as you scroll down the screen." 
        scrollRef={scrollContainer}
        canvasClassName="justify-start"
      >
        <div className="w-full flex flex-col items-center pb-20">
          <div style={{ height: screenHeight }} className="flex flex-col items-center justify-center text-muted-foreground w-full shrink-0">
            <span className="animate-pulse">Scroll down to reveal text ↓</span>
          </div>
          <div className="py-32 px-8 max-w-4xl flex items-center justify-center shrink-0">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center">
              <ScrollTextReveal container={scrollContainer}>
                The future of UI design is here. Experience seamless, highly optimized animations that elevate your application&apos;s feel.
              </ScrollTextReveal>
            </h2>
          </div>
          <div style={{ height: screenHeight }} className="flex flex-col items-center justify-center text-muted-foreground w-full shrink-0">
            <span className="animate-pulse">Scroll up to reverse ↑</span>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "rich-text-editor": function RichTextEditorPreviewWrapper() {
    const [variant, setVariant] = useState<"default" | "minimal" | "writing" | "enterprise" | "glass">("default");
    return (
      <PreviewContainer 
        title="Rich Text Editor" 
        description="A powerful Notion-style rich text editor built with Tiptap."
        variants={["default", "minimal", "writing", "enterprise", "glass"]}
        activeVariant={variant}
        onVariantChange={setVariant}
      >
        <div className="w-full max-w-4xl mx-auto min-h-[500px]">
          <RichTextEditor 
            variant={variant}
            content={`
              <h1>Welcome to the Rich Text Editor ✨</h1>
              <p>This is a highly customizable, Notion-like editor built with Tiptap. It's fully functional out of the box and supports various modern features.</p>
              <p><strong>Try these interactions:</strong></p>
              <ul data-type="taskList">
                <li data-type="taskItem" data-checked="false">Type <code>/</code> on a new line to open the <strong>Slash Command menu</strong>.</li>
                <li data-type="taskItem" data-checked="false">Select any text to see the floating <strong>Bubble Menu</strong> for quick formatting.</li>
                <li data-type="taskItem" data-checked="false">Write markdown shortcuts like <code># </code> for headings or <code>> </code> for blockquotes.</li>
              </ul>
              <blockquote>"The best tools get out of your way and let you focus on what matters most."</blockquote>
              <pre><code>function test() {\n  console.log('It even has code blocks!');\n}</code></pre>
              <p>You can also insert tables and images seamlessly.</p>
            `}
          />
        </div>
      </PreviewContainer>
    );
  },
  "cursor-glow-button": function CursorGlowButtonPreview() {
    return (
      <PreviewContainer title="Cursor Glow Button" description="Buttons with a reactive glowing effect following the cursor.">
        <div className="w-full flex items-center justify-center p-4 md:p-12 min-h-[300px]">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-3xl justify-items-center">
            <CursorGlowButton variant="default">Primary</CursorGlowButton>
            <CursorGlowButton variant="secondary">Secondary</CursorGlowButton>
            <CursorGlowButton variant="outline">Outline</CursorGlowButton>
            <CursorGlowButton variant="destructive" glowColor="rgba(239, 68, 68, 0.8)">Destructive</CursorGlowButton>
            <CursorGlowButton variant="ghost">Ghost</CursorGlowButton>
            <CursorGlowButton variant="link">Link</CursorGlowButton>
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "filter-builder": FilterBuilderPreview,
  "dynamic-form": DynamicFormPreview,
  dock: DockPreview,
  drawer: DrawerPreview,
  toggle: TogglePreview,
  modal: ModalPreview,
  "command-palette": CommandPalettePreview,
  select: SelectPreview,
  "file-upload": FileUploadPreview,
  "form-builder": FormBuilderPreview,
  kanban: KanbanPreview,
  "workflow-builder": WorkflowPreview,
  "ai-chat": AIChatPreview,
  "browser-window": BrowserWindowPreview,
};

function AIChatPreview() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<"chatgpt" | "claude" | "perplexity" | "compact" | "enterprise" | "minimal">("chatgpt");
  const [inputVariant, setInputVariant] = useState<"standard" | "floating" | "command" | "multiline" | "workspace">("standard");

  // ---- Response Data ----

  const GREETINGS = [
    // English
    "hi", "hello", "hey", "hey there", "hi there", "howdy", "greetings", "what's up", "sup", "yo",
    // Spanish
    "hola", "buenos dias", "buenas tardes", "buenas noches",
    // French
    "bonjour", "bonsoir", "salut",
    // German
    "hallo", "guten tag", "guten morgen", "guten abend",
    // Italian
    "ciao", "salve", "buongiorno",
    // Portuguese
    "olá", "oi", "bom dia",
    // Japanese (romaji)
    "konnichiwa", "ohayo", "konbanwa",
    // Hindi (romaji)
    "namaste", "namaskar",
    // Arabic (romaji)
    "marhaba", "ahlan",
    // Chinese (romaji)
    "ni hao",
    // Korean (romaji)
    "annyeong", "annyeonghaseyo",
    // Russian (romaji)
    "privet", "zdravstvuyte",
    // Dutch
    "hoi", "dag", "goedendag",
    // Swedish
    "hej", "god dag",
  ];

  const GREETING_RESPONSES = [
    "Hello! 👋 How can I help you today? Try asking me for a poem, some code, or just chat!",
    "Hey there! Great to see you. What are we building today?",
    "Hi! I'm your AI assistant. Ask me for code, poems, or anything else!",
    "Greetings! I'm fully wired up and ready to help. What's on your mind?",
    "Hello! I'm a demo AI interface. Type 'poem' for a poem or 'react code' for a React component!",
    "Hey! 🚀 I'm ready. Ask me for code in any language, a poem, or just say something fun!",
    "Howdy! What can I do for you today?",
    "Bonjour! (Hello!) I'm your multilingual AI assistant. How can I help?",
    "¡Hola! I speak all languages — ask me anything!",
    "Ciao! Your AI is ready. What do you need?",
  ];

  const POEMS = [
    {
      title: "The Road Not Taken (excerpt) – Robert Frost",
      text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth.",
    },
    {
      title: "If — Rudyard Kipling (excerpt)",
      text: "If you can keep your head when all about you\n    Are losing theirs and blaming it on you,\nIf you can trust yourself when all men doubt you,\n    But make allowance for their doubting too;",
    },
    {
      title: "Still I Rise – Maya Angelou (excerpt)",
      text: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.",
    },
    {
      title: "Shall I compare thee – Shakespeare (Sonnet 18)",
      text: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate.\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date.",
    },
    {
      title: "Ozymandias – Percy Bysshe Shelley",
      text: "I met a traveller from an antique land,\nWho said — 'Two vast and trunkless legs of stone\nStand in the desert. Near them, on the sand,\nHalf sunk, a shattered visage lies.'",
    },
    {
      title: "Hope is the Thing with Feathers – Emily Dickinson",
      text: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all.",
    },
    {
      title: "Do Not Go Gentle – Dylan Thomas (excerpt)",
      text: "Do not go gentle into that good night,\nOld age should burn and rave at close of day;\nRage, rage against the dying of the light.",
    },
    {
      title: "Invictus – William Ernest Henley (excerpt)",
      text: "Out of the night that covers me,\n      Black as the pit from pole to pole,\nI thank whatever gods may be\n      For my unconquerable soul.",
    },
  ];

  const CODE_SNIPPETS = [
    {
      lang: "tsx",
      label: "React Counter Component",
      code: `import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <h1 className="text-4xl font-bold">{count}</h1>
      <div className="flex gap-2">
        <button onClick={() => setCount(c => c - 1)} className="px-4 py-2 bg-red-500 text-white rounded-lg">-</button>
        <button onClick={() => setCount(c => c + 1)} className="px-4 py-2 bg-green-500 text-white rounded-lg">+</button>
      </div>
    </div>
  );
}`,
    },
    {
      lang: "tsx",
      label: "React Todo List",
      code: `import { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const add = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, input]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <div className="flex gap-2 mb-4">
        <input value={input} onChange={e => setInput(e.target.value)}
          className="flex-1 border rounded px-3 py-1 text-sm" placeholder="Add a task..." />
        <button onClick={add} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">Add</button>
      </div>
      <ul className="space-y-1">
        {todos.map((t, i) => <li key={i} className="text-sm px-3 py-1 bg-muted rounded">{t}</li>)}
      </ul>
    </div>
  );
}`,
    },
    {
      lang: "typescript",
      label: "TypeScript Generic Stack",
      code: `class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
console.log(stack.peek()); // 2
console.log(stack.pop());  // 2`,
    },
    {
      lang: "python",
      label: "Python Fibonacci",
      code: `def fibonacci(n: int) -> list[int]:
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    if n == 1:
        return [0]
    
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq

result = fibonacci(10)
print(result)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    },
    {
      lang: "python",
      label: "Python Decorator",
      code: `import time
from functools import wraps

def timer(func):
    """A decorator that prints execution time."""
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1_000_000)`,
    },
    {
      lang: "javascript",
      label: "JavaScript Debounce",
      code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log("Searching for:", query);
  // fetch("/api/search?q=" + query)
}, 300);

// Usage
document.getElementById("search").addEventListener("input", e => {
  handleSearch(e.target.value);
});`,
    },
    {
      lang: "java",
      label: "Java Binary Search",
      code: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (arr[mid] == target) return mid;
            else if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
>>>>>>> Stashed changes
        }
      >
        <div className="w-full relative bg-neutral-50 dark:bg-[#0a0a0a] overflow-x-hidden overflow-y-visible" style={{ minHeight: '1000px' }}>
          <div className="absolute top-20 left-0 w-full flex flex-col items-center text-muted-foreground opacity-50 z-10">
            <span className="animate-bounce">↓ Scroll down to assemble the puzzle ↓</span>
          </div>
          <div className="w-full" style={{ marginTop: '100vh', paddingBottom: '100vh' }}>
            <PuzzleVideo scrollContainer={scrollRef} src="/videos/video.mp4" rows={4} cols={3} position="center" variant={variant} aspectRatio={aspectRatio} />
          </div>
        </div>
      </PreviewContainer>
    );
  },
  "context-menu": function ContextMenuPreview() {
    const [previewVariant, setPreviewVariant] = React.useState<any>("default");
    const [previewColor, setPreviewColor] = React.useState<any>("default");
    const [previewShape, setPreviewShape] = React.useState<ContextMenuShape>("default");
    const [previewSpacing, setPreviewSpacing] = React.useState<ContextMenuSpacing>("default");
    const [bookmarksChecked, setBookmarksChecked] = React.useState(true);
    const [urlsChecked, setUrlsChecked] = React.useState(false);
    const [person, setPerson] = React.useState("pedro");

    const variants = ["default", "elevated", "bordered", "minimal", "premium"] as const;
    const shapes = ["default", "square", "rounded", "sharp"] as const;
    const spacings = ["default", "2x", "4x", "6x", "8x"] as const;

    return (
      <PreviewContainer
        title="Context Menu"
        description="A right-click context menu with layout variants, color themes, shape, and spacing controls."
        variants={variants}
        activeVariant={previewVariant}
        onVariantChange={setPreviewVariant}
        colors={DEFAULT_COLORS}
        activeColor={previewColor}
        onColorChange={setPreviewColor}
        extraControls={
          <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[150px_1fr] items-start sm:items-center gap-4 w-full">
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Shape</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {shapes.map(s => (
                <button key={s} onClick={() => setPreviewShape(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewShape === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s}
                </button>
              ))}
            </div>
            <span className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-muted-foreground">Spacing</span>
            <div className="flex items-center flex-wrap gap-2 p-1.5 bg-muted/30 rounded-xl w-full">
              {spacings.map(s => (
                <button key={s} onClick={() => setPreviewSpacing(s)} className={cn("px-4 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all duration-300 whitespace-nowrap", previewSpacing === s ? "bg-background shadow-md shadow-black/5 text-foreground ring-1 ring-black/5 dark:ring-white/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/40")}>
                  {s === "2x" ? "2X" : s === "4x" ? "4X" : s === "6x" ? "6X" : s === "8x" ? "8X" : s}
                </button>
              ))}
            </div>
          </div>
        }
      >
        <div className="w-full flex items-center justify-center p-8 md:p-16">
          <ContextMenu variant={previewVariant} color={previewColor} shape={previewShape} spacing={previewSpacing}>
            <ContextMenuTrigger>
              <div className="w-80 h-48 border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center text-muted-foreground text-sm font-medium select-none bg-muted/5 hover:bg-muted/10 transition-colors cursor-context-menu">
                Right-click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem inset={false}>
                Back
                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset={false} disabled>
                Forward
                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem inset={false}>
                Reload
                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger inset={false}>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>Save Page As… <ContextMenuShortcut>⌘S</ContextMenuShortcut></ContextMenuItem>
                  <ContextMenuItem>Create Shortcut…</ContextMenuItem>
                  <ContextMenuItem>Name Window…</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuCheckboxItem checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
                Show Bookmarks Bar
                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
                Show Full URLs
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel inset={false}>People</ContextMenuLabel>
              <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
                <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </PreviewContainer>
    );
  },

  "project-deck": function ProjectDeckPreview() {
    const ProjectDeck = React.useMemo(() => dynamic(() => import('@/components/ui/project-deck'), { ssr: false }), []);
    
    const demoProjects = [
      {
        id: "01",
        title: "Neon Interface",
        category: "Web App",
        description: "A dark mode dashboard with vibrant neon accents and fluid animations.",
        url: "#",
        media: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
        type: "image" as const,
        tags: ["React", "Tailwind", "Framer Motion"],
        accent: "from-purple-500 to-fuchsia-500",
      },
      {
        id: "02",
        title: "Glacier System",
        category: "Design System",
        description: "A clean, frost-glass inspired component library for modern enterprise apps.",
        url: "#",
        media: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        type: "image" as const,
        tags: ["Next.js", "Radix UI", "CSS Modules"],
        accent: "from-blue-500 to-cyan-500",
      },
      {
        id: "03",
        title: "Volcanic Analytics",
        category: "Data Viz",
        description: "Real-time data visualization platform with fiery gradients and high contrast.",
        url: "#",
        media: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        type: "image" as const,
        tags: ["D3.js", "WebGL", "TypeScript"],
        accent: "from-orange-500 to-red-500",
      }
    ];

    return (
      <PreviewContainer title="Project Deck" description="A 3D stacked deck of project cards with hover fan-out and flip animation." isVirtualScreen={true} contentClassName="p-0 border-none bg-[#09090b]">
        <div className="w-full relative flex flex-col">
          <ProjectDeck projects={demoProjects} />
        </div>
      </PreviewContainer>
    );
  },
};
