"use client";

import { useMe } from "@/features/auth/hooks/useMe";

export function AuthBootstrap({ children }: { children: React.ReactNode }) {
    useMe();

    return children;
}
