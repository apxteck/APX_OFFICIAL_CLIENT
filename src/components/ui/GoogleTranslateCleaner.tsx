'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function GoogleTranslateCleaner() {
  const pathname = usePathname();

  useEffect(() => {
    // If the user navigates away from insights-news, we strictly remove the translation cookie
    if (pathname && !pathname.startsWith('/insights-news')) {
      const hasGoogtrans = document.cookie.includes('googtrans=');
      if (hasGoogtrans) {
        // Delete all variations of googtrans cookie
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${window.location.hostname}; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
        // Force reload to apply original language
        window.location.reload();
      }
    }
  }, [pathname]);

  // Global CSS nuke for the Google Translate top bar across the entire application
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .goog-te-banner-frame { display: none !important; visibility: hidden !important; }
      .goog-te-banner-frame.skiptranslate { display: none !important; }
      iframe.goog-te-banner-frame { display: none !important; }
      body { top: 0px !important; margin-top: 0px !important; }
      html { top: 0px !important; margin-top: 0px !important; }
      #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
      .VIpgJd-ZVi9od-l4eHX-hSRGPd { display: none !important; }
      body > .skiptranslate:not(.language-switcher-container) { display: none !important; }
      .goog-tooltip { display: none !important; }
      .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
    `}} />
  );
}
