"use client";

import * as React from "react";
import { useOrganizationBySlug } from "@/features/org/hooks/useOrganization";

export const ProjectParamsContext = React.createContext<{
    orgSlug: string;
    projectId: string;
    orgId: string;
} | null>(null);

export const ProjectParamsProvider = ({
    orgSlug,
    projectId,
    children,
}: {
    orgSlug: string;
    projectId: string;
    children: React.ReactNode;
}) => {
    const {
        organization: { id: orgId },
    } = useOrganizationBySlug();

    return (
        <ProjectParamsContext.Provider value={{ orgSlug, orgId, projectId }}>
            {children}
        </ProjectParamsContext.Provider>
    );
};
