import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { api } from '@/lib/axios';
import { Portfolio } from '@/app/types/portfolio.types';

// Dynamically import the heavy client component
const PortfolioDetailClient = dynamic(
  () => import('@/components/sections/PortfolioDetailClient').then((mod) => mod.PortfolioDetailClient),
  { ssr: true }
);

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const portfolios = await api.fetchPortfolios();
    return portfolios.map((p) => ({ slug: p.slug }));
  } catch {
    return [{ slug: 'style-store' }, { slug: 'coin-flow' }, { slug: 'neuro-sync' }];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await api.fetchPortfolioBySlug(slug);
    if (!project) return { title: 'Case Study Not Found | APXTECK' };

    const title = `${project.clientName} Case Study | APXTECK`;
    const description = project.problem || `Read the detailed case study of our project with ${project.clientName}.`;
    const url = `https://apxteck.com/portfolio/${slug}`;
    const imageUrl = project.coverImageUrl || 'https://apxteck.com/images/og/portfolio-detail.jpg';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        siteName: 'APXTeck',
        type: 'article',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: `${project.clientName} Case Study` }],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@apxteck',
        title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: 'Case Study Details | APXTeck',
    };
  }
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Portfolio | null = null;
  try {
    project = await api.fetchPortfolioBySlug(slug);
  } catch (err) {
    console.error('Failed to load server portfolio by slug', err);
  }

  if (!project) {
    notFound();
  }

  // Schema Generation: Article
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${project.clientName} Case Study - ${project.title}`,
    description: project.problem || project.results,
    image: project.coverImageUrl,
    author: {
      '@type': 'Organization',
      name: 'APXTeck',
      url: 'https://apxteck.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'APXTeck',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apxteck.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://apxteck.com/portfolio/${slug}`
    }
  };

  // Schema Generation: BreadcrumbList
  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
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
        name: 'Portfolio',
        item: 'https://apxteck.com/portfolio',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.clientName || 'Case Study',
        item: `https://apxteck.com/portfolio/${slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-accent/30 bg-background text-foreground transition-colors duration-300">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <Navbar />

      <main className="flex-1 pt-24 pb-20">
        <article>
          <PortfolioDetailClient project={project} />
        </article>
      </main>

      <Footer />
    </div>
  );
}
