import { useState } from "react";
import { useRouter } from "next/navigation";
import { rolesService } from "@/services/admin/roles.service";

export const useCreateRoleLogic = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name") {
      setFormData(prev => ({ ...prev, [name]: value.toUpperCase().replace(/\s+/g, '_') }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.name) {
      setError("Role name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      await rolesService.createRole(formData);
      router.push("/admin/roles");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create role");
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    formData,
    error,
    handleChange,
    handleSubmit,
  };
};
