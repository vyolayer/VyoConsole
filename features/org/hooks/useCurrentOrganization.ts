import { useSuspenseQuery } from "@tanstack/react-query";

import { organizationApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useOrganizationBySlug } from "./useOrganization";

const organizationQueryByIDOptions = (id: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.detail(id),
    queryFn: () => organizationApi.getById(id),
});

const useOrganizationQuery = (id: string) => {
    return useSuspenseQuery(organizationQueryByIDOptions(id));
};

export const useCurrentOrganization = () => {
    const { organization } = useOrganizationBySlug();
    const { data, ...rest } = useOrganizationQuery(organization.id);
    return { ...data, ...rest };
};
