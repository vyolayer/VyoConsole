"use client";

import { useProject } from "@/features/project/hooks";
import { useProjectParams } from "@/features/project/hooks/useProjectParams";
import { useSearchParams } from "next/navigation";
import { GeneralProjectSetting } from "@/features/project/components/settings/GeneralProjectSetting";
import { ProjectDangerZone } from "@/features/project/components/settings/DengerZone";

export default function ProjectSettingsPage() {
    const { orgSlug, projectId } = useProjectParams();
    const { project } = useProject(projectId);
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");

    switch (tab) {
        case "api-keys":
            return <div>Api Keys</div>;
        case "danger-zone":
            return <ProjectDangerZone orgSlug={orgSlug} project={project} />;
        default:
            return <GeneralProjectSetting project={project} />;
    }
}
