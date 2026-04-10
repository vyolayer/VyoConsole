import { useMe } from "@/features/auth/hooks/useMe";

export const useAuth = () => {
    const { isError, isLoading, isSuccess, data } = useMe();

    return {
        isAuthenticated: isSuccess,
        user: data?.user,
        isLoading,
        isError,
        isSuccess,
    };
};
