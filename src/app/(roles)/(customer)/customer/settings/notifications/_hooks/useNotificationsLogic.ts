import { useState } from 'react';

export const useNotificationsLogic = () => {
  const [preferences, setPreferences] = useState({
    emailInvoices: true,
    emailServiceUpdates: true,
    emailMarketing: false,
    pushAlerts: true,
    pushReminders: true,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setMessage({ type: 'success', text: 'Preferences saved successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save preferences.' });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    preferences,
    togglePref,
    handleSave,
    isSaving,
    message
  };
};
