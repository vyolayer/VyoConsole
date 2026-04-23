"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

import { ProjectSidebarHeader } from "./ProjectSidebarHeader";
import { ProjectOverviewNav } from "./ProjectOverviewNav";
import { ProjectServicesNav } from "./ProjectServicesNav";
import { ProjectMembersNav } from "./ProjectMembersNav";
import { ProjectSettingsNav } from "./ProjectSettingsNav";
import { IProjectManifestService } from "../../types/projectService.type";
import { useProjectServices } from "../../hooks/useProjectServices";
import { useProjectParams } from "../../hooks/useProjectParams";
import { ProjectApiKeysNav } from "./ProjectApiKeysNav";

interface ProjectSidebarProps {
    orgSlug: string;
    projectId: string;
    projectName: string;
    services?: IProjectManifestService[];
}

export function ProjectSidebar({ orgSlug, projectName }: ProjectSidebarProps) {
    const { projectId } = useProjectParams();
    const base = `/console/${orgSlug}/projects/${projectId}`;
    const { projectServices } = useProjectServices(projectId);

    return (
        <Sidebar variant="inset" collapsible="icon" className="relative">
            <ProjectSidebarHeader orgSlug={orgSlug} projectName={projectName} />

            <SidebarContent>
                <ProjectOverviewNav base={base} />
                <ProjectServicesNav base={base} services={projectServices} />
                <ProjectMembersNav base={base} />
                <ProjectApiKeysNav base={base} />
                <ProjectSettingsNav base={base} />
            </SidebarContent>
        </Sidebar>
    );
}
