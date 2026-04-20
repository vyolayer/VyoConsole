const PROJECT_QUERY_KEYS = {
    all: ["projects"] as const,

    list: (orgId: string) => [...PROJECT_QUERY_KEYS.all, "list", orgId] as const,

    detail: (orgId: string, projectId: string) =>
        [...PROJECT_QUERY_KEYS.all, "detail", orgId, projectId] as const,
};

export { PROJECT_QUERY_KEYS };
