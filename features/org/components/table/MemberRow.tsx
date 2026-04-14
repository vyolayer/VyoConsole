"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

import { formatSmartDate } from "@/lib/utils/date";
import { PolicyGuard } from "../../guards/PolicyGuard";
import { IOrganizationMember } from "../../types/member.types";
import { TableCell, TableRow } from "@/components/ui/table";

export const MemberRow: React.FC<{
    member: IOrganizationMember;
    handleRemoveMember: (memberId: string) => void;
    handleUpdateMemberRole: (memberId: string, role: string) => void;
}> = ({ member, handleRemoveMember }) => {
    return (
        <TableRow key={member.id}>
            {/* Name */}
            <TableCell className="font-medium">{member.full_name}</TableCell>

            {/* Email */}
            <TableCell>{member.email}</TableCell>

            {/* Roles */}
            <TableCell>
                <div className="flex flex-wrap gap-1">
                    {member.roles.map((role) => (
                        <Badge key={role} variant="outline">
                            {role}
                        </Badge>
                    ))}
                </div>
            </TableCell>

            {/* Status */}
            <TableCell>
                <Badge variant={member.status === "active" ? "default" : "secondary"}>
                    {member.status}
                </Badge>
            </TableCell>

            {/* Joined */}
            <TableCell>
                {/* 13 april 2023 */}
                {formatSmartDate(member.joined_at)}
            </TableCell>

            {/* Actions */}
            <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                    {/* Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <PolicyGuard policy="can_view_members">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                            </PolicyGuard>

                            <PolicyGuard policy="can_manage_roles">
                                <DropdownMenuItem>Change Role</DropdownMenuItem>
                            </PolicyGuard>

                            <PolicyGuard policy="can_remove_member" resource={member.user_id}>
                                <DropdownMenuItem
                                    variant="destructive"
                                    onClick={() => handleRemoveMember(member.user_id)}
                                >
                                    Remove Member
                                </DropdownMenuItem>
                            </PolicyGuard>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </TableCell>
        </TableRow>
    );
};
