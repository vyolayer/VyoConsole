"use client";

import { useDeleteProject } from "@/features/project/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { IProject } from "@/features/project/types/project.type";
import { Card, CardContent } from "@/components/ui/card";

export function ProjectDangerZone({ orgSlug, project }: { orgSlug: string; project: IProject }) {
    const deleteMutation = useDeleteProject();
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Delete project "${project.name}"? This action cannot be undone.`)) return;
        await deleteMutation.mutateAsync({ orgId: project.organization_id, projectId: project.id });
        router.push(`/console/${orgSlug}/projects`);
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col max-w-xl mb-6">
                <h2 className="text-xl font-bold text-white tracking-tight">Danger Zone</h2>
                <p className="text-sm text-[#7b7b86] mt-0.5">
                    Manage configuration for <span className="text-[#a1a1aa]">{project.name}</span>.
                </p>
            </div>

            <Card className="bg-[#1a1014] border border-red-500/10 rounded-2xl p-6 flex flex-col gap-4">
                <CardContent className="flex items-start justify-between gap-6">
                    <div>
                        <p className="text-sm font-semibold text-white">Delete this project</p>
                        <p className="text-xs text-[#7b7b86] mt-0.5">
                            Permanently delete the project and all its data. This cannot be undone.
                        </p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={deleteMutation.isPending}
                        className="shrink-0 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:text-red-300"
                    >
                        {deleteMutation.isPending ? (
                            <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        ) : (
                            <Trash2 className="w-4 h-4 mr-2" />
                        )}
                        Delete Project
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
