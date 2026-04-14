import { useOrganizations } from "@org/hooks/useOrganizations";

export const useDashboard = () => {
    const { data, isLoading } = useOrganizations();

    return {
        isLoading,
        organizations: data?.organizations,
    };
};
