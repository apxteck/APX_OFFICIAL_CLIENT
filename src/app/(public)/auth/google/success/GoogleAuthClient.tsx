'use client';

import { useGoogleAuthLogic } from './hooks/useGoogleAuthLogic';

export default function GoogleAuthClient() {
  useGoogleAuthLogic();

  // This is a logical component, it relies on the Server Component to render the UI
  return null;
}
