"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { formatSmartDate } from "@/lib/utils/date";
import { IOrganizationInvitation } from "../../types/invitation.types";
import { TableCell, TableRow } from "@/components/ui/table";
import { PolicyGuard } from "../../guards/PolicyGuard";

const isExpired = (date: Date | string) => new Date(date).getTime() < Date.now();

export const InvitationRow = ({
    inv,
    orgSlug,
    membersMap,
}: {
    inv: IOrganizationInvitation;
    orgSlug: string;
    membersMap: Map<string, string>;
}) => {
    const expired = isExpired(inv.expired_at);

    const invitedByName = membersMap.get(inv.invited_by) || "Unknown";

    return (
        <TableRow>
            <TableCell className="font-medium">{inv.email}</TableCell>

            <TableCell>
                <Link
                    href={`/org/${orgSlug}/members/${inv.invited_by}`}
                    className="text-primary hover:underline"
                >
                    {invitedByName}
                </Link>
            </TableCell>

            <TableCell>{formatSmartDate(inv.invited_at)}</TableCell>
            <TableCell>{formatSmartDate(inv.expired_at)}</TableCell>

            <TableCell>
                <Badge
                    variant={!inv.is_pending ? "secondary" : expired ? "destructive" : "default"}
                >
                    {!inv.is_pending ? "Accepted" : expired ? "Expired" : "Pending"}
                </Badge>
            </TableCell>

            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                        <PolicyGuard policy="can_invite_member">
                            {inv.is_pending && (
                                <DropdownMenuItem className="text-destructive">
                                    Cancel Invitation
                                </DropdownMenuItem>
                            )}
                        </PolicyGuard>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    );
};
