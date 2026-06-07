import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { BlogPreviewSection } from '@/components/sections/BlogPreviewSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { AdBanner } from '@/components/ui/AdBanner';
import { TechStackMarquee } from '@/components/sections/TechStackMarquee';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { MouseSpotlight } from '@/components/ui/MouseSpotlight';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { ScrollProgress } from '@/components/ui/ScrollProgress';

// Config page for Incremental Static Regeneration (ISR)
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'APXTECK — IT Services for Indian SMBs',
  description:
    'APXTeck provides premium IT services, Next.js web development, custom UI/UX, and search engine optimization custom tailored to scale Indian SMBs.',
  openGraph: {
    title: 'APXTECK — IT Services for Indian SMBs',
    description:
      'APXTeck provides premium IT services, Next.js web development, custom UI/UX, and search engine optimization custom tailored to scale Indian SMBs.',
    url: 'https://apxteck.com',
    siteName: 'APXTeck',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'APXTECK - IT Services for Indian SMBs',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://apxteck.com',
  },
};

export default function Home() {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'APXTeck',
    url: 'https://apxteck.com',
    logo: 'https://apxteck.com/APXTeck.png',
    sameAs: ['https://twitter.com/apxteck', 'https://linkedin.com/company/apxteck'],
  };

  const jsonLdLocalBiz = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'APXTeck',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3',
    telephone: '+919405282582',
    email: 'info@apxteck.com',
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Flat No. 24, 3rd Floor, Balaji Residency Dighe, Manaji Nagar, Narhe',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411041',
      addressCountry: 'IN',
    },
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <MouseSpotlight />
      <FloatingWhatsApp phoneNumber="919405282582" />

      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBiz) }}
      />

      <Navbar />

      <main className="flex-1">
        <HeroSection />

        <TechStackMarquee />

        <ServicesSection />

        <WhyChooseUsSection />

        <ProcessSection />

        <StatsSection />

        {/* Ad Placement Top */}
        <AdBanner placement="BLOG_LIST_TOP" />

        <PortfolioSection />

        <TestimonialsSection />

        {/* Ad Placement Mid */}
        <AdBanner placement="BLOG_LIST_MID" />

        <BlogPreviewSection />

        <FaqSection />

        <ContactCTASection />
      </main>

      <Footer />
    </div>
  );
}
