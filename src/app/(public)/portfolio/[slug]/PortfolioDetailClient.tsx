'use client';

import { Portfolio } from '@/app/types/portfolio.types';
import { PortfolioDetailHeader } from './components/PortfolioDetailHeader';
import { PortfolioDetailContent } from './components/PortfolioDetailContent';
import { PortfolioDetailResults } from './components/PortfolioDetailResults';
import { PortfolioDetailGallery } from './components/PortfolioDetailGallery';

interface Props {
  project: Portfolio;
}

export function PortfolioDetailClient({ project }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12 w-full overflow-x-hidden">
      <PortfolioDetailHeader project={project} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
        <PortfolioDetailContent project={project} />
        <PortfolioDetailResults project={project} />
      </div>

      <PortfolioDetailGallery project={project} />
    </section>
  );
}
