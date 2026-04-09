"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { data, isLoading, isError } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && (isError || !data)) {
            router.replace("/auth/login");
        }
    }, [isLoading, isError, data, router]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!data) return null;

    return <>{children}</>;
}
