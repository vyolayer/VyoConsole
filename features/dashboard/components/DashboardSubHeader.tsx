"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export const DashboardSubHeader = () => {
    const router = useRouter();
    const onCreateOrganization = () => {
        router.push("/console?tab=organizations&action=create");
    };

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Organizations</h1>

            <Button onClick={onCreateOrganization}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Organization
            </Button>
        </div>
    );
};
