"use client";

import { useCurrentMember } from "@org/hooks/useCurrentMember";
import { createRBAC, policies, PolicyName } from "../utils/policy";

export function usePolicy() {
    const { member } = useCurrentMember();

    const rbac = createRBAC({
        permissions: member?.perms || [],
        roles: member?.roles || [],
    });

    const can = <T extends PolicyName>(
        policy: keyof typeof policies,
        resource?: Parameters<(typeof policies)[T]>[0]["resource"],
    ) => {
        const fn = policies[policy];
        if (!fn) return false;

        return fn({
            rbac,
            userId: member?.user_id,
            resource: resource as any,
        });
    };

    return { can, rbac };
}
