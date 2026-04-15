"use client";

import { useOrganizationInvitations } from "@org/hooks/useInvitations";
import { useOrganizationMembers } from "@org/hooks/useMembers";
import { useSelectCurrentOrganization } from "@org/hooks/useOrganization";
import { InvitationButton } from "@/features/org/components/InvitationButton";
import { OrganizationInvitationsTable } from "@org/components/table/OrganizationInvitationTable";
import { PageHeader } from "@/features/console/components/PageHeader";
import { Mail } from "lucide-react";

export default function ConsoleInvitationsPage() {
    const { orgSlug } = useSelectCurrentOrganization();
    const { invitations } = useOrganizationInvitations();
    const { members } = useOrganizationMembers();

    const pendingCount = invitations?.filter((i) => i.is_pending).length ?? 0;

    return (
        <div className="flex flex-col gap-6 py-6">
            <PageHeader
                title="Invitations"
                description="Manage pending and sent invitations for this organization."
                action={<InvitationButton />}
            />

            {/* Stats bar */}
            <div className="flex items-center gap-6 px-1">
                <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                    <Mail className="w-4 h-4 text-[#7b7b86]" />
                    <span>
                        <span className="text-white font-semibold">{pendingCount}</span>{" "}
                        pending invitation{pendingCount !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden bg-[#141418]">
                <OrganizationInvitationsTable
                    orgSlug={orgSlug}
                    invitations={invitations ?? []}
                    members={members ?? []}
                />
            </div>
        </div>
    );
}
