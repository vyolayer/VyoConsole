import z from "zod";

// Enum for environment
export enum Environment {
    LIVE = "live",
    DEV = "dev",
}

export const createApiKeySchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    scopes: z.array(z.string()).min(1, "At least one scope is required"),
    environment: z.nativeEnum(Environment),
    expires_at: z.date().optional(),
});

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>;
