import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { organizationApi } from "../api";
import { ORGANIZATION_QUERY_KEYS } from "./queryKeys";

export function useCreateOrganization() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: organizationApi.create,

        onSuccess: () => {
            toast.success("Organization created");
            queryClient.invalidateQueries({ queryKey: ORGANIZATION_QUERY_KEYS.list() });
            router.push("/dashboard");
        },

        onError: (err: Error) => {
            toast.error(err.message);
        },
    });
}
