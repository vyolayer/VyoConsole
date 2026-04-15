"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, FolderKanban, GitBranch, Users, Calendar } from "lucide-react";

export default function ConsoleProjectDetailPage({
    params,
}: {
    params: Promise<{ orgSlug: string; projectId: string }>;
}) {
    const { orgSlug, projectId } = React.use(params);

    return (
        <div className="flex flex-col gap-8 py-6">
            {/* Back */}
            <Link
                href={`/console/${orgSlug}/projects`}
                className="flex items-center gap-2 text-sm text-[#7b7b86] hover:text-white transition-colors w-fit"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
            </Link>

            {/* Header */}
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#00e5ff]/10 flex items-center justify-center shrink-0">
                    <FolderKanban className="w-5 h-5 text-[#00e5ff]" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-white">Project {projectId}</h1>
                    <p className="text-sm text-[#a1a1aa] mt-1">Project overview and details</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { icon: GitBranch, label: "Branches", value: "—" },
                    { icon: Users, label: "Contributors", value: "—" },
                    { icon: Calendar, label: "Created", value: "—" },
                ].map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-[#141418] rounded-2xl p-6 flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-2 text-[#7b7b86]">
                            <stat.icon className="w-4 h-4" />
                            <span className="text-[11px] font-bold uppercase tracking-wider">
                                {stat.label}
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-white">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Project Content placeholder */}
            <div className="bg-[#141418] rounded-2xl p-8 flex flex-col items-center justify-center h-48 gap-3">
                <FolderKanban className="w-8 h-8 text-[#7b7b86]/40" />
                <p className="text-sm text-[#7b7b86]">
                    Full project details will be available once the projects API is connected.
                </p>
            </div>
        </div>
    );
}
