"use client";

import React from "react";
import { useProject } from "../hooks";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ProjectSidebar } from "./sidebar/ProjectSidebar";

function ProjectLayoutInner({
    orgSlug,
    projectId,
    children,
}: {
    orgSlug: string;
    projectId: string;
    children: React.ReactNode;
}) {
    const { project } = useProject(projectId);

    return (
        <SidebarProvider>
            <div className="flex gap-8 flex-1 min-h-0 py-6">
                <ProjectSidebar
                    orgSlug={orgSlug} //
                    projectId={projectId}
                    projectName={project.name}
                />
                {/* Vertical divider */}
                <div className="w-px bg-[#ffffff08] shrink-0" />
                {/* Main content */}
                <main className="flex-1 min-w-0">{children}</main>
            </div>
        </SidebarProvider>
    );
}

type ProjectLayoutProps = {
    children: React.ReactNode;
    orgSlug: string;
    projectId: string;
};

export function ProjectLayout({ children, orgSlug, projectId }: ProjectLayoutProps) {
    return (
        <React.Suspense>
            <ProjectLayoutInner orgSlug={orgSlug} projectId={projectId}>
                {children}
            </ProjectLayoutInner>
        </React.Suspense>
    );
}
