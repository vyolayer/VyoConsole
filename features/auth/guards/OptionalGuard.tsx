"use client";

import { useMe } from "../hooks/useMe";

export function OptionalAuthGuard({ children }: { children: React.ReactNode }) {
    useMe();
    return <>{children}</>;
}
