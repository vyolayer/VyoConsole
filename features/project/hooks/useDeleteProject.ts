import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectApi } from "../api/project.api";
import { PROJECT_QUERY_KEYS } from "./queryKeys";

export function useDeleteProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgId, projectId }: { orgId: string; projectId: string }) =>
            projectApi.delete(orgId, projectId),

        onSuccess: (_, { orgId, projectId }) => {
            toast.success("Project deleted");
            queryClient.removeQueries({ queryKey: PROJECT_QUERY_KEYS.detail(orgId, projectId) });
            queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.list(orgId) });
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to delete project");
        },
    });
}
