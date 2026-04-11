"use client";

import { useForm } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormError } from "@/components/FormError";

import {
    createOrganizationSchema,
    CreateOrganizationInput,
} from "../schemas/CreateOrganizationSchema";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { Textarea } from "@/components/ui/textarea";

interface CreateOrganizationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CreateOrganizationDialog({ open, onOpenChange }: CreateOrganizationDialogProps) {
    const mutation = useCreateOrganization();

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
        } as CreateOrganizationInput,

        validators: {
            onSubmit: createOrganizationSchema,
            onChange: createOrganizationSchema,
        },

        onSubmit: async ({ value }) => {
            await mutation.mutateAsync(value);
            form.reset();
            onOpenChange(false);
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106">
                <DialogHeader>
                    <DialogTitle>Create Organization</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup className="py-4">
                        {/* Name */}
                        <form.Field
                            name="name"
                            validators={{ onChange: createOrganizationSchema.shape.name }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            placeholder="Organization name"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Description */}
                        <form.Field
                            name="description"
                            validators={{
                                onChange: createOrganizationSchema.shape.description,
                            }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            value={field.state.value}
                                            rows={4}
                                            placeholder="Describe your organization here..."
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
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
                                {mutation.isPending ? "Creating..." : "Create"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
