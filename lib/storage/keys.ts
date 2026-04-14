export const StorageKeys = {
    CURRENT_ORG_SLUG: "current_organization_slug",
} as const;

export type TStorageKeys = (typeof StorageKeys)[keyof typeof StorageKeys];
