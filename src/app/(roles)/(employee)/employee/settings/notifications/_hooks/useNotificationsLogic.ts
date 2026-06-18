import { useState } from 'react';

export const useNotificationsLogic = () => {
  const [preferences, setPreferences] = useState({
    emailTasks: true,
    emailUpdates: false,
    emailMarketing: false,
    pushTasks: true,
    pushMentions: true,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const togglePref = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccessMessage("Preferences saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to save preferences", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    preferences,
    togglePref,
    isSubmitting,
    successMessage,
    handleSave
  };
};
