"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { DeleteOrganizationInput } from "../schemas/DeleteOrganizationSchema";
import { organizationApi } from "../api";
import { toast } from "sonner";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";

export const useDeleteOrganization = (id: string) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: DeleteOrganizationInput) => organizationApi.delete(id, data),

        onSuccess: () => {
            toast.success("Organization deleted");
            queryClient.invalidateQueries({ queryKey: ORGANIZATION_QUERY_KEYS.list() });
            queryClient.removeQueries({ queryKey: ORGANIZATION_QUERY_KEYS.detail(id) });

            router.push("/console");
        },

        onError: (err: Error) => {
            toast.error(err.message);
        },
    });
};
