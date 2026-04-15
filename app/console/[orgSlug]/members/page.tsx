"use client";

import { useOrganizationMembers } from "@org/hooks/useMembers";
import { OrganizationMembersTable } from "@org/components/table/OrganizationMembersTable";
import { InvitationButton } from "@/features/org/components/InvitationButton";
import { PageHeader } from "@/features/console/components/PageHeader";
import { Users } from "lucide-react";

export default function ConsoleMembersPage() {
    const { members } = useOrganizationMembers();

    return (
        <div className="flex flex-col gap-6 py-6">
            <PageHeader
                title="Members"
                description="Manage members, roles and access for this organization."
                action={<InvitationButton />}
            />

            {/* Stats bar */}
            <div className="flex items-center gap-6 px-1">
                <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                    <Users className="w-4 h-4 text-[#7b7b86]" />
                    <span>
                        <span className="text-white font-semibold">{members?.length ?? 0}</span>{" "}
                        member{members?.length !== 1 ? "s" : ""}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl overflow-hidden bg-[#141418]">
                <OrganizationMembersTable members={members ?? []} />
            </div>
        </div>
    );
}
