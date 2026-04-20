"use client";

import * as React from "react";
import { IOrganization } from "../types/organization.types";
import { IOrganizationMember } from "../types/member.types";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Activity,
    ArrowRight,
    FolderKanban,
    Plus,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn, stringToColor } from "@/lib/utils";
import Link from "next/link";

export const OrganizationOverview: React.FC<{
    org: IOrganization;
    members: IOrganizationMember[];
}> = ({ org, members }) => {
    return (
        <div className="flex flex-col gap-8 py-12">
            {/* ---------------- Header ---------------- */}
            <OrgOverviewHeader org={org} />

            {/* ---------------- Stats ---------------- */}
            <OrgStats
                max_projects={org.max_projects}
                max_members={org.max_members}
                project_count={org.project_count}
                member_count={org.member_count}
                is_active={org.is_active}
            />

            {/* ---------------- Quick Actions ---------------- */}
            <OrgQuickActions slug={org.slug} />

            {/* ---------------- Members Preview ---------------- */}
            <OrgMemberPreviewSection slug={org.slug} members={members} />
        </div>
    );
};

const OrgOverviewHeader: React.FC<{ org: IOrganization }> = ({ org }) => {
    const router = useRouter();

    return (
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
                        className={cn(
                            "text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full",
                            org.is_active
                                ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5"
                                : "text-[#7b7b86] bg-[#ffffff08]",
                        )}
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
                onClick={() => router.push(`/console/${org.slug}/settings`)}
                variant="outline"
                className="border-[#ffffff10] text-[#a1a1aa] hover:text-white hover:bg-[#ffffff05] bg-transparent"
            >
                <Settings className="w-4 h-4 mr-2" />
                Settings
            </Button>
        </div>
    );
};

const OrgStats: React.FC<{
    member_count: number;
    max_members: number;
    project_count: number;
    max_projects: number;
    is_active: boolean;
}> = ({ max_members, is_active, max_projects, member_count, project_count }) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                <div className="flex items-center gap-2 text-[#7b7b86]">
                    <Users className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Members</span>
                </div>
                <div className="text-4xl font-bold text-white">
                    {member_count}
                    <span className="text-xl text-[#7b7b86] font-normal">/ {max_members}</span>
                </div>
                <p className="text-xs text-[#7b7b86]">Active members in this organization</p>
            </div>

            <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                <div className="flex items-center gap-2 text-[#7b7b86]">
                    <FolderKanban className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
                </div>
                <div className="text-4xl font-bold text-white">
                    {project_count || 0}
                    <span className="text-xl text-[#7b7b86] font-normal">/ {max_projects}</span>
                </div>
                <p className="text-xs text-[#7b7b86]">Projects under this organization</p>
            </div>

            <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2 hover:bg-[#1a1a1f] transition-colors">
                <div className="flex items-center gap-2 text-[#7b7b86]">
                    <Activity className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Status</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl font-bold text-white">
                        {is_active ? "Active" : "Inactive"}
                    </span>
                    <div
                        className={`w-2.5 h-2.5 rounded-full ${is_active ? "bg-[#00e5ff] animate-pulse" : "bg-[#7b7b86]"}`}
                    />
                </div>
                <p className="text-xs text-[#7b7b86]">Organization operational status</p>
            </div>
        </div>
    );
};

const OrgQuickActions: React.FC<{ slug: string }> = ({ slug: orgSlug }) => {
    const router = useRouter();

    return (
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
    );
};

const OrgMemberPreviewSection: React.FC<{
    slug: string;
    members: IOrganizationMember[];
}> = ({ slug, members }) => {
    return (
        <div className="bg-[#141418] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold text-[#7b7b86] uppercase tracking-wider">
                    Recent Members
                </h2>
                <Link
                    href={`/console/${slug}/members`}
                    className="text-sm text-[#00e5ff] hover:text-[#00e5ff]/80 flex items-center gap-1 transition-colors"
                >
                    View all
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <div className="flex flex-col gap-0">
                {members?.slice(0, 5).map((member) => (
                    <Link
                        href={`/console/${slug}/members/${member.id}`}
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
                                <p className="text-sm font-medium text-white">{member.full_name}</p>
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
    );
};
