import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerApi } from "../api";
import { useRouter } from "next/navigation";

export function useRegister() {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: registerApi,

        onSuccess: (data) => {
            console.log("User registered:", data);
            queryClient.clear();
            router.push("/auth/login");
        },

        onError: (error: Error) => {
            console.error("Register error:", error.message);
        },
    });
}
