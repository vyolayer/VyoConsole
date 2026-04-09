"use client";

import { useForm } from "@tanstack/react-form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AuthFormFooter } from "./AuthFormFooter";

import { loginSchema, LoginInput } from "../schemas/LoginSchema";
import { useLogin } from "../hooks/useLogin";
import { FormError } from "@/components/FormError";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const loginMutation = useLogin();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        } as LoginInput,
        validators: {
            onSubmit: loginSchema,
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) => {
            await loginMutation.mutateAsync(value);
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
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-sm text-muted-foreground">Login to your account</p>
                </div>

                {/* Email */}
                <form.Field name="email" validators={{ onChange: loginSchema.shape.email }}>
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
                <form.Field name="password" validators={{ onChange: loginSchema.shape.password }}>
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

                {/* Global Error */}
                {loginMutation.isError && <FormError error={loginMutation.error.message} />}

                <Button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                </Button>

                <AuthFormFooter
                    text="Don't have an account? "
                    link="/auth/register"
                    linkText="Register"
                />
            </FieldGroup>
        </form>
    );
}
