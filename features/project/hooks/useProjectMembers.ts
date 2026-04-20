import { useQuery } from "@tanstack/react-query";
import { projectMemberApi } from "../api/projectMember.api";
import { useProjectParams } from "./useProjectParams";

export const useProjectMembers = (projectId: string) => {
    const { orgId } = useProjectParams();
    const { data, ...rest } = useQuery({
        queryKey: ["project-members", orgId, projectId],
        queryFn: () => projectMemberApi.list(orgId, projectId),
    });

    return { members: data?.members || [], ...rest };
};
