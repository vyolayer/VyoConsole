"use client";

import { ProjectServicesOverview } from "@/features/project/components/console-services";
import { useProjectParams } from "@/features/project/hooks/useProjectParams";
import { useProjectServices } from "@/features/project/hooks/useProjectServices";

export default function ProjectServicesPage() {
    const { projectId } = useProjectParams();

    const { projectServices } = useProjectServices(projectId);

    return <ProjectServicesOverview services={projectServices} />;
}
