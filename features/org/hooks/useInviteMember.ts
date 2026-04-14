import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invitationApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";
import { InviteMemberInput } from "../schemas/InviteMemberSchema";
import { useCurrentOrganization } from "./useCurrentOrganization";

const useInviteMemberMutation = (organizationId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: InviteMemberInput) => invitationApi.send(organizationId, data),

        onSuccess: () => {
            toast.success("Invitation sent successfully");

            // refresh members + invitations
            queryClient.invalidateQueries({
                queryKey: ORGANIZATION_QUERY_KEYS.members(organizationId),
            });

            queryClient.invalidateQueries({
                queryKey: ORGANIZATION_QUERY_KEYS.invitations(organizationId),
            });
        },

        onError: (error: Error) => {
            toast.error(error.message || "Failed to send invite");
            console.error(error);
        },
    });
};

export function useInviteMember() {
    const { organization } = useCurrentOrganization();

    return useInviteMemberMutation(organization.id);
}
