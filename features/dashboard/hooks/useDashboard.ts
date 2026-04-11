import { useOrganization } from "@/features/organization/hooks/useOrganizations";

export const useDashboard = () => {
    const { data, isLoading } = useOrganization();

    return {
        isLoading,
        organizations: data?.organizations,
    };
};
