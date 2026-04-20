import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectApi } from "../api/project.api";
import { PROJECT_QUERY_KEYS } from "./queryKeys";
import { CreateProjectInput } from "../schemas/CreateProjectSchema";

export function useUpdateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            orgId,
            projectId,
            data,
        }: {
            orgId: string;
            projectId: string;
            data: Partial<CreateProjectInput>;
        }) => projectApi.update(orgId, projectId, data),

        onSuccess: (_, { orgId, projectId }) => {
            toast.success("Project updated");
            queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.detail(orgId, projectId) });
            queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.list(orgId) });
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to update project");
        },
    });
}
