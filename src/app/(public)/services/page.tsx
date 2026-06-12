import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';
import { AdBanner } from '@/components/ui/AdBanner';
import { api } from '@/lib/axios';
import { Service } from '@/app/types/service.types';

const ServicesClient = dynamic(() => import('./ServicesClient').then(mod => mod.ServicesClient), { ssr: true });
const ServicesListingSection = dynamic(() => import('@/components/sections/ServicesListingSection').then(mod => mod.ServicesListingSection), { ssr: true });
const TechStackMarquee = dynamic(() => import('@/components/sections/TechStackMarquee').then(mod => mod.TechStackMarquee), { ssr: true });

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const title = 'IT Services for SMBs — APXTECK';
  const description =
    "Browse APXTeck's premium IT services: Next.js Web Development, UI/UX Design, SEO Optimization, and Digital Marketing tailored to scale Indian SMBs.";
  const url = 'https://apxteck.com/services';

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'APXTeck',
      type: 'website',
      locale: 'en_IN',
      images: [
        {
          url: 'https://apxteck.com/og-services.png',
          width: 1200,
          height: 630,
          alt: 'APXTeck IT Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://apxteck.com/og-services.png'],
    },
  };
}

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
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://apxteck.com/services/#webpage',
        url: 'https://apxteck.com/services',
        name: 'IT Services for SMBs — APXTECK',
        description:
          "Browse APXTeck's premium IT services: Next.js Web Development, UI/UX Design, SEO Optimization, and Digital Marketing tailored to scale Indian SMBs.",
        inLanguage: 'en-IN',
        isPartOf: {
          '@id': 'https://apxteck.com/#website',
        },
      },
      {
        '@type': 'ItemList',
        itemListElement: services.map((s, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: s.name,
            description: s.description,
            provider: {
              '@type': 'Organization',
              name: 'APXTeck',
              url: 'https://apxteck.com',
              logo: 'https://apxteck.com/logo.png',
            },
            url: `https://apxteck.com/services/${s.slug}`,
            offers: s.price
              ? {
                  '@type': 'Offer',
                  price: s.price.replace(/[^0-9]/g, ''),
                  priceCurrency: 'INR',
                }
              : undefined,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://apxteck.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: 'https://apxteck.com/services/',
          },
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdServiceSchema) }}
      />

      <Navbar />

      <main className="flex-1 pt-24 pb-20 overflow-hidden" role="main" aria-label="Main Services Content" itemScope itemType="https://schema.org/WebPage">
        
        {/* Animated Hero and Advantage section (Client component) */}
        <ServicesClient />

        <div className="max-w-7xl mx-auto px-6 mb-8 text-center" aria-hidden="true">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-glass-border to-transparent" />
        </div>

        {/* Ad Slot Top (above listing grid) */}
        <section aria-label="Advertisement" className="w-full">
          <AdBanner placement="BLOG_LIST_TOP" />
        </section>

        {/* Dynamic Service Grid Section (Client component but data passed from server) */}
        <ServicesListingSection initialServices={services} />

        {/* Tech Stack Marquee at the bottom */}
        <section aria-label="Technologies we use" className="mt-20">
          <TechStackMarquee />
        </section>
      </main>

      <Footer />
    </div>
  );
}
