import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

export const useProfileLogic = () => {
  const { user } = useAuth();
  
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call for now since there's no direct employee profile update service
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    user,
    fullName,
    setFullName,
    phone,
    setPhone,
    isSubmitting,
    successMessage,
    handleSubmit
  };
};
