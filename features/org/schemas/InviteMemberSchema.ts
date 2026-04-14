import { z } from "zod";

export const inviteMemberSchema = z.object({
    email: z.email("Invalid email address").min(1, "Email is required"),
    roles: z.array(z.string().min(1)).min(1, "At least one role is required"),
});

export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
