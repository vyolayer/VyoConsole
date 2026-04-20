"use client";

import { useProjectMembers } from "@/features/project/hooks/useProjectMembers";
import { useProject } from "@/features/project/hooks";
import { useProjectParams } from "@/features/project/hooks/useProjectParams";
import { ProjectMembers } from "@/features/project/components/members/ProjectMembers";

export default function ProjectMembersPage() {
    const { projectId } = useProjectParams();
    const { project } = useProject(projectId);
    const { members } = useProjectMembers(projectId);

    return <ProjectMembers project={project} members={members || []} />;
}
