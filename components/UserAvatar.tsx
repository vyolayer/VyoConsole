"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/features/auth/types/userType";

export const UserAvatar: React.FC<{ user: IUser; className?: string }> = ({ user, className }) => {
    const fallback_char = user.avatar.fallback_char || user.full_name[0];

    return (
        <Avatar className={`h-8 w-8 rounded-lg ${className}`}>
            <AvatarImage src={user.avatar.url} alt={user.full_name} />
            <AvatarFallback className="rounded-lg">{fallback_char}</AvatarFallback>
        </Avatar>
    );
};
