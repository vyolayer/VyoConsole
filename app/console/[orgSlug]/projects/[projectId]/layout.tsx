import { ProjectLayout } from "@/features/project/components/ProjectLayout";
import { ProjectParamsProvider } from "@/features/project/providers/ProjectParamsProvider";

type OrganizationLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ orgSlug: string; projectId: string }>;
};

export default async function ConsoleOrgSlugLayout({ children, params }: OrganizationLayoutProps) {
    const { orgSlug, projectId } = await params;

    return (
        <ProjectParamsProvider orgSlug={orgSlug} projectId={projectId}>
            <ProjectLayout orgSlug={orgSlug} projectId={projectId}>
                {children}
            </ProjectLayout>
        </ProjectParamsProvider>
    );
}
