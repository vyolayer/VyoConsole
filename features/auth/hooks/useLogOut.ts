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
            toast.success("Logged out");

            setTimeout(() => {
                router.push("/auth/login");
                queryClient.clear();
            }, 1000);
        },
    });

    return { logout: mutate.mutate, ...mutate };
}
