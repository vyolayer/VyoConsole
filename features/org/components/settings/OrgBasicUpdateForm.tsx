import { IOrganization } from "../../types/organization.types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";
import { useForm } from "@tanstack/react-form";
import {
    UpdateOrganizationInput,
    updateOrganizationSchema,
} from "../../schemas/CreateOrganizationSchema";
import { toast } from "sonner";
import { useUpdateOrganization } from "../../hooks/useOrganization";

export const OrgBasicUpdateForm = ({ org }: { org: IOrganization }) => {
    const orgUpdate = useUpdateOrganization(org.id, org.slug);
    const form = useForm({
        defaultValues: {
            name: org.name,
            description: org.description,
        } as UpdateOrganizationInput,

        validators: {
            onSubmit: updateOrganizationSchema,
            onChange: updateOrganizationSchema,
        },

        onSubmit: async ({ value }) => {
            const isSame =
                JSON.stringify({ name: org.name, description: org.description }) ===
                JSON.stringify({ name: value.name, description: value.description });

            if (isSame) {
                toast.error("No changes detected");
                return;
            }

            await orgUpdate.mutateAsync(value);
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="bg-[#141418] rounded-2xl p-8 flex flex-col gap-6"
        >
            <FieldSet>
                <FieldLegend>General</FieldLegend>
                <FieldDescription>These settings apply to your organization.</FieldDescription>

                <FieldGroup>
                    {/* Name */}
                    <form.Field
                        name="name"
                        validators={{ onChange: updateOrganizationSchema.shape.name }}
                    >
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;

                            return (
                                <Field>
                                    <FieldLabel>Organization Name</FieldLabel>
                                    <Input
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }}
                    </form.Field>

                    {/* Description */}
                    <form.Field
                        name="description"
                        validators={{ onChange: updateOrganizationSchema.shape.description }}
                    >
                        {(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid;

                            return (
                                <Field>
                                    <Label
                                        htmlFor="org-description"
                                        className="text-sm font-medium text-[#a1a1aa]"
                                    >
                                        Description
                                        <span className="ml-2 text-[#7b7b86] font-normal text-xs">
                                            (optional)
                                        </span>
                                    </Label>
                                    <Textarea
                                        id="org-description"
                                        value={field.state.value}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="bg-[#0f1930] border-[#ffffff10] text-white placeholder:text-[#7b7b86] focus:border-[#00e5ff]/50 focus:ring-[#00e5ff]/20 min-h-20 resize-none"
                                        placeholder="Describe your organization..."
                                    />
                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                </Field>
                            );
                        }}
                    </form.Field>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={!form.state.isValid}
                            className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold disabled:opacity-40"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </FieldGroup>
            </FieldSet>
        </form>
    );
};
