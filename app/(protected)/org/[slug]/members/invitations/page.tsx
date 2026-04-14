"use client";

import { InvitationButton } from "@org/components/InvitationButton";
import { OrganizationInvitationsTable } from "@org/components/table/OrganizationInvitationTable";

import { useOrganizationMembers } from "@org/hooks/useMembers";
import { useOrganizationInvitations } from "@org/hooks/useInvitations";
import { useSelectCurrentOrganization } from "@org/hooks/useOrganization";

const OrganizationMembersInvitationsPage = () => {
    const { orgSlug } = useSelectCurrentOrganization();
    const { invitations } = useOrganizationInvitations();
    const { members } = useOrganizationMembers();

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* ---------------- Header ---------------- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Invitations</h1>
                    <p className="text-sm text-muted-foreground">
                        Here you can manage your organization&apos;s invitations
                    </p>
                </div>

                <InvitationButton />
            </div>

            {/* ---------------- Table ---------------- */}
            <OrganizationInvitationsTable
                orgSlug={orgSlug}
                invitations={invitations}
                members={members}
            />
        </div>
    );
};

export default OrganizationMembersInvitationsPage;
