import { useSuspenseQuery } from "@tanstack/react-query";
import { memberApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useCurrentOrganization } from "./useCurrentOrganization";

export const organizationMembersQueryOptions = (id: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.members(id),
    queryFn: () => memberApi.list(id),
});

const useOrganizationMembersQuery = (id: string) => {
    return useSuspenseQuery(organizationMembersQueryOptions(id));
};

export const useOrganizationMembers = () => {
    const { organization } = useCurrentOrganization();
    const { data, ...rest } = useOrganizationMembersQuery(organization.id);
    return { members: data?.members, ...rest };
};
