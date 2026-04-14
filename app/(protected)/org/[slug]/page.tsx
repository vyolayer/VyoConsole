"use client";

import { useOrganizationBySlug } from "@/features/org/hooks/useOrganization";
import { OrganizationOverview } from "@org/components/OrganizationOverview";
import { useCurrentMember } from "@org/hooks/useCurrentMember";
import { useCurrentOrganization } from "@org/hooks/useCurrentOrganization";

export default function OrganizationOverviewPage() {
    const { organization: org, members } = useOrganizationBySlug();
    useCurrentOrganization();
    useCurrentMember();

    return <OrganizationOverview org={org} members={members} />;
}
