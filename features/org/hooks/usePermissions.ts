import { rabcApi } from "../api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useCurrentOrganization } from "./useCurrentOrganization";

export const organizationPermissionsQueryOptions = (id: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.permissions(id),
    queryFn: () => rabcApi.listOfPermissions(id),
});

const useOrganizationPermissionsQueryFn = (id: string) => {
    return useSuspenseQuery(organizationPermissionsQueryOptions(id));
};

export const useOrganizationPermissions = () => {
    const { organization } = useCurrentOrganization();

    const { data, ...rest } = useOrganizationPermissionsQueryFn(organization.id);

    return { permissions: data, ...rest };
};
