import { z } from "zod";

export const deleteOrganizationSchema = z.object({
    confirm_name: z.string().min(2, "Confirm name is required"),
});

export type DeleteOrganizationInput = z.infer<typeof deleteOrganizationSchema>;
