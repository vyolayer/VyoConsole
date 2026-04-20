"use client";

import { useCurrentOrganization } from "@org/hooks/useCurrentOrganization";
import { useCurrentMember } from "@org/hooks/useCurrentMember";
import { useOrganizationMembers } from "@org/hooks/useMembers";
import { OrganizationOverview } from "@/features/org/components/OrganizationOverview";

export default function OrgOverviewPage() {
    const { organization: org } = useCurrentOrganization();
    useCurrentMember();
    const { members } = useOrganizationMembers();

    return <OrganizationOverview org={org} members={members} />;
}
