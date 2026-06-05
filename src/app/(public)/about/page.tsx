import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsSection } from "@/components/sections/StatsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { Target, Eye, ShieldAlert, Award, Star, Zap } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About APXTECK — Our Story & Team",
  description: "Learn about APXTeck's background, founding mission, core values, and our elite team of software engineers, designers, and SEO specialists.",
  openGraph: {
    title: "About APXTECK — Our Story & Team",
    description: "Learn about APXTeck's background, founding mission, core values, and our elite team of software engineers, designers, and SEO specialists.",
    url: "https://apxteck.com/about",
    siteName: "APXTeck",
    type: "website",
  },
};

const coreValues = [
  {
    title: "Extreme Precision",
    description: "We pay attention to every pixel, line of code, and hover micro-animation to deliver premium products.",
    icon: Zap,
    color: "#0ea5e9"
  },
  {
    title: "SMB First",
    description: "Enterprise tech frameworks scaled down and optimized for growing Indian businesses.",
    icon: Award,
    color: "#a855f7"
  },
  {
    title: "Radical Transparency",
    description: "Clear timelines, open dashboard task updates, and direct developer communication channels.",
    icon: Target,
    color: "#10b981"
  },
  {
    title: "Continuous Innovation",
    description: "Constantly upgrading our toolset with Next.js ISR, Turbopack, and clean Prisma schemas.",
    icon: Star,
    color: "#ec4899"
  }
];

export default function AboutPage() {
  const jsonLdAbout = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About APXTeck",
    "description": "Learn about APXTeck - Our founding story, mission, core values, and our team of IT professionals.",
    "url": "https://apxteck.com/about"
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />

      <Navbar />

      <main className="flex-1 pt-24">
        {/* Page Hero */}
        <section className="relative py-24 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-cover bg-center -z-20 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background z-10" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-20 text-center space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-bold uppercase tracking-wider">
              Our Agency
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">About APXTeck</h1>
            <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl">
              We design and build next-generation web portals and automated systems, helping Indian SMBs achieve digital scale.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Story</h2>
              <p className="text-foreground/75 leading-relaxed text-base">
                Founded in 2026, APXTeck was established to bridge the gap between expensive global software consultancies and standard local web developers. We believed that growing Indian small and medium businesses deserved custom, secure, and beautiful products without paying massive enterprise licensing bills.
              </p>
              <p className="text-foreground/75 leading-relaxed text-base">
                We started as a lean engineering studio in Pune. Today, we work as strategic design and system partners for brands across the country, building Next.js web applications, customizing CRM leads systems, and executing data-driven SEO campaigns.
              </p>
            </div>
            <div className="lg:col-span-6">
              <GlassCard className="p-8 border border-glass-border shadow-xl">
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-accent">Our Mission</h3>
                <p className="text-foreground/70 leading-relaxed text-sm mb-6">
                  To democratize premium engineering and custom web development for growing businesses, making high-speed, secure, and beautiful visual experiences accessible to every Indian entrepreneur.
                </p>
                <div className="h-px bg-glass-border w-full my-6" />
                <h3 className="text-2xl font-bold tracking-tight mb-4 text-purple-400">Our Vision</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">
                  To become the leading digital engineering partner for SMBs in India, recognized for modern designs, modular codebases, and clear, transparent client relationships.
                </p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards (Two-column layout representation) */}
        <section className="py-16 bg-white/[0.01] border-y border-glass-border">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl bg-foreground/[0.01] border border-glass-border flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Purpose-Driven Design</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {"We don't build standard generic templates."} Every layout, route structure, and dynamic data query is mapped precisely to solve a concrete business goal.
                </p>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-foreground/[0.01] border border-glass-border flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold tracking-tight">Future-Proof Code</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  By employing TypeScript, Nest/Next.js frameworks, and clean Prisma schemas, we provide a code setup that is structured and easy to scale as your operations grow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Icon Grid */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Our Core Values</h2>
            <p className="text-foreground/60 max-w-xl mx-auto">
              These fundamental operating guidelines direct how we write code, design interfaces, and support our partners.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <GlassCard key={idx} className="hover:-translate-y-1 transition-transform" glowColor={val.color}>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4"
                    style={{ background: `linear-gradient(135deg, ${val.color}, rgba(0,0,0,0.15))` }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">{val.title}</h3>
                  <p className="text-foreground/70 text-xs leading-relaxed">{val.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </section>

        {/* Team Section (Custom dynamic team member list component) */}
        <TeamSection />

        {/* Shared Stats Counter */}
        <StatsSection />

        {/* Call to Action */}
        <section className="py-24 text-center max-w-4xl mx-auto px-6">
          <GlassCard className="p-10 md:p-16 border border-glass-border relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-purple-500/5 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Ready to Build Something Great?</h2>
            <p className="text-foreground/70 max-w-lg mx-auto mb-10 text-base">
              Share your business requirements and we will design a high-performance, modular solution tailored to your budget.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-accent hover:bg-accent/90 text-white px-8 text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-accent/20"
              >
                Get in Touch
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-full glass-panel border border-glass-border text-foreground px-8 text-sm font-semibold transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
              >
                Browse Services
              </Link>
            </div>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  );
}
