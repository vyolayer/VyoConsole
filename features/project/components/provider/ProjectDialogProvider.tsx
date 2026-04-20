"use client";

import React, { createContext, useContext, useState } from "react";
import { CreateProjectDialog } from "../dialog/CreateProjectDialog";
import { useCurrentOrganization } from "@/features/org/hooks/useCurrentOrganization";

interface ProjectDialogContextValue {
    isCreateProjectOpen: boolean;
    setCreateProjectOpen: (open: boolean) => void;
    orgId: string;
}

const ProjectDialogContext = createContext<ProjectDialogContextValue | undefined>(undefined);

export function ProjectDialogProvider({ children }: { children: React.ReactNode }) {
    const { organization } = useCurrentOrganization();
    const [isCreateProjectOpen, setCreateProjectOpen] = useState(false);

    return (
        <ProjectDialogContext.Provider
            value={{ isCreateProjectOpen, setCreateProjectOpen, orgId: organization.id }}
        >
            {children}
            <CreateProjectDialog
                open={isCreateProjectOpen}
                onOpenChange={setCreateProjectOpen}
                orgId={organization.id}
            />
        </ProjectDialogContext.Provider>
    );
}

export function useProjectDialog() {
    const context = useContext(ProjectDialogContext);
    if (context === undefined) {
        throw new Error("useProjectDialog must be used within a ProjectDialogProvider");
    }
    return context;
}
