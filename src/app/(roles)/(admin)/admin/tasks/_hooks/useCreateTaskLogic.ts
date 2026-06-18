import { useState } from "react";
import { useRouter } from "next/navigation";
import { tasksService, Priority } from "@/services/admin/tasks.service";

export const useCreateTaskLogic = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedToId: "",
    priority: "MEDIUM" as Priority,
    dueDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.assignedToId) {
      setError("Title and Assignee are required.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError("");
      
      const payload: any = {
        title: formData.title,
        assignedToId: formData.assignedToId,
        priority: formData.priority,
      };
      
      if (formData.description) payload.description = formData.description;
      if (formData.dueDate) payload.dueDate = new Date(formData.dueDate).toISOString();

      await tasksService.createTask(payload);
      router.push('/admin/tasks');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Failed to create task");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => router.back();

  return {
    formData,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    handleCancel,
  };
};
