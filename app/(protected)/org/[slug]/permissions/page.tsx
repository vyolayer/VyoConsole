"use client";

import { OrganizationPermissions } from "@/features/org/components/OrganizationPermissions";
import { useOrganizationPermissions } from "@/features/org/hooks/usePermissions";

const OrganizationPermissionsPage = () => {
    const { permissions, isLoading, isError, error } = useOrganizationPermissions();

    return (
        <OrganizationPermissions
            isLoading={isLoading}
            isError={isError}
            error={error}
            permissions={permissions}
        />
    );
};

export default OrganizationPermissionsPage;
