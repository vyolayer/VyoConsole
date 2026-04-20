import { useSuspenseQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { PROJECT_QUERY_KEYS } from "./queryKeys";
import { useProjectParams } from "./useProjectParams";

export const useProject = (projectId: string) => {
    const { orgId } = useProjectParams();
    const { data, ...rest } = useSuspenseQuery({
        queryKey: PROJECT_QUERY_KEYS.detail(orgId, projectId),
        queryFn: () => projectApi.getById(orgId, projectId),
    });

    return { ...data, ...rest };
};
