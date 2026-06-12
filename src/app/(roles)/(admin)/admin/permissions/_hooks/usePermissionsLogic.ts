import { useEffect } from "react";
import { usePermissionsStore } from "../_store/usePermissionsStore";
import { rolesService, PermRow } from "@/services/admin/roles.service";

export const usePermissionsLogic = () => {
  const store = usePermissionsStore();

  useEffect(() => {
    const fetchRoles = async () => {
      store.setIsLoadingRoles(true);
      const rolesData = await rolesService.getRoles();
      store.setRoles(rolesData || []);
      store.setIsLoadingRoles(false);
    };
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (!store.selectedRoleId) {
        store.setPermissions([]);
        return;
      }
      store.setIsLoadingPerms(true);
      const response = await rolesService.getRolePermissions(Number(store.selectedRoleId));
      if (response && response.permissions) {
        store.setPermissions(response.permissions);
      } else {
        store.setPermissions([]);
      }
      store.setIsLoadingPerms(false);
    };
    
    fetchPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.selectedRoleId]);

  const handleToggle = (moduleName: string, field: keyof PermRow) => {
    store.setPermissions(prev => prev.map(p => {
      if (p.module === moduleName) {
        return { ...p, [field]: !p[field] };
      }
      return p;
    }));
  };

  const handleSave = async () => {
    if (!store.selectedRoleId) return;
    store.setIsSaving(true);
    try {
      await rolesService.updateRolePermissions(Number(store.selectedRoleId), store.permissions);
      alert("Permissions saved successfully!");
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message || "Failed to save permissions");
    } finally {
      store.setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!store.selectedRoleId) return;
    if (window.confirm("Are you sure you want to reset all permissions for this role? They will be wiped completely.")) {
      store.setIsResetting(true);
      try {
        await rolesService.resetRolePermissions(Number(store.selectedRoleId));
        const response = await rolesService.getRolePermissions(Number(store.selectedRoleId));
        if (response && response.permissions) {
          store.setPermissions(response.permissions);
        }
        alert("Permissions have been reset.");
      } catch (error: any) {
        alert(error?.response?.data?.message || error.message || "Failed to reset permissions");
      } finally {
        store.setIsResetting(false);
      }
    }
  };

  return {
    ...store,
    handleToggle,
    handleSave,
    handleReset,
  };
};
