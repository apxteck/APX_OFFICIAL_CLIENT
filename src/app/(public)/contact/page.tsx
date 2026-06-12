import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactPageSection } from '@/components/sections/ContactPageSection';
import { api } from '@/lib/axios';
import { Service } from '@/app/types/service.types';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Contact APXTECK — Get in Touch with Our Tech Experts',
    description:
      'Contact APXTeck for custom software, web design, mobile apps, and search engine optimization. Get a free consultation and a detailed project roadmap.',
    keywords: 'contact APXTeck, software development consultation, hire developers Pune, web design agency contact',
    alternates: {
      canonical: 'https://apxteck.com/contact',
    },
    openGraph: {
      title: 'Contact APXTECK — Get in Touch',
      description:
        'Contact APXTeck for custom software, web design, mobile apps, and search engine optimization. Get a free consultation and project roadmap.',
      url: 'https://apxteck.com/contact',
      siteName: 'APXTeck',
      type: 'website',
      images: [
        {
          url: 'https://apxteck.com/og-contact.jpg', // Placeholder for actual OG image
          width: 1200,
          height: 630,
          alt: 'APXTeck Contact Us',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Contact APXTECK',
      description: 'Get in touch with APXTeck for premium software development and SEO consultancies.',
    },
  };
}

export default async function ContactPage() {
  let services: Service[] = [];
  try {
    services = await api.fetchServices();
  } catch (err) {
    console.error('Failed to load services for contact page', err);
  }

  const jsonLdLocalBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'APXTeck',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3',
    telephone: '+919405282582',
    email: 'info@apxteck.com',
    url: 'https://apxteck.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Flat No. 24, 3rd Floor, Balaji Residency Dighe, Manaji Nagar, Narhe',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411041',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '18.442938', // Placeholder coordinates, update if precise values are known
      longitude: '73.821424',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };

  const jsonLdContactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact APXTeck',
    description: 'Get in touch with APXTeck for premium software development and SEO consultancies.',
    url: 'https://apxteck.com/contact',
    mainEntity: {
      '@id': 'https://apxteck.com/#organization',
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://apxteck.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact',
        item: 'https://apxteck.com/contact',
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContactPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Navbar />

      <main className="flex-1 pt-24" id="main-content" role="main">
        <article itemScope itemType="https://schema.org/ContactPage">
          <ContactPageSection services={services} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
