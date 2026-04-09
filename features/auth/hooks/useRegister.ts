import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api";

export function useRegister() {
    return useMutation({
        mutationFn: registerApi,

        onSuccess: (data) => {
            console.log("User registered:", data);
        },

        onError: (error: Error) => {
            console.error("Register error:", error.message);
        },
    });
}
