import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdBanner } from '@/components/ui/AdBanner';
import { ServicesListingSection } from '@/components/sections/ServicesListingSection';
import { TechStackMarquee } from '@/components/sections/TechStackMarquee';
import { api } from '@/lib/axios';
import { Service } from '@/app/types/service.types';
import { ServicesClient } from './ServicesClient';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'IT Services for SMBs — APXTECK',
  description:
    "Browse APXTeck's premium IT services: Next.js Web Development, UI/UX Design, SEO Optimization, and Digital Marketing tailored to scale Indian SMBs.",
  openGraph: {
    title: 'IT Services for SMBs — APXTECK',
    description:
      "Browse APXTeck's premium IT services: Next.js Web Development, UI/UX Design, SEO Optimization, and Digital Marketing tailored to scale Indian SMBs.",
    url: 'https://apxteck.com/services',
    siteName: 'APXTeck',
    type: 'website',
  },
};

// Next.js static slug path generator
export async function generateStaticParams() {
  try {
    const services = await api.fetchServices();
    return services.map((s) => ({ slug: s.slug }));
  } catch {
    return [
      { slug: 'web-development' },
      { slug: 'seo-optimization' },
      { slug: 'ui-ux-design' },
      { slug: 'digital-marketing' },
    ];
  }
}

export default async function ServicesListingPage() {
  // Fetch services serverside to inject structured service schema
  let services: Service[] = [];
  try {
    services = await api.fetchServices();
  } catch (err) {
    console.error('Failed to load services in server page', err);
  }

  const jsonLdServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: services.length,
    itemListElement: services.map((s, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: {
          '@type': 'LocalBusiness',
          name: 'APXTeck',
        },
        offers: s.price
          ? {
              '@type': 'Offer',
              price: s.price.replace(/[^0-9]/g, ''),
              priceCurrency: 'INR',
            }
          : undefined,
      },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServiceSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-24 pb-20 overflow-hidden">
        
        {/* Animated Hero and Advantage section (Client component) */}
        <ServicesClient />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>

        {/* Ad Slot Top (above listing grid) */}
        <AdBanner placement="BLOG_LIST_TOP" />

        {/* Dynamic Service Grid Section (Client component but data passed from server) */}
        <ServicesListingSection initialServices={services} />

        {/* Tech Stack Marquee at the bottom */}
        <div className="mt-20">
          <TechStackMarquee />
        </div>
      </main>

      <Footer />
    </div>
  );
}
