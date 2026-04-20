import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectApi } from "../api/project.api";
import { PROJECT_QUERY_KEYS } from "./queryKeys";
import { CreateProjectInput } from "../schemas/CreateProjectSchema";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orgId, data }: { orgId: string; data: CreateProjectInput }) =>
            projectApi.create(orgId, data),

        onSuccess: (_, { orgId }) => {
            toast.success("Project created");
            queryClient.invalidateQueries({ queryKey: PROJECT_QUERY_KEYS.list(orgId) });
        },

        onError: (err: Error) => {
            toast.error(err.message || "Failed to create project");
        },
    });
}
