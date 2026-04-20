"use client";

import { CreateProjectDialog } from "./dialog/CreateProjectDialog";
import { ProjectDialogProvider } from "./provider/ProjectDialogProvider";

export function ProjectsWrapper({ orgId, children }: { orgId: string; children: React.ReactNode }) {
    return (
        <ProjectDialogProvider orgId={orgId}>
            {children}
            <CreateProjectDialog orgId={orgId} />
        </ProjectDialogProvider>
    );
}
