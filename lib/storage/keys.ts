export const StorageKeys = {
    CURRENT_ORG_ID: "current_organization_id",
} as const;

export type TStorageKeys = (typeof StorageKeys)[keyof typeof StorageKeys];
