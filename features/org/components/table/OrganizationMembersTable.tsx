"use client";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { IOrganizationMember } from "../../types/member.types";
import { MemberRow } from "./MemberRow";

export const OrganizationMembersTable = ({ members }: { members: IOrganizationMember[] }) => {
    function handleRemoveMember(memberId: string) {}

    function handleUpdateMemberRole(memberId: string, role: string) {}

    // ---------------- Empty ----------------
    if (!members || members.length === 0) {
        return (
            <div className="flex justify-center py-10 text-muted-foreground">No members found</div>
        );
    }

    // ---------------- Main UI ----------------
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {members.map((member) => (
                        <MemberRow
                            key={member.id}
                            member={member}
                            handleRemoveMember={handleRemoveMember}
                            handleUpdateMemberRole={handleUpdateMemberRole}
                        />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
