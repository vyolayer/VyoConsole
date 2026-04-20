import { useSuspenseQuery } from "@tanstack/react-query";
import { projectApi } from "../api/project.api";
import { PROJECT_QUERY_KEYS } from "./queryKeys";

export const useProjects = (orgId: string) => {
    const { data, ...rest } = useSuspenseQuery({
        queryKey: PROJECT_QUERY_KEYS.list(orgId),
        queryFn: () => projectApi.list(orgId),
    });

    return { ...data, ...rest };
};
