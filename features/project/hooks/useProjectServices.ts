import { useQuery } from "@tanstack/react-query";

import { projectServiceApi } from "../api/projectService.api";

export const useProjectServices = (projectId: string) => {
    const { data, ...rest } = useQuery({
        queryKey: ["project-services", projectId],
        queryFn: () => projectServiceApi.list(projectId),
    });

    return {
        projectServices: data ?? [],
        ...rest,
    };
};

export const useProjectService = (projectId: string, serviceKey?: string | null) => {
    const { data, ...rest } = useQuery({
        queryKey: ["project-service", projectId, serviceKey],
        queryFn: () => projectServiceApi.get(projectId, serviceKey!),
        enabled: !!serviceKey,
    });

    return {
        service: data,
        ...rest,
    };
};
