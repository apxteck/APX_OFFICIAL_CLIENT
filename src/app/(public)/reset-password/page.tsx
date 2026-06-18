import { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import dynamic from 'next/dynamic';

const ResetPasswordClient = dynamic(() => import('./ResetPasswordClient'), { ssr: true });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Reset Password | APXTeck',
    description: 'Create a new password for your APXTeck account securely.',
    alternates: {
      canonical: 'https://apxteck.com/reset-password',
      languages: {
        'en-US': 'https://apxteck.com/reset-password',
        'en-IN': 'https://apxteck.com/en-in/reset-password',
      },
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title: 'Reset Password | APXTeck',
      description: 'Create a new password for your APXTeck account securely.',
      url: 'https://apxteck.com/reset-password',
      siteName: 'APXTeck',
      images: [
        {
          url: 'https://apxteck.com/images/og/reset-password.jpg',
          width: 1200,
          height: 630,
          alt: 'APXTeck Reset Password',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@apxteck',
      site: '@apxteck',
      title: 'Reset Password | APXTeck',
      description: 'Create a new password for your APXTeck account securely.',
      images: ['https://apxteck.com/images/og/reset-password.jpg'],
    },
  };
}

import { resetPasswordPageSchema } from './constants';

export default function ResetPasswordPage() {
  const jsonLd = resetPasswordPageSchema;

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground font-sans selection:bg-accent/20 selection:text-accent transition-colors duration-300 w-full overflow-x-hidden">
      <Navbar />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 relative overflow-x-hidden pt-safe pb-safe pt-24 sm:pt-28 pb-12 sm:pb-16 w-full" aria-labelledby="reset-password-heading" role="main">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
        </div>
        
        <div itemScope itemType="https://schema.org/WebPage" className="w-full max-w-md relative z-10 flex flex-col items-center">
          <ResetPasswordClient />
        </div>
      </main>

      <Footer />
    </div>
  );
}
