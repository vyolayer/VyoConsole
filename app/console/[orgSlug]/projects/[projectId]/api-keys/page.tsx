"use client";

import { useApiKeys } from "@/features/project/hooks/useApiKeys";
import { useProject } from "@/features/project/hooks";
import { useProjectParams } from "@/features/project/hooks/useProjectParams";
import { ApiKeysView } from "@/features/project/components/api-keys/ApiKeysView";

export default function ProjectApiKeysPage() {
    const { projectId } = useProjectParams();
    const { project } = useProject(projectId);
    const { data } = useApiKeys();

    const apiKeys = data?.api_keys ?? [];

    return <ApiKeysView project={project} apiKeys={apiKeys} />;
}
