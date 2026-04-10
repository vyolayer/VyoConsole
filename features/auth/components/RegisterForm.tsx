"use client";

import { useForm } from "@tanstack/react-form";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthFormFooter } from "./AuthFormFooter";
import { FormError } from "@/components/FormError";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";

import { registerSchema, RegisterInput } from "../schemas/RegisterSchema";
import { useRegister } from "../hooks/useRegister";

export function RegisterForm({ className, ...props }: React.ComponentProps<"form">) {
    const registerMutation = useRegister();

    const form = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            password: "",
            confirmPassword: "",
        } as RegisterInput,
        validators: {
            onSubmit: registerSchema,
            onChange: registerSchema,
        },
        onSubmit: async ({ value }) => {
            await registerMutation.mutateAsync(value);
        },
    });

    return (
        <form
            className={cn("flex flex-col gap-6", className)}
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            {...props}
        >
            <FieldGroup>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                </div>

                {/* Name */}
                <form.Field
                    name="full_name"
                    validators={{ onChange: registerSchema.shape.full_name }}
                >
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Email */}
                <form.Field name="email" validators={{ onChange: registerSchema.shape.email }}>
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Password */}
                <form.Field
                    name="password"
                    validators={{ onChange: registerSchema.shape.password }}
                >
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input
                                    type="password"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Confirm Password */}
                <form.Field name="confirmPassword">
                    {(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                        return (
                            <Field>
                                <FieldLabel>Confirm Password</FieldLabel>
                                <Input
                                    type="password"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        );
                    }}
                </form.Field>

                {/* Global error */}
                {registerMutation.isError && <FormError error={registerMutation.error.message} />}

                <Button type="submit" disabled={registerMutation.isPending}>
                    {registerMutation.isPending ? "Creating..." : "Create Account"}
                </Button>

                <AuthFormFooter
                    text="Already have an account? "
                    link="/auth/login"
                    linkText="Login"
                />
            </FieldGroup>
        </form>
    );
}
