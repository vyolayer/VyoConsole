"use client";

import { useForm } from "@tanstack/react-form";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useOrganizationRoles } from "@org/hooks/useRoles";
import { useInviteMember } from "@org/hooks/useInviteMember";
import { inviteMemberSchema, InviteMemberInput } from "@org/schemas/InviteMemberSchema";
import { useInvitationDialog } from "../../providers/InvitationProvider";

export function InviteMemberDialog() {
    const { open, onOpenChange } = useInvitationDialog();
    const mutation = useInviteMember();
    const { roles } = useOrganizationRoles();

    const form = useForm({
        defaultValues: {
            email: "",
            roles: [],
        } as InviteMemberInput,

        validators: {
            onSubmit: inviteMemberSchema,
            onChange: inviteMemberSchema,
        },

        onSubmit: async ({ value }) => {
            await mutation.mutateAsync(value);
            form.reset();
            onOpenChange(false);
        },
    });

    const roleOptions = roles?.filter((role) => role.name !== "owner");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Invite Member</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup className="py-4">
                        {/* Email */}
                        <form.Field
                            name="email"
                            validators={{ onChange: inviteMemberSchema.shape.email }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input
                                            placeholder="user@example.com"
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Role */}
                        <form.Field name="roles">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Role</FieldLabel>

                                        <Select
                                            value={field.state.value?.[0] || ""}
                                            onValueChange={(value) => field.handleChange([value])}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {roleOptions?.map((role) => (
                                                    <SelectItem key={role.id} value={role.id}>
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Global Error */}
                        {mutation.isError && <FormError error={mutation.error.message} />}

                        {/* Actions */}
                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? "Inviting..." : "Send Invite"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
