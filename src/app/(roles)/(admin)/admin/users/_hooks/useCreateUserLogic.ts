import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usersService, Role } from "@/services/admin/users.service";
import { rolesService } from "@/services/admin/roles.service";

export const useCreateUserLogic = (initialRoles: Role[]) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<Role[]>(initialRoles);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    roleId: "",
    isActive: true,
    address: "",
    city: "",
    state: "",
    pincode: "",
    dateOfBirth: "",
    employeeId: "",
    department: "",
    designation: "",
    joiningDate: "",
    bankAccountName: "",
    bankAccountNumber: "",
    bankIfscCode: "",
    bankName: "",
    upiId: "",
  });

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [newRoleData, setNewRoleData] = useState({ name: "", description: "" });
  const [isCreatingRole, setIsCreatingRole] = useState(false);

  useEffect(() => {
    if (roles.length > 0 && !formData.roleId) {
      setFormData((prev) => ({ ...prev, roleId: String(roles[0].id) }));
    }
  }, [roles, formData.roleId]);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingRole(true);
    try {
      const formattedName = newRoleData.name.toUpperCase().replace(/\s+/g, '_');
      await rolesService.createRole({ 
        name: formattedName, 
        description: newRoleData.description 
      });
      
      const updatedRoles = await usersService.getRoles();
      setRoles(updatedRoles);
      
      const newlyAdded = updatedRoles.find(r => r.name === formattedName);
      if (newlyAdded) {
        setFormData(prev => ({ ...prev, roleId: String(newlyAdded.id) }));
      }
      
      setIsRoleModalOpen(false);
      setNewRoleData({ name: "", description: "" });
    } catch (error: any) {
      alert(error?.response?.data?.message || error.message || "Failed to create role");
    } finally {
      setIsCreatingRole(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await usersService.createUser({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password || undefined,
        roleId: formData.roleId ? parseInt(formData.roleId) : undefined,
        isActive: formData.isActive,
        address: formData.address || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        pincode: formData.pincode || undefined,
        dateOfBirth: formData.dateOfBirth || undefined,
        employeeId: formData.employeeId || undefined,
        department: formData.department || undefined,
        designation: formData.designation || undefined,
        joiningDate: formData.joiningDate || undefined,
        bankAccountName: formData.bankAccountName || undefined,
        bankAccountNumber: formData.bankAccountNumber || undefined,
        bankIfscCode: formData.bankIfscCode || undefined,
        bankName: formData.bankName || undefined,
        upiId: formData.upiId || undefined,
      });
      router.push("/admin/users");
      router.refresh();
    } catch (error: any) {
      console.error("Failed to create user", error);
      alert(error?.response?.data?.message || "Failed to create user. Please check the inputs and try again.");
      setIsSubmitting(false);
    }
  };

  const selectedRole = roles.find((r) => r.id === Number(formData.roleId));
  const isEmployee = selectedRole && selectedRole.name !== "CUSTOMER";

  return {
    router,
    formData,
    roles,
    isSubmitting,
    isRoleModalOpen,
    setIsRoleModalOpen,
    newRoleData,
    setNewRoleData,
    isCreatingRole,
    handleCreateRole,
    handleInputChange,
    handleSubmit,
    isEmployee,
  };
};
