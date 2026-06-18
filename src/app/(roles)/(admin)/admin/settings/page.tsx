import React from 'react';
// Removed dynamic import
import { heroBannersService } from '@/services/admin/heroBanners.service';
import { HeroBanner } from '@/app/types/home.types';

import SettingsManager from './_components/SettingsManager';

export default async function SettingsPage() {
  let initialBanners: HeroBanner[] = [];
  try {
    const res = await heroBannersService.getBanners();
    initialBanners = res?.data || [];
  } catch (error) {
    console.error('Failed to fetch banners for settings:', error);
  }

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto pb-safe pb-12 px-4 sm:px-6 md:px-8">
      <SettingsManager initialBanners={initialBanners} />
    </div>
  );
}
