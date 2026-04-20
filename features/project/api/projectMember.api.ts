import { apiClient } from "@/lib/api/client";
import { IProjectMember } from "../types/projectMemberType";

type ListProjectMembersResponse = {
    members: IProjectMember[];
};

const getProjectMembers = (orgId: string, projectId: string) =>
    apiClient.get<ListProjectMembersResponse>(
        `/organizations/${orgId}/projects/${projectId}/members`,
    );

export const projectMemberApi = {
    list: getProjectMembers,
};
