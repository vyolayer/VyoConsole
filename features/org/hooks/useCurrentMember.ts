import { useSuspenseQuery } from "@tanstack/react-query";

import { memberApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useCurrentOrganization } from "./useCurrentOrganization";

const useCurrentMemberQuery = (organization_id: string) => {
    return useSuspenseQuery({
        queryKey: ORGANIZATION_QUERY_KEYS.currentMember(organization_id),
        queryFn: () => memberApi.me(organization_id),
    });
};

export const useCurrentMember = () => {
    const { organization } = useCurrentOrganization();

    const { data, ...rest } = useCurrentMemberQuery(organization.id);

    return { member: data, ...rest };
};

export const useCurrentMemberPermissions = () => {
    const { member } = useCurrentMember();

    return member?.perms || [];
};
