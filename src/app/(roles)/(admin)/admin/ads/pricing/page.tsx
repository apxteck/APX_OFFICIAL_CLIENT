import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { PricingManager } from './_components/PricingManager';
import { adsService } from '@/services/admin/ads.service';
import { AdPricingSlot } from '@/app/types/ad.types';

export const metadata: Metadata = {
  title: 'Ad Pricing Slots | APXTeck Admin',
  description: 'Configure advertisement pricing slots and packages.',
};

async function PricingDataFetcher() {
  let initialSlots: AdPricingSlot[] = [];
  try {
    const data = await adsService.getPricingSlots();
    initialSlots = data || [];
  } catch (error) {
    console.error('Failed to fetch initial pricing slots:', error);
  }
  return <PricingManager initialSlots={initialSlots} />;
}

export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <PricingDataFetcher />
    </Suspense>
  );
}
