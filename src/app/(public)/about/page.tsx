import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StatsSection } from '@/components/sections/StatsSection';
import { TeamSection } from '@/components/sections/TeamSection';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About APXTECK — Our Story & Team',
  description:
    "Learn about APXTeck's background, founding mission, core values, and our elite team of software engineers, designers, and SEO specialists.",
  openGraph: {
    title: 'About APXTECK — Our Story & Team',
    description:
      "Learn about APXTeck's background, founding mission, core values, and our elite team of software engineers, designers, and SEO specialists.",
    url: 'https://apxteck.com/about',
    siteName: 'APXTeck',
    type: 'website',
  },
};

export default function AboutPage() {
  const jsonLdAbout = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About APXTeck',
    description:
      'Learn about APXTeck - Our founding story, mission, core values, and our team of IT professionals.',
    url: 'https://apxteck.com/about',
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdAbout) }}
      />

      <Navbar />

      {/* 
        All animated content and static structural layout is handled by the AboutClient component.
        This allows us to keep 'use client' logic separated from this Server Component, 
        preserving the SEO metadata exports and jsonLd.
      */}
      <AboutClient />

      {/* Dynamic Sections (API Fetched) */}
      <TeamSection />
      <StatsSection />

      <Footer />
    </div>
  );
}
