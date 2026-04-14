"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";

export const EmptyOrganization: React.FC<{
    onCreateOrganization: () => void;
}> = ({ onCreateOrganization }) => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4">
            <p className="text-muted-foreground">No organizations found</p>

            <Button onClick={onCreateOrganization}>Create Organization</Button>
        </div>
    );
};
