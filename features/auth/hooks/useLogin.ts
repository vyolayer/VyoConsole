import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginApi } from "../api";
import { useRouter } from "next/navigation";

export function useLogin() {
    const router = useRouter();
    return useMutation({
        mutationFn: loginApi,
        retry: 1,

        onSuccess: () => {
            toast.success("Login successful");
            router.push("/console");
        },

        onError: (error: Error) => {
            toast.error(error.message || "Login failed");
        },
    });
}
