"use client";

import { useForm } from "@tanstack/react-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/FormError";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { createProjectSchema, CreateProjectInput } from "@project/schemas/CreateProjectSchema";
import { useCreateProject } from "@project/hooks/useCreateProject";
import { Loader2 } from "lucide-react";

interface CreateProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    orgId: string;
}

export function CreateProjectDialog({ open, onOpenChange, orgId }: CreateProjectDialogProps) {
    const mutation = useCreateProject();

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
        } as CreateProjectInput,

        validators: {
            onSubmit: createProjectSchema,
            onChange: createProjectSchema,
        },

        onSubmit: async ({ value }) => {
            await mutation.mutateAsync({ orgId, data: value });
            form.reset();
            onOpenChange(false);
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-106">
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
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
                            validators={{ onChange: createProjectSchema.shape.name }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            placeholder="Project name"
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
                                onChange: createProjectSchema.shape.description,
                            }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;

                                return (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea
                                            value={field.state.value || ""}
                                            rows={4}
                                            placeholder="Describe your project here..."
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
                                size="lg"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>

                            <Button type="submit" size="lg" disabled={mutation.isPending}>
                                {mutation.isPending ? (
                                    <Loader2 className="animate-spin size-4 mr-2" />
                                ) : null}
                                Create new Project
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
