import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogout() {
    const queryClient = useQueryClient();
    const router = useRouter();

    const mutate = useMutation({
        mutationFn: logoutApi,

        onSuccess: () => {
            queryClient.clear();
            toast.success("Logged out");
            router.refresh();
            router.push("/auth/login");
        },
    });

    return { logout: mutate.mutate, ...mutate };
}
