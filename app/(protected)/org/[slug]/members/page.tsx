"use client";

import { useOrganizationMembers } from "@org/hooks/useMembers";
import { OrganizationMembersTable } from "@org/components/table/OrganizationMembersTable";
import { InvitationButton } from "@/features/org/components/InvitationButton";

const OrganizationMembersPage = () => {
    const { members } = useOrganizationMembers();

    return (
        <div className="flex flex-col gap-6 p-6">
            {/* ---------------- Header ---------------- */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Members</h1>
                    <p className="text-sm text-muted-foreground">
                        Manage members, roles and access for this organization
                    </p>
                </div>

                <InvitationButton />
            </div>
            {/* ---------------- Table ---------------- */}
            <OrganizationMembersTable members={members} />
        </div>
    );
};

export default OrganizationMembersPage;
