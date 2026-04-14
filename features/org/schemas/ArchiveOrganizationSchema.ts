import { z } from "zod";

export const archiveOrganizationSchema = z.object({
    confirm_name: z.string().min(2, "Confirm name is required"),
});

export type ArchiveOrganizationInput = z.infer<typeof archiveOrganizationSchema>;
