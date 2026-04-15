"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

export const DashboardSubHeader = () => {
    const router = useRouter();
    const onCreateOrganization = () => {
        router.push("/console?tab=organizations&action=create");
    };

    return (
        <div className="flex items-start justify-between py-10 w-full">
            <div className="space-y-3 max-w-xl">
                <h1 className="text-5xl font-bold tracking-tight text-white">Organizations</h1>
                <p className="text-base text-[#a1a1aa] leading-relaxed">
                    Manage your teams and resource allocation across your digital infrastructure.
                </p>
            </div>

            <Button 
                onClick={onCreateOrganization}
                className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold h-12 px-6 rounded-lg uppercase tracking-wide text-sm"
            >
                <Plus className="mr-2 h-5 w-5 stroke-[2.5]" />
                Create Organization
            </Button>
        </div>
    );
};
