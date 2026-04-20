import { useSuspenseQuery } from "@tanstack/react-query";
import { invitationApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { useCurrentOrganization } from "./useCurrentOrganization";

export const organizationInvitationsQueryOptions = (id: string) => ({
    queryKey: ORGANIZATION_QUERY_KEYS.invitations(id),
    queryFn: () => invitationApi.list(id),
});

const useOrganizationInvitationQueryFn = (id: string) => {
    return useSuspenseQuery(organizationInvitationsQueryOptions(id));
};

export const useOrganizationInvitations = () => {
    const { organization } = useCurrentOrganization();

    const { data, ...rest } = useOrganizationInvitationQueryFn(organization.id);

    return { invitations: data?.invitations, ...rest };
};
