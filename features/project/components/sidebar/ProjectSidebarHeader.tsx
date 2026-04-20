import Link from "next/link";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";

interface Props {
    orgSlug: string;
    projectName: string;
}

export function ProjectSidebarHeader({ orgSlug, projectName }: Props) {
    return (
        <SidebarHeader className="border-b">
            <div className="px-2 py-2">
                <Link
                    href={`/console/${orgSlug}/projects`}
                    className="mb-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>

                <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                    <FolderKanban className="h-4 w-4 text-primary" />
                    <span className="truncate text-sm font-medium">{projectName}</span>
                </div>
            </div>
        </SidebarHeader>
    );
}
