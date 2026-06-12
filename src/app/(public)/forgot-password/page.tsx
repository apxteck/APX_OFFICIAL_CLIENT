import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const ForgotPasswordForm = dynamic(() => import('./ForgotPasswordForm'), { ssr: true });

// Extreme Technical SEO & Dynamic Metadata Generation
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Forgot Password | APXTeck',
    description: 'Reset your APXTeck account password securely.',
    alternates: {
      canonical: 'https://apxteck.com/forgot-password',
    },
    openGraph: {
      title: 'Forgot Password | APXTeck',
      description: 'Reset your APXTeck account password securely.',
      url: 'https://apxteck.com/forgot-password',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Forgot Password | APXTeck',
      description: 'Reset your APXTeck account password securely.',
    },
  };
}

export default function ForgotPasswordPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Forgot Password | APXTeck",
    "description": "Reset your APXTeck account password securely.",
    "url": "https://apxteck.com/forgot-password",
    "mainEntity": {
      "@type": "Action",
      "name": "Reset Password",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://apxteck.com/forgot-password",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden pt-28 pb-16" role="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" aria-hidden="true" />
        
        <div itemScope itemType="https://schema.org/WebPage" className="w-full max-w-md z-10 flex flex-col items-center">
          <ForgotPasswordForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
