import { useUpdateProject } from "@/features/project/hooks";
import { useForm } from "@tanstack/react-form";
import { createProjectSchema } from "@project/schemas/CreateProjectSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { FormError } from "@/components/FormError";
import { Loader2 } from "lucide-react";
import { IProject } from "@/features/project/types/project.type";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const GeneralProjectSetting = ({ project }: { project: IProject }) => {
    const updateMutation = useUpdateProject();

    const form = useForm({
        defaultValues: {
            name: project.name,
            description: project.description ?? "",
        },
        validators: {
            onSubmit: createProjectSchema,
            onChange: createProjectSchema,
        },
        onSubmit: async ({ value }) => {
            await updateMutation.mutateAsync({
                orgId: project.organization_id,
                projectId: project.id,
                data: value,
            });
        },
    });

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Settings</h2>
                <p className="text-sm text-[#7b7b86] mt-0.5">
                    Manage configuration for <span className="text-[#a1a1aa]">{project.name}</span>.
                </p>
            </div>

            {/* ─── General settings ─── */}
            <Card className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-5">
                <CardHeader>
                    <h3 className="text-[11px] font-bold text-[#7b7b86] uppercase tracking-wider">
                        General
                    </h3>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup className="gap-5">
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
                                            <FieldLabel>Project Name</FieldLabel>
                                            <Input
                                                value={field.state.value}
                                                onChange={(e) => field.handleChange(e.target.value)}
                                                placeholder="My project"
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
                                validators={{ onChange: createProjectSchema.shape.description }}
                            >
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched && !field.state.meta.isValid;
                                    return (
                                        <Field>
                                            <FieldLabel>Description</FieldLabel>
                                            <Textarea
                                                value={field.state.value || ""}
                                                rows={3}
                                                placeholder="Describe this project..."
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                            {isInvalid && (
                                                <FieldError errors={field.state.meta.errors} />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            {updateMutation.isError && (
                                <FormError error={updateMutation.error.message} />
                            )}

                            <div className="flex justify-end pt-1">
                                <Button type="submit" disabled={updateMutation.isPending}>
                                    {updateMutation.isPending && (
                                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>

            {/* ─── Danger zone ─── */}
        </div>
    );
};
