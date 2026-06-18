import { Service } from '@/app/types/service.types';

export const getServiceJsonLd = (service: Service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `https://apxteck.com/services/${service.slug}/#service`,
    name: service.name,
    description: service.description,
    url: `https://apxteck.com/services/${service.slug}`,
    isPartOf: {
      '@id': 'https://apxteck.com/#website',
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://apxteck.com/#localbusiness',
      name: 'APXTeck',
      telephone: '+919405282582',
      image: 'https://apxteck.com/logo.png',
    },
    offers: service.price
      ? {
          '@type': 'Offer',
          price: service.price.replace(/[^0-9]/g, ''),
          priceCurrency: 'INR',
          url: `https://apxteck.com/services/${service.slug}`,
        }
      : undefined,
  };
};

export const getServiceDeliverables = (slug: string) => {
  switch (slug) {
    case 'web-development':
      return [
        'Custom Next.js App Router Setup',
        'Prisma ORM & PostgreSQL Database schemas',
        'Responsive, modern glassmorphic interface UI',
        'Full SEO Structured Data (JSON-LD) configuration',
        'Admin Dashboard control panels integration',
        'Turbopack compiling optimizations',
      ];
    case 'seo-optimization':
      return [
        'Complete technical and code-level SEO auditing',
        'Detailed competitor keywords research',
        'On-page meta tags and semantic HTML structuring',
        'Google Search Console & Analytics integration',
        'Schema micro-data implementations',
        'Quality link profile generation roadmap',
      ];
    case 'ui-ux-design':
      return [
        'High-fidelity responsive UI designs (Figma)',
        'Premium color palettes & typography pairing',
        'Micro-animations & transitions mockups',
        'User persona mapping & card sorting surveys',
        'Interactive desktop & mobile prototypes',
        'Full developer handoff assets library',
      ];
    default:
      return [
        'Target client audience scoping',
        'Modern system architecture planning',
        'Responsive stylesheet setups',
        'Secure APIs & connection routers',
        'Performance and speed testing audits',
        '24/7 post-launch maintenance logs',
      ];
  }
};

export const processSteps = [
  { step: '01', title: 'Discovery', desc: 'Aligning on goals, scope, inputs, and budget.' },
  {
    step: '02',
    title: 'Engineering & Design',
    desc: 'Creating visual prototypes and writing modular code.',
  },
  {
    step: '03',
    title: 'Deploy & Scale',
    desc: 'Conducting speed optimizations and launching public services.',
  },
];
