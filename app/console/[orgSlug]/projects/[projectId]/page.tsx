"use client";

import * as React from "react";
import { useProject } from "@/features/project/hooks";
import { stringToColor, cn } from "@/lib/utils";
import { Activity, Key, Users, CalendarDays, ShieldCheck, FolderKanban } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useProjectParams } from "@/features/project/hooks/useProjectParams";

export default function ConsoleProjectDetailPage() {
    const { projectId } = useProjectParams();
    const { project } = useProject(projectId);

    const avatarColor = stringToColor(project.name);
    const initials = project.name.slice(0, 2).toUpperCase();
    const createdAt = project.created_at
        ? format(new Date(project.created_at), "MMM d, yyyy")
        : "—";

    return (
        <div className="flex flex-col gap-8">
            {/* ─── Project Header ─── */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0 border border-[#ffffff10]"
                        style={{ backgroundColor: avatarColor }}
                    >
                        {initials}
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-white tracking-tight">
                                {project.name}
                            </h1>
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full",
                                    project.is_active
                                        ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5"
                                        : "text-[#7b7b86] bg-[#ffffff08]",
                                )}
                            >
                                {project.is_active ? (
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                                        Active
                                    </span>
                                ) : (
                                    "Inactive"
                                )}
                            </Badge>
                        </div>
                        <p className="text-sm text-[#7b7b86]">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── Stats Grid ─── */}
            <div className="grid grid-cols-2 gap-4">
                <StatCard
                    icon={Users}
                    label="Members Limit"
                    value={String(project.max_members)}
                    sub="Maximum project members"
                />
                <StatCard
                    icon={Key}
                    label="API Keys Limit"
                    value={String(project.max_api_keys)}
                    sub="Maximum API keys allowed"
                />
                <StatCard
                    icon={CalendarDays}
                    label="Created"
                    value={createdAt}
                    sub="Project creation date"
                />
                <StatCard
                    icon={Activity}
                    label="Status"
                    value={project.is_active ? "Active" : "Inactive"}
                    sub="Operational status"
                    valueClassName={project.is_active ? "text-[#00e5ff]" : "text-[#7b7b86]"}
                />
            </div>

            {/* ─── Quick-info section ─── */}
            <div className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-5">
                <h2 className="text-[11px] font-bold text-[#7b7b86] uppercase tracking-wider">
                    Project Details
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    <InfoRow icon={FolderKanban} label="Project ID" value={project.id} mono />
                    <InfoRow
                        icon={ShieldCheck}
                        label="Organization ID"
                        value={project.organization_id}
                        mono
                    />
                    <InfoRow
                        icon={Users}
                        label="Created By (user ID)"
                        value={project.created_by}
                        mono
                    />
                </div>
            </div>
        </div>
    );
}

/* ───────── sub-components ───────── */

function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    valueClassName,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    sub: string;
    valueClassName?: string;
}) {
    return (
        <div className="bg-[#141418] hover:bg-[#1a1a1f] transition-colors rounded-2xl p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#7b7b86]">
                <Icon className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">{label}</span>
            </div>
            <p className={cn("text-2xl font-bold text-white", valueClassName)}>{value}</p>
            <p className="text-xs text-[#7b7b86]">{sub}</p>
        </div>
    );
}

function InfoRow({
    icon: Icon,
    label,
    value,
    mono,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start justify-between gap-4 py-3 border-b border-[#ffffff06] last:border-0">
            <div className="flex items-center gap-2 text-[#7b7b86] shrink-0 min-w-[180px]">
                <Icon className="w-4 h-4" />
                <span className="text-sm">{label}</span>
            </div>
            <span
                className={cn(
                    "text-sm text-[#a1a1aa] text-right break-all",
                    mono && "font-mono text-xs text-[#7b7b86]",
                )}
            >
                {value}
            </span>
        </div>
    );
}
