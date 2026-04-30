import { z } from "zod";

export const createOrganizationSchema = z.object({
    name: z.string().min(2, "Name is required"),
    description: z.string().min(5, "Description is required"),
});

export type CreateOrganizationInput = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = createOrganizationSchema.partial();
export type UpdateOrganizationInput = Partial<CreateOrganizationInput>;
