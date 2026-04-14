"use client";

import { useMemo } from "react";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IOrganizationInvitation } from "@org/types/invitation.types";
import { IOrganizationMember } from "@org/types/member.types";
import { InvitationRow } from "./InviationRow";

type OrganizationInvitationsTableProps = {
    orgSlug: string;
    invitations: IOrganizationInvitation[];
    members: IOrganizationMember[];
};

export const OrganizationInvitationsTable = ({
    orgSlug,
    invitations,
    members,
}: OrganizationInvitationsTableProps) => {
    const membersMap = useMemo(() => {
        const map = new Map<string, string>();
        members?.forEach((m) => map.set(m.id, m.full_name));
        return map;
    }, [members]);

    if (!invitations?.length) {
        return (
            <div className="flex justify-center py-10 text-muted-foreground">
                No pending invitations
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Invited By</TableHead>
                        <TableHead>Invited At</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {invitations.map((inv) => (
                        <InvitationRow
                            key={inv.id}
                            inv={inv}
                            orgSlug={orgSlug}
                            membersMap={membersMap}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
