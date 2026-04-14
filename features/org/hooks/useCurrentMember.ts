import { useSuspenseQuery } from "@tanstack/react-query";

import { memberApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useOrganizationBySlug } from "./useOrganization";

const useCurrentMemberQuery = (organization_id: string) => {
    return useSuspenseQuery({
        queryKey: ORGANIZATION_QUERY_KEYS.currentMember(organization_id),
        queryFn: () => memberApi.me(organization_id),
    });
};

export const useCurrentMember = () => {
    const {
        organization: { id: organization_id },
    } = useOrganizationBySlug();

    const { data, ...rest } = useCurrentMemberQuery(organization_id);

    return { member: data, ...rest };
};

export const useCurrentMemberPermissions = () => {
    const { member } = useCurrentMember();

    return member?.perms || [];
};
