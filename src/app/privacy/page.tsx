"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Shield, Lock, Eye, Database } from "lucide-react";

export default function PrivacyPage() {
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
            <Shield size={32} />
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            We believe in privacy by design. Transparency and security are at the core of everything we build.
          </p>
        </div>

        <div className="space-y-8">
          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <Lock size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">Data Collection</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                <strong>Future UI</strong> is a set of open-source components that you install into your own projects. We do not track you, we do not collect your personal data, and we do not monitor how you use the components.
              </p>
              <p>
                When you visit our website, we use basic, privacy-preserving analytics to understand general traffic patterns. This data is fully anonymized and cannot be traced back to any individual user.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <Eye size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">Third-Party Services</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                We do not sell, trade, or otherwise transfer your information to outside parties. Our website may link to third-party services (such as GitHub or Discord) which have their own independent privacy policies. We hold no responsibility or liability for the content and activities of these linked sites.
              </p>
            </div>
          </GlassPanel>

          <GlassPanel variant="heavy" className="p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5 relative z-10">
              <div className="p-3 rounded-xl glass-mantle text-primary border border-white/10">
                <Database size={24} />
              </div>
              <h2 className="font-display text-2xl font-light">Your Rights</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed relative z-10">
              <p>
                Because we do not collect your personal data, there is no data for us to delete or modify upon request. If you communicate with us via email or Discord, those platforms will govern the retention of those messages according to their respective policies.
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
