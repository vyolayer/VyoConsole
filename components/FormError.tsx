"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { FieldError } from "./ui/field";

export const FormError: React.FC<{
    error?: string;
    classname?: string;
}> = ({ error, classname }) => {
    return (
        <div className={cn(classname)}>
            {error && (
                <FieldError className="px-2 py-1 rounded-md bg-destructive/10">{error}</FieldError>
            )}
        </div>
    );
};
