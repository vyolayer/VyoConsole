import { apiClient } from "@/lib/api/client";
import { IOrganizationMember, IOrganizationMemberWithRABC } from "../types/member.types";

type GetOrganizationsMembersResponse = {
    members: IOrganizationMember[];
};

type GetCurrentOrganizationMemberResponse = IOrganizationMemberWithRABC;

const getMembers = (
    id: string, // organization id
) => apiClient.get<GetOrganizationsMembersResponse>(`/organizations/${id}/members`);

const getCurrentMember = (
    id: string, // organization id
) => apiClient.get<GetCurrentOrganizationMemberResponse>(`/organizations/${id}/members/me`);

const getMember = (
    id: string, // organization id
    memberId: string,
) => apiClient.get<IOrganizationMember>(`/organizations/${id}/members/${memberId}`);

const removeMember = (
    id: string, // organization id
    memberId: string,
) => apiClient.delete(`/organizations/${id}/members/${memberId}`);

export const memberApi = {
    list: getMembers,
    me: getCurrentMember,
    getById: getMember,
    remove: removeMember,
};
