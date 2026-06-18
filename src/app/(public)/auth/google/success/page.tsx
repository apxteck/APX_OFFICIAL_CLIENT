import { Metadata } from 'next';
import { Loader } from 'lucide-react';
import GoogleAuthClient from './GoogleAuthClient';

// 1. Extreme Technical SEO & Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Google Authentication Success | APXTeck',
    description:
      'Successfully authenticated with Google. We are securely setting up your session and redirecting you to your personalized APXTeck web development dashboard.',
    robots: {
      index: false, // We do not index auth redirect pages
      follow: false,
    },
    alternates: {
      canonical: 'https://apxteck.com/auth/google/success',
      languages: {
        'en-US': 'https://apxteck.com/auth/google/success',
        'en-IN': 'https://apxteck.com/en-in/auth/google/success',
      },
    },
    openGraph: {
      title: 'Google Authentication Success | APXTeck',
      description:
        'Successfully authenticated with Google. We are securely setting up your session and redirecting you to your personalized APXTeck web development dashboard.',
      url: 'https://apxteck.com/auth/google/success',
      siteName: 'APXTeck',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: 'https://apxteck.com/og-google-auth.jpg',
          width: 1200,
          height: 630,
          alt: 'APXTeck Google Authentication Success',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Google Authentication Success | APXTeck',
      description:
        'Successfully authenticated with Google. We are securely setting up your session and redirecting you to your personalized APXTeck web development dashboard.',
      creator: '@apxteck',
      site: '@apxteck',
      images: ['https://apxteck.com/twitter-google-auth.jpg'],
    },
  };
}

// 2. Modular Architecture & Blazing Fast Rendering (Server Component Default)
export default function GoogleAuthSuccessPage() {
  // Inject accurate JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Google Authentication Success - APXTeck Secure Login',
    description:
      'Authentication redirect page for APXTeck. Securely processing your Google login to access premium IT and web development services.',
    url: 'https://apxteck.com/auth/google/success',
    publisher: {
      '@type': 'Organization',
      name: 'APXTeck',
      logo: 'https://apxteck.com/logo.png',
      url: 'https://apxteck.com',
    },
    isPartOf: { '@id': 'https://apxteck.com/#website' },
  };

  return (
    // Semantic HTML5: <main>
    <main
      className="flex flex-col min-h-dvh w-full overflow-x-hidden items-center justify-center bg-background text-foreground pt-safe pb-safe"
      role="main"
      aria-label="Google Authentication Success"
    >
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic HTML5: <article> for the independent piece of UI */}
      <article
        className="flex flex-col items-center gap-4 md:gap-6 p-6 sm:p-8 rounded-[2rem] glass-panel border border-glass-border shadow-lg md:shadow-xl max-w-sm text-center w-full mx-4"
        itemScope
        itemType="https://schema.org/WebPage"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-2">
          <Loader
            className="w-8 h-8 text-accent animate-spin"
            aria-hidden="true"
            role="presentation"
          />
        </div>

        {/* Proper heading hierarchy (H1) */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">Authenticating</h1>
          <p className="text-foreground/60 text-sm leading-relaxed">
            Google authentication successful! We're securely setting up your session and redirecting
            you to your dashboard...
          </p>
        </header>
      </article>

      {/* Logical Client Component extracted to minimize client bundle */}
      <GoogleAuthClient />
    </main>
  );
}
