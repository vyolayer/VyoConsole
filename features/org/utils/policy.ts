export function createRBAC(ctx: { permissions: string[]; roles: string[] }) {
    const perms = new Set(ctx.permissions);

    return {
        can: (p: string) => perms.has(p),
        canAny: (ps: string[]) => ps.some((p) => perms.has(p)),
        canAll: (ps: string[]) => ps.every((p) => perms.has(p)),
        hasRole: (r: string) => ctx.roles.includes(r),
    };
}

export interface PolicyContext<TResource = unknown> {
    rbac: ReturnType<typeof createRBAC>;
    userId?: string;
    resource?: TResource;
}

export const policies = {
    // ---------------- Organization ----------------
    can_read_organization: (ctx: PolicyContext) => ctx.rbac.can("organization.read"),

    can_update_organization: (ctx: PolicyContext) => ctx.rbac.can("organization.update"),

    can_delete_organization: (ctx: PolicyContext) => ctx.rbac.can("organization.delete"),

    // ---------------- Billing ----------------
    can_manage_billing: (ctx: PolicyContext) => ctx.rbac.can("billing.manage"),

    // ---------------- Members ----------------
    can_invite_member: (ctx: PolicyContext) => ctx.rbac.can("member.invite"),

    can_remove_member: (ctx: PolicyContext<{ user_id: string }>) => {
        if (ctx.resource?.user_id === ctx.userId) return false;
        return ctx.rbac.can("member.remove");
    },

    can_view_members: (ctx: PolicyContext) => ctx.rbac.can("member.list"),

    can_update_member: (ctx: PolicyContext) => ctx.rbac.can("member.update"),

    // ---------------- Roles ----------------
    can_manage_roles: (ctx: PolicyContext) => ctx.rbac.can("role.manage"),

    can_create_role: (ctx: PolicyContext) => ctx.rbac.can("role.create"),

    // ---------------- Projects ----------------
    can_create_project: (ctx: PolicyContext) => ctx.rbac.can("project.create"),

    can_update_project: (ctx: PolicyContext) => ctx.rbac.can("project.update"),

    can_delete_project: (ctx: PolicyContext) => ctx.rbac.can("project.delete"),

    // ---------------- Audit ----------------
    can_viewAudit_logs: (ctx: PolicyContext) => ctx.rbac.can("audit.read"),
} as const;

export type PolicyName = keyof typeof policies;
