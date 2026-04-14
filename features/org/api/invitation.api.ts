import { apiClient } from "@/lib/api/client";
import { InviteMemberInput } from "../schemas/InviteMemberSchema";
import { IOrganizationInvitation } from "../types/invitation.types";

type GetInvitationsResponse = {
    invitations: IOrganizationInvitation[];
};

const sendInviteMember = (
    id: string, // organization id
    data: InviteMemberInput,
) => apiClient.post(`/organizations/${id}/invitations`, data);

const getInvitations = (
    id: string, // organization id
) => apiClient.get<GetInvitationsResponse>(`/organizations/${id}/invitations`);

const getPendingInvitations = (
    id: string, // organization id
) => apiClient.get<GetInvitationsResponse>(`/organizations/${id}/invitations/pending`);

const cancelInvitation = (
    id: string, // organization id
    invitationId: string,
) => apiClient.delete(`/organizations/${id}/invitations/${invitationId}`);

export const invitationApi = {
    send: sendInviteMember,
    list: getInvitations,
    pendingList: getPendingInvitations,
    cancel: cancelInvitation,
};
