import { Metadata } from 'next';
import { Loader } from 'lucide-react';
import GoogleAuthClient from './GoogleAuthClient';

// 1. Extreme Technical SEO & Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Google Authentication Success | APXTeck',
    description: 'Successfully authenticated with Google. Redirecting to your dashboard...',
    robots: {
      index: false, // We do not index auth redirect pages
      follow: false,
    },
    alternates: {
      canonical: 'https://apxteck.com/auth/google/success',
    },
    openGraph: {
      title: 'Google Authentication Success | APXTeck',
      description: 'Successfully authenticated with Google. Redirecting to your dashboard...',
      url: 'https://apxteck.com/auth/google/success',
      siteName: 'APXTeck',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Google Authentication Success | APXTeck',
      description: 'Successfully authenticated with Google.',
    },
  };
}

// 2. Modular Architecture & Blazing Fast Rendering (Server Component Default)
export default function GoogleAuthSuccessPage() {
  // Inject accurate JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Google Authentication Success',
    description: 'Authentication redirect page for APXTeck.',
    url: 'https://apxteck.com/auth/google/success',
  };

  return (
    // Semantic HTML5: <main>
    <main 
      className="flex flex-col min-h-screen items-center justify-center bg-background text-foreground"
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
        className="flex flex-col items-center gap-6 p-8 rounded-3xl glass-panel border border-glass-border shadow-xl max-w-sm text-center w-full mx-4"
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
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Authenticating
          </h1>
          <p className="text-foreground/60 text-sm leading-relaxed">
            Google authentication successful! We're securely setting up your session and redirecting you to your dashboard...
          </p>
        </header>
      </article>

      {/* Logical Client Component extracted to minimize client bundle */}
      <GoogleAuthClient />
    </main>
  );
}
