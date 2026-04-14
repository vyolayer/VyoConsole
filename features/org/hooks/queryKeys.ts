const ORGANIZATION_QUERY_KEYS = {
    all: ["organizations"] as const,

    list: () => [...ORGANIZATION_QUERY_KEYS.all, "list"] as const,

    detail: (id?: string) => [...ORGANIZATION_QUERY_KEYS.all, "detail", id] as const,

    bySlug: (slug?: string) => [...ORGANIZATION_QUERY_KEYS.all, "slug", slug] as const,

    members: (orgId?: string) => [...ORGANIZATION_QUERY_KEYS.all, orgId, "members"] as const,

    currentMember: (orgId?: string) =>
        [...ORGANIZATION_QUERY_KEYS.all, orgId, "members", "me"] as const,

    invitations: (orgId?: string) =>
        [...ORGANIZATION_QUERY_KEYS.all, orgId, "invitations"] as const,

    roles: (orgId?: string) => [...ORGANIZATION_QUERY_KEYS.all, orgId, "roles"] as const,

    permissions: (orgId?: string) =>
        [...ORGANIZATION_QUERY_KEYS.all, orgId, "permissions"] as const,
};

export { ORGANIZATION_QUERY_KEYS };
