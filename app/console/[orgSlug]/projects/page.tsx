"use client";

import { useOrganizationBySlug } from "@org/hooks/useOrganization";
import { PageHeader } from "@/features/console/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FolderKanban, Users, Key, ChevronRight } from "lucide-react";
import { useProjectDialog } from "@/features/project/components/provider/ProjectDialogProvider";
import { useProjects } from "@/features/project/hooks";
import Link from "next/link";
import { cn, stringToColor } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ConsoleProjectsPage() {
    const { organization: org } = useOrganizationBySlug();
    const { setCreateProjectOpen } = useProjectDialog();
    const { projects, total_count } = useProjects(org.id);

    return (
        <div className="flex flex-col gap-6 py-6">
            <PageHeader
                title="Projects"
                description="Manage and monitor all projects in this organization."
                action={
                    <Button
                        className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold"
                        size="xl"
                        onClick={() => setCreateProjectOpen(true)}
                    >
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
                        <span className="text-white font-semibold">{total_count || 0}</span>
                        {" / "}
                        <span className="text-[#7b7b86]">{org.max_projects}</span> projects
                    </span>
                </div>
            </div>

            {/* Empty State / Project Grid */}
            {!projects || projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#ffffff10] rounded-2xl py-20 gap-4 cursor-pointer hover:border-[#ffffff20] hover:bg-[#ffffff03] transition-all group">
                    <div className="w-14 h-14 rounded-2xl bg-[#1e1e24] group-hover:bg-[#25252b] transition-colors flex items-center justify-center">
                        <FolderKanban className="w-6 h-6 text-[#7b7b86] group-hover:text-[#a1a1aa]" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-white mb-1">No projects yet</h3>
                        <p className="text-sm text-[#7b7b86] max-w-xs">
                            Create your first project to start organizing your work.
                        </p>
                    </div>
                    <Button
                        className="bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold mt-2"
                        onClick={() => setCreateProjectOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Project
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {projects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/console/${org.slug}/projects/${project.id}`}
                            className="group block bg-[#141418] hover:bg-[#1a1a1f] border border-[#ffffff10] hover:border-[#ffffff20] rounded-2xl p-6 transition-all relative overflow-hidden"
                        >
                            {/* Top row */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0 border border-[#ffffff10]"
                                        style={{ backgroundColor: stringToColor(project.name) }}
                                    >
                                        {project.name.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="pr-10">
                                        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                                            <span className="truncate max-w-[200px]">
                                                {project.name}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-sm h-5",
                                                    project.is_active
                                                        ? "text-[#00e5ff] border-[#00e5ff]/20 bg-[#00e5ff]/5"
                                                        : "text-[#7b7b86] bg-[#ffffff08]",
                                                )}
                                            >
                                                {project.is_active ? "Active" : "Inactive"}
                                            </Badge>
                                        </h3>
                                        <p className="text-sm text-[#7b7b86] line-clamp-1 mt-0.5">
                                            {project.description || "No description provided."}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Stats row */}
                            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#ffffff0a]">
                                <div>
                                    <p className="text-[#a1a1aa] text-xs flex items-center gap-1.5 mb-1">
                                        <Users className="w-3.5 h-3.5" />
                                        Members limit
                                    </p>
                                    <p className="text-base font-semibold text-white">
                                        {project.max_members}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-[#a1a1aa] text-xs flex items-center gap-1.5 mb-1">
                                        <Key className="w-3.5 h-3.5" />
                                        API Keys limit
                                    </p>
                                    <p className="text-base font-semibold text-white">
                                        {project.max_api_keys}
                                    </p>
                                </div>
                            </div>

                            {/* View Project button hover state */}
                            <div className="absolute top-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                <div className="w-8 h-8 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] flex items-center justify-center border border-[#00e5ff]/20">
                                    <ChevronRight className="w-4 h-4 ml-0.5" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
