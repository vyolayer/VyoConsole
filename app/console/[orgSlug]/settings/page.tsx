"use client";

import { useOrganizationBySlug } from "@org/hooks/useOrganization";
import { PageHeader } from "@/features/console/components/PageHeader";
import { OrgBasicUpdateForm } from "@/features/org/components/settings/OrgBasicUpdateForm";
import { LimitsAndQuotas } from "@/features/org/components/settings/LimitsAndQuotas";
import { OrganizationDangerZone } from "@/features/org/components/settings/DangerZone";

export default function ConsoleSettingsPage() {
    const { organization: org } = useOrganizationBySlug();

    return (
        <div className="flex flex-col gap-8 py-6 w-full">
            <PageHeader
                title="Settings"
                description="Manage your organization's details and preferences."
            />

            {/* General Settings Form */}
            <OrgBasicUpdateForm org={org} />

            {/* Limits & Quotas */}
            <LimitsAndQuotas max_members={org.max_members} max_projects={org.max_projects} />

            {/* Danger Zone */}
            <OrganizationDangerZone orgID={org.id} orgName={org.name} is_active={org.is_active} />
        </div>
    );
}
