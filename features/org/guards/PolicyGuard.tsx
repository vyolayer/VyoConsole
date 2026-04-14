"use client";

import { usePolicy } from "../hooks/usePolicy";
import { PolicyName } from "../utils/policy";

export function PolicyGuard<T extends PolicyName>({
    policy,
    resource,
    fallback = null,
    children,
}: {
    policy: T;
    resource?: any;
    fallback?: React.ReactNode;
    children: React.ReactNode;
}) {
    const { can } = usePolicy();

    if (!can(policy, resource)) return <>{fallback}</>;

    return <>{children}</>;
}
