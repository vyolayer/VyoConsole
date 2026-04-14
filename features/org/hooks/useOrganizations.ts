import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { organizationApi, GetOrganizationsResponse } from "../api";

import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";

export const organizationsQueryOptions: UseSuspenseQueryOptions<
    GetOrganizationsResponse,
    Error,
    GetOrganizationsResponse,
    readonly unknown[]
> = {
    queryKey: ORGANIZATION_QUERY_KEYS.list(),
    queryFn: organizationApi.list,
};

const useOrganizationQueryFn = () => {
    return useSuspenseQuery(organizationsQueryOptions);
};

export const useOrganizations = () => {
    return useOrganizationQueryFn();
};
