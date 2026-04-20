import { z } from "zod";

export const createProjectSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(10, "Description must be at least 10 characters long").optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
