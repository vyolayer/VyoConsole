"use client";

import { useEffect, useState } from "react";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { useDashboardSearchParams } from "@/features/organization/hooks/useDashboardSearchParams";
import { CreateOrganizationDialog } from "@/features/organization/components/CreateOrganizationDialog";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrganizationCard } from "@/features/dashboard/components/OrganizationCard";

export default function DashboardPage() {
    const router = useRouter();

    const { tab, action } = useDashboardSearchParams();
    const key = `${tab}:${action}`;

    const [openCreateOrganizationDialog, setOpenCreateOrganizationDialog] = useState(false);

    const { isLoading, organizations } = useDashboard();

    useEffect(() => {
        if (key === "organizations:create") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpenCreateOrganizationDialog(true);
            // clear search params
            router.replace("/dashboard");
        }
    }, [key, router]);

    // -------------------------
    // Loading State
    // -------------------------
    if (isLoading) {
        return (
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                    <div className="aspect-video rounded-xl bg-muted/50" />
                </div>
                <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
        );
    }

    // -------------------------
    // Empty State
    // -------------------------
    if (!organizations || organizations.length === 0) {
        return (
            <>
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <p className="text-muted-foreground">No organizations found</p>

                    <Button onClick={() => setOpenCreateOrganizationDialog(true)}>
                        Create Organization
                    </Button>
                </div>

                <CreateOrganizationDialog
                    open={openCreateOrganizationDialog}
                    onOpenChange={setOpenCreateOrganizationDialog}
                />
            </>
        );
    }

    // -------------------------
    // Main UI
    // -------------------------
    return (
        <>
            <div className="flex flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Organizations</h1>

                    <Button onClick={() => setOpenCreateOrganizationDialog(true)}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Create Organization
                    </Button>
                </div>

                {/* Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {organizations.map((org) => (
                        <OrganizationCard key={org.id} organization={org} />
                    ))}
                </div>
            </div>

            {/* Dialog always mounted */}
            <CreateOrganizationDialog
                open={openCreateOrganizationDialog}
                onOpenChange={setOpenCreateOrganizationDialog}
            />
        </>
    );
}
