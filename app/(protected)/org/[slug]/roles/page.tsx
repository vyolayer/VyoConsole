"use client";

import { OrganizationRoles } from "@/features/org/components/OrganizationRoles";
import { useOrganizationRoles } from "@/features/org/hooks/useRoles";

const OrganizationRolesPage = () => {
    const { roles, isLoading, isError, error } = useOrganizationRoles();

    return (
        <OrganizationRoles isLoading={isLoading} isError={isError} error={error} roles={roles} />
    );
};

export default OrganizationRolesPage;
