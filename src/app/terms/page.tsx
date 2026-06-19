"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Scale, FileText, AlertCircle, Sparkles } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="w-full relative selection:bg-primary/30 min-h-screen pb-24">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-secondary/10 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full opacity-40"></div>
      </div>

      <div className="max-w-[800px] mx-auto px-6 pt-32 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl glass-mantle text-primary mb-6 ring-1 ring-white/10 shadow-2xl">
            <Scale size={32} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-foreground">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Simple, developer-friendly terms designed to let you build without limits or unnecessary restrictions.
          </p>
        </div>

        <div className="space-y-8">
          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <FileText size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">License & Usage</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                <strong>Future UI</strong> is free and open-source. You are granted permission to use the components in any personal, commercial, or enterprise projects without needing to provide attribution (though it is always appreciated).
              </p>
              <p>
                You may modify, distribute, and build upon the components as you see fit. However, you may not repackage the library as your own competing UI library or component marketplace.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <AlertCircle size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">Liability & Warranty</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                The components are provided &quot;as is&quot;, without warranty of any kind, express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from, out of, or in connection with the software or the use or other dealings in the software.
              </p>
              <p>
                It is your responsibility to ensure that the components meet your project&apos;s technical and accessibility requirements before deploying to production.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <Sparkles size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">Community Guidelines</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                When participating in the Future UI community (such as GitHub discussions, issues, or Discord), you agree to treat others with respect and maintain a welcoming environment for developers of all skill levels.
              </p>
              <p className="pt-4 text-sm opacity-70">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
