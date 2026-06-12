import { useEffect } from "react";
import { useRolesStore } from "../_store/useRolesStore";
import { rolesService, Role } from "@/services/admin/roles.service";

export const useRolesLogic = () => {
  const store = useRolesStore();

  const fetchRoles = async () => {
    store.setIsLoading(true);
    try {
      const result = await rolesService.getRoles();
      store.setRoles(result);
    } catch (error) {
      console.error("Failed to load roles", error);
    } finally {
      store.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenModal = (mode: "CREATE" | "EDIT", role?: Role) => {
    store.setModalMode(mode);
    if (mode === "EDIT" && role) {
      store.setSelectedRole(role);
      store.setFormData({ name: role.name, description: role.description || "" });
    } else {
      store.setSelectedRole(null);
      store.setFormData({ name: "", description: "" });
    }
    store.setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    store.setIsModalOpen(false);
    store.setSelectedRole(null);
    store.setFormData({ name: "", description: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    store.setIsSubmitting(true);
    try {
      const formattedName = store.formData.name.toUpperCase().replace(/\s+/g, '_');
      if (store.modalMode === "CREATE") {
        await rolesService.createRole({ name: formattedName, description: store.formData.description });
      } else if (store.modalMode === "EDIT" && store.selectedRole) {
        await rolesService.updateRole(store.selectedRole.id, { name: formattedName, description: store.formData.description });
      }
      handleCloseModal();
      fetchRoles();
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message || "Failed to save role");
    } finally {
      store.setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${name}"? This cannot be undone.`)) {
      try {
        await rolesService.deleteRole(id);
        fetchRoles();
      } catch (error: any) {
        alert(error?.response?.data?.message || error.message || "Failed to delete role");
      }
    }
  };

  return {
    ...store,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
  };
};
