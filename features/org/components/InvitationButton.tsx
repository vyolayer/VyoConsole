"use client";

import * as React from "react";
import { PolicyGuard } from "../guards/PolicyGuard";
import { Button } from "@/components/ui/button";
import { useInvitationDialog } from "../providers/InvitationProvider";

export const InvitationButton: React.FC = ({}) => {
    const { onOpenChange } = useInvitationDialog();

    return (
        <PolicyGuard policy="can_invite_member">
            <Button onClick={() => onOpenChange(true)}>Invite Member</Button>
        </PolicyGuard>
    );
};
