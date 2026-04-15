"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Dashboard } from "@dashboard/components/Dashboard";
import { CreateOrganizationDialog } from "@org/components/dialog/CreateOrganizationDialog";
import { EmptyOrganization } from "@/features/dashboard/components/EmptyOrganization";

import { useDashboard } from "@dashboard/hooks/useDashboard";
import { useDashboardSearchParams } from "@dashboard/hooks/useDashboardSearchParams";

export default function DashboardPage() {
    const [openCreateOrganizationDialog, setOpenCreateOrganizationDialog] = useState(false);

    const router = useRouter();
    const { organizations } = useDashboard();
    const { tab, action } = useDashboardSearchParams();

    const handleCreateOrganization = () => setOpenCreateOrganizationDialog(true);

    useEffect(() => {
        const key = `${tab}:${action}`;

        if (key === "organizations:create") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setOpenCreateOrganizationDialog(true);
            // clear search params
            router.replace("/console");
        }
    }, [tab, action, router]);

    if (!organizations || organizations.length === 0) {
        return (
            <>
                <EmptyOrganization onCreateOrganization={handleCreateOrganization} />

                <CreateOrganizationDialog
                    open={openCreateOrganizationDialog}
                    onOpenChange={setOpenCreateOrganizationDialog}
                />
            </>
        );
    }

    return (
        <>
            <Dashboard organizations={organizations} />

            <CreateOrganizationDialog
                open={openCreateOrganizationDialog}
                onOpenChange={setOpenCreateOrganizationDialog}
            />
        </>
    );
}
