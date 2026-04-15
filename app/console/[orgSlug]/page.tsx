"use client";

import { useRouter } from "next/navigation";
import { useOrganizationBySlug } from "@org/hooks/useOrganization";
import { useCurrentOrganization } from "@org/hooks/useCurrentOrganization";
import { useCurrentMember } from "@org/hooks/useCurrentMember";
import { useOrganizationMembers } from "@org/hooks/useMembers";
import { useOrganizationParams } from "@org/hooks/useOrganizationParams";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Users,
    FolderKanban,
    ShieldCheck,
    Plus,
    Settings,
    ArrowRight,
    Activity,
} from "lucide-react";
import Link from "next/link";

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

export default function OrgOverviewPage() {
    const router = useRouter();
    const orgSlug = useOrganizationParams();
    const { organization: org } = useOrganizationBySlug();
    useCurrentOrganization();
    useCurrentMember();
    const { members } = useOrganizationMembers();

    return (
        <div className="flex flex-col gap-8 py-6">
            {/* Page Title */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white"
                            style={{ backgroundColor: stringToColor(org.name) }}
                        >
                            {org.name.slice(0, 2).toUpperCase()}
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">{org.name}</h1>
                        <Badge
                            className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                                org.is_active
                                    ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5"
                                    : "text-[#7b7b86] bg-[#ffffff08]"
                            }`}
                            variant="secondary"
                        >
                            {org.is_active ? (
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                                    ACTIVE
                                </span>
                            ) : (
                                "INACTIVE"
                            )}
                        </Badge>
                    </div>
                    <p className="text-[#a1a1aa] text-sm pl-12">
                        {org.description || "No description provided."}
                    </p>
                </div>
                <Button
                    onClick={() => router.push(`/console/${orgSlug}/settings`)}
                    variant="outline"
                    className="border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:bg-[#ffffff05] bg-transparent"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                    <div className="flex items-center gap-2 text-[#7b7b86]">
                        <Users className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            Members
                        </span>
                    </div>
                    <div className="text-4xl font-bold text-white">
                        {org.member_count}
                        <span className="text-xl text-[#7b7b86] font-normal">
                            / {org.max_members}
                        </span>
                    </div>
                    <p className="text-xs text-[#7b7b86]">Active members in this organization</p>
                </div>

                <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                    <div className="flex items-center gap-2 text-[#7b7b86]">
                        <FolderKanban className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            Projects
                        </span>
                    </div>
                    <div className="text-4xl font-bold text-white">
                        {org.project_count || 0}
                        <span className="text-xl text-[#7b7b86] font-normal">
                            / {org.max_projects}
                        </span>
                    </div>
                    <p className="text-xs text-[#7b7b86]">Projects under this organization</p>
                </div>

                <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                    <div className="flex items-center gap-2 text-[#7b7b86]">
                        <Activity className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                            Status
                        </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="text-2xl font-bold text-white">
                            {org.is_active ? "Active" : "Inactive"}
                        </span>
                        <div
                            className={`w-2.5 h-2.5 rounded-full ${org.is_active ? "bg-[#00e5ff] animate-pulse" : "bg-[#7b7b86]"}`}
                        />
                    </div>
                    <p className="text-xs text-[#7b7b86]">Organization operational status</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#141418] rounded-2xl p-6">
                <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider mb-4">
                    Quick Actions
                </h2>
                <div className="flex flex-wrap gap-3">
                    <Button
                        onClick={() => router.push(`/console/${orgSlug}/projects`)}
                        className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                    <Button
                        onClick={() => router.push(`/console/${orgSlug}/members`)}
                        variant="outline"
                        className="border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:bg-[#ffffff05] bg-transparent"
                    >
                        <Users className="w-4 h-4 mr-2" />
                        Manage Members
                    </Button>
                    <Button
                        onClick={() => router.push(`/console/${orgSlug}/settings`)}
                        variant="outline"
                        className="border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:bg-[#ffffff05] bg-transparent"
                    >
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Organization Settings
                    </Button>
                </div>
            </div>

            {/* Recent Members Preview */}
            <div className="bg-[#141418] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">
                        Recent Members
                    </h2>
                    <Link
                        href={`/console/${orgSlug}/members`}
                        className="text-sm text-[#00e5ff] hover:text-[#00e5ff]/80 flex items-center gap-1 transition-colors"
                    >
                        View all
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="flex flex-col gap-0">
                    {members?.slice(0, 5).map((member) => (
                        <Link
                            href={`/console/${orgSlug}/members/${member.id}`}
                            key={member.id}
                            className="flex items-center justify-between py-3 px-2 rounded-xl hover:bg-[#ffffff05] transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
                                    style={{ backgroundColor: stringToColor(member.email) }}
                                >
                                    {(member.full_name || member.email)[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {member.full_name}
                                    </p>
                                    <p className="text-xs text-[#7b7b86]">{member.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {member.roles.slice(0, 2).map((role) => (
                                    <span
                                        key={role}
                                        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#ba9eff]/10 text-[#ba9eff] border border-[#ba9eff]/20"
                                    >
                                        {role}
                                    </span>
                                ))}
                                <Badge
                                    variant="secondary"
                                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                                        member.status === "active"
                                            ? "bg-[#00e5ff]/5 text-[#00e5ff] border-[#00e5ff]/20"
                                            : "bg-[#ffffff08] text-[#7b7b86]"
                                    }`}
                                >
                                    {member.status}
                                </Badge>
                            </div>
                        </Link>
                    ))}

                    {(!members || members.length === 0) && (
                        <div className="flex flex-col items-center justify-center py-10 text-[#7b7b86]">
                            <Users className="w-8 h-8 mb-3 opacity-40" />
                            <p className="text-sm">No members yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
