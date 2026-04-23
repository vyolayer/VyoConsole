"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { Loader2, KeyRound } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { FormError } from "@/components/FormError";
import {
    createApiKeySchema,
    CreateApiKeyInput,
    Environment,
} from "@project/schemas/CreateApikeySchema";
import { useCreateApiKey } from "@project/hooks/useApiKeys";
import { CreateApiKeyResponse } from "@project/api/apikey.api";

const AVAILABLE_SCOPES = [
    "read:project",
    "write:project",
    "read:services",
    "write:services",
    "read:members",
    "write:members",
    "read:logs",
    "admin",
];

interface CreateApiKeyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCreated: (result: CreateApiKeyResponse) => void;
}

export function CreateApiKeyDialog({ open, onOpenChange, onCreated }: CreateApiKeyDialogProps) {
    const mutation = useCreateApiKey();
    const [selectedScopes, setSelectedScopes] = React.useState<string[]>([]);

    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            scopes: [] as string[],
            environment: Environment.DEV,
            expires_at: undefined,
        } as CreateApiKeyInput,

        validators: {
            onSubmit: createApiKeySchema,
            onChange: createApiKeySchema,
        },

        onSubmit: async ({ value }) => {
            console.log(value);
            const result = await mutation.mutateAsync({ ...value, scopes: selectedScopes });
            console.log(result);
            form.reset();
            setSelectedScopes([]);
            onOpenChange(false);
            onCreated(result);
        },

        onSubmitInvalid: (error) => {
            console.log("error", error);
        },
    });

    const toggleScope = (scope: string) => {
        setSelectedScopes((prev) =>
            prev.includes(scope) ? prev.filter((s) => s !== scope) : [...prev, scope],
        );

        form.setFieldValue("scopes", selectedScopes);
    };

    React.useEffect(() => {
        return () => {
            form.reset();
            setSelectedScopes([]);
        };
    }, [form]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <KeyRound className="w-4 h-4 text-[#00e5ff]" />
                        Create API Key
                    </DialogTitle>
                    <DialogDescription>
                        Define name, scopes, and expiration for the new key. The secret is shown
                        only once after creation.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup className="py-2 gap-5">
                        {/* Name */}
                        <form.Field
                            name="name"
                            validators={{ onChange: createApiKeySchema.shape.name }}
                        >
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            value={field.state.value}
                                            placeholder="e.g. Production Backend"
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
                            validators={{ onChange: createApiKeySchema.shape.description }}
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
                                            placeholder="What will this key be used for?"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* Environment */}
                        <form.Field name="environment">
                            {(field) => (
                                <Field>
                                    <FieldLabel>Environment</FieldLabel>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(v) => field.handleChange(v as Environment)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select environment" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={Environment.DEV}>
                                                Development
                                            </SelectItem>
                                            <SelectItem value={Environment.LIVE}>
                                                Live / Production
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}
                        </form.Field>

                        {/* Scopes */}
                        <Field>
                            <FieldLabel>
                                Scopes
                                {selectedScopes.length > 0 && (
                                    <span className="ml-2 text-[10px] font-normal text-[#7b7b86]">
                                        ({selectedScopes.length} selected)
                                    </span>
                                )}
                            </FieldLabel>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {AVAILABLE_SCOPES.map((scope) => {
                                    const active = selectedScopes.includes(scope);
                                    return (
                                        <button
                                            key={scope}
                                            type="button"
                                            onClick={() => toggleScope(scope)}
                                            className={`text-[11px] font-mono px-2.5 py-1 rounded-md border transition-all ${
                                                active
                                                    ? "bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff]"
                                                    : "bg-[#ffffff06] border-[#ffffff10] text-[#7b7b86] hover:border-[#ffffff20] hover:text-[#a1a1aa]"
                                            }`}
                                        >
                                            {scope}
                                        </button>
                                    );
                                })}
                            </div>
                            {selectedScopes.length === 0 && (
                                <p className="text-xs text-red-400 mt-1">
                                    Select at least one scope.
                                </p>
                            )}
                        </Field>

                        {/* Expiry (optional) */}
                        <form.Field name="expires_at">
                            {(field) => (
                                <Field>
                                    <FieldLabel>
                                        Expiry Date{" "}
                                        <span className="text-[#7b7b86] font-normal">
                                            (optional)
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        type="date"
                                        value={
                                            field.state.value
                                                ? (field.state.value as Date)
                                                      .toISOString()
                                                      .split("T")[0]
                                                : ""
                                        }
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e) =>
                                            field.handleChange(
                                                e.target.value
                                                    ? new Date(e.target.value)
                                                    : undefined,
                                            )
                                        }
                                    />
                                </Field>
                            )}
                        </form.Field>

                        {/* Global error */}
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
                            <Button
                                type="submit"
                                size="lg"
                                disabled={mutation.isPending || selectedScopes.length === 0}
                                className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold"
                            >
                                {mutation.isPending && (
                                    <Loader2 className="animate-spin size-4 mr-2" />
                                )}
                                Create Key
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
