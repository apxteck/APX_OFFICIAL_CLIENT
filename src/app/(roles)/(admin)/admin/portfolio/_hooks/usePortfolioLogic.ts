import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePortfolioStore } from "../_store/usePortfolioStore";
import { portfolioService } from "@/services/admin/portfolio.service";

export const usePortfolioLogic = () => {
  const store = usePortfolioStore();
  const router = useRouter();

  const fetchPortfolios = async () => {
    try {
      store.setIsLoading(true);
      const data = await portfolioService.getAllPortfoliosAdmin({ limit: 100 });
      store.setPortfolios(data?.data || []);
    } catch (error) {
      store.setToast({ message: "Failed to fetch portfolios. Have you run 'npx prisma db push'?", type: "error" });
    } finally {
      store.setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this portfolio item? This action cannot be undone.")) {
      try {
        store.setToast({ message: "Deleting portfolio...", type: "loading" });
        await portfolioService.deletePortfolio(id);
        store.setToast({ message: "Portfolio deleted successfully", type: "success" });
        fetchPortfolios();
      } catch (error) {
        store.setToast({ message: "Failed to delete portfolio", type: "error" });
      }
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      store.setToast({ message: "Updating status...", type: "loading" });
      await portfolioService.togglePublish(id);
      store.setToast({ message: `Portfolio is now ${!currentStatus ? 'Published' : 'Draft'}`, type: "success" });
      fetchPortfolios();
    } catch (error) {
      store.setToast({ message: "Failed to update publish status", type: "error" });
    }
  };

  const navigateToCreate = () => router.push('/admin/portfolio/create');
  const navigateToEdit = (id: number) => router.push(`/admin/portfolio/${id}/edit`);
  const navigateToPublic = (slug: string) => router.push(`/portfolio/${slug}`);

  const filteredPortfolios = useMemo(() => {
    const term = store.searchTerm.toLowerCase();
    return store.portfolios.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.clientName.toLowerCase().includes(term) ||
      p.serviceType.toLowerCase().includes(term)
    );
  }, [store.portfolios, store.searchTerm]);

  return {
    ...store,
    filteredPortfolios,
    handleDelete,
    handleTogglePublish,
    navigateToCreate,
    navigateToEdit,
    navigateToPublic,
  };
};
