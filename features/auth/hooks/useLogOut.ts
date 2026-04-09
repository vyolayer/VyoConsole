import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api";
import { toast } from "sonner";

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logoutApi,

        onSuccess: () => {
            queryClient.clear();
            toast.success("Logged out");
        },
    });
}
