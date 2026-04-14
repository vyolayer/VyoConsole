import { useSuspenseQuery } from "@tanstack/react-query";
import { rabcApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useCurrentOrganization } from "./useCurrentOrganization";

export const organizationRolesQueryOptions = (id: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.roles(id),
    queryFn: () => rabcApi.listOfRoles(id),
});

const useOrganizationRolesQueryFn = (id: string) => {
    return useSuspenseQuery(organizationRolesQueryOptions(id));
};

export const useOrganizationRoles = () => {
    const { organization } = useCurrentOrganization();

    const { data, ...rest } = useOrganizationRolesQueryFn(organization.id);

    return { roles: data, ...rest };
};
