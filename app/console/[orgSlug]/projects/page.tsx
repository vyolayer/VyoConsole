"use client";

import { useOrganizationBySlug } from "@org/hooks/useOrganization";
import { useOrganizationParams } from "@org/hooks/useOrganizationParams";
import { PageHeader } from "@/features/console/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban } from "lucide-react";

export default function ConsoleProjectsPage() {
    const orgSlug = useOrganizationParams();
    const { organization: org } = useOrganizationBySlug();

    return (
        <div className="flex flex-col gap-6 py-6">
            <PageHeader
                title="Projects"
                description="Manage and monitor all projects in this organization."
                action={
                    <Button className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                }
            />

            {/* Stats bar */}
            <div className="flex items-center gap-6 px-1">
                <div className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                    <FolderKanban className="w-4 h-4 text-[#7b7b86]" />
                    <span>
                        <span className="text-white font-semibold">{org.project_count}</span>
                        {" / "}
                        <span className="text-[#7b7b86]">{org.max_projects}</span> projects
                    </span>
                </div>
            </div>

            {/* Empty State / Project Grid placeholder */}
            {org.project_count === 0 ? (
                <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-[#ffffff10] rounded-2xl py-20 gap-4 cursor-pointer hover:border-[#ffffff20] hover:bg-[#ffffff03] transition-all"
                >
                    <div className="w-14 h-14 rounded-2xl bg-[#1e1e24] flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-[#7b7b86]" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-1">No projects yet</h3>
                        <p className="text-sm text-[#7b7b86] max-w-xs">
                            Create your first project to start organizing your work.
                        </p>
                    </div>
                    <Button className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold mt-2">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Project cards will render here when projects API is integrated */}
                    <div className="bg-[#141418] rounded-2xl p-6 text-sm text-[#7b7b86]">
                        Project data loading...
                    </div>
                </div>
            )}
        </div>
    );
}
