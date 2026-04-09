"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";

export function GuestGuard({ children }: { children: React.ReactNode }) {
    const { data, isLoading } = useMe();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && data) {
            router.replace("/dashboard");
        }
    }, [isLoading, data, router]);

    if (isLoading) return null;

    return <>{children}</>;
}
