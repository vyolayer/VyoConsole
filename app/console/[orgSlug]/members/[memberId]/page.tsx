"use client";

import * as React from "react";
import { useOrganizationMembers } from "@org/hooks/useMembers";
import { useOrganizationParams } from "@org/hooks/useOrganizationParams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Calendar, ShieldIcon, UserX } from "lucide-react";
import Link from "next/link";
import { formatSmartDate } from "@/lib/utils/date";

function stringToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += `00${((hash >> (i * 8)) & 0xff).toString(16)}`.slice(-2);
    }
    return color;
}

export default function ConsoleMemberDetailPage({
    params,
}: {
    params: Promise<{ orgSlug: string; memberId: string }>;
}) {
    const { orgSlug, memberId } = React.use(params);
    const { members } = useOrganizationMembers();
    const member = members?.find((m) => m.id === memberId);

    if (!member) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
                <p className="text-[#7b7b86] text-sm">Member not found.</p>
                <Link href={`/console/${orgSlug}/members`}>
                    <Button variant="outline" className="border-[#ffffff10] text-[#a1a1aa] bg-transparent hover:bg-[#ffffff05] hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Members
                    </Button>
                </Link>
            </div>
        );
    }

    const avatarColor = stringToColor(member.email);
    const initials = (member.full_name || member.email)[0].toUpperCase();

    return (
        <div className="flex flex-col gap-8 py-6">
            {/* Back Link */}
            <div>
                <Link
                    href={`/console/${orgSlug}/members`}
                    className="flex items-center gap-2 text-sm text-[#7b7b86] hover:text-white transition-colors w-fit"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Members
                </Link>
            </div>

            {/* Profile Card */}
            <div className="bg-[#141418] rounded-2xl p-8 flex items-start gap-6">
                {/* Avatar */}
                <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shrink-0"
                    style={{ backgroundColor: avatarColor }}
                >
                    {initials}
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-white">{member.full_name}</h1>
                        <Badge
                            variant="secondary"
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                                member.status === "active"
                                    ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5"
                                    : "text-[#7b7b86] bg-[#ffffff08]"
                            }`}
                        >
                            {member.status === "active" ? (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                                    ACTIVE
                                </span>
                            ) : (
                                member.status.toUpperCase()
                            )}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                        <Mail className="w-4 h-4 text-[#7b7b86]" />
                        {member.email}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                        <Calendar className="w-4 h-4 text-[#7b7b86]" />
                        Joined {formatSmartDate(member.joined_at)}
                    </div>
                </div>
            </div>

            {/* Roles */}
            <div className="bg-[#141418] rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldIcon className="w-4 h-4 text-[#7b7b86]" />
                    <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">
                        Assigned Roles
                    </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                    {member.roles.length > 0 ? (
                        member.roles.map((role) => (
                            <span
                                key={role}
                                className="text-sm font-medium px-4 py-2 rounded-xl bg-[#ba9eff]/10 text-[#ba9eff] border border-[#ba9eff]/20"
                            >
                                {role}
                            </span>
                        ))
                    ) : (
                        <p className="text-sm text-[#7b7b86]">No roles assigned.</p>
                    )}
                </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#141418] rounded-2xl p-6 border border-red-500/10">
                <h2 className="text-sm font-bold text-red-400/80 uppercase tracking-wider mb-4">
                    Danger Zone
                </h2>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-white">Remove Member</p>
                        <p className="text-xs text-[#7b7b86] mt-0.5">
                            This will permanently remove the member from the organization.
                        </p>
                    </div>
                    <Button
                        variant="destructive"
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                    >
                        <UserX className="w-4 h-4 mr-2" />
                        Remove Member
                    </Button>
                </div>
            </div>
        </div>
    );
}
