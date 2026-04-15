import { QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import { organizationQueryBySlugOptions } from "@org/hooks/useOrganization";
import { InvitationDialogProvider } from "@/features/org/providers/InvitationDialogProvider";
import { InviteMemberDialog } from "@/features/org/components/dialog/InviteMemberDialog";
import { ConsoleOrgLayout } from "@/features/console/components/ConsoleOrgLayout";

type OrganizationLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ orgSlug: string }>;
};

export default async function ConsoleOrgSlugLayout({ children, params }: OrganizationLayoutProps) {
    const { orgSlug } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(organizationQueryBySlugOptions(orgSlug));

    return (
        <InvitationDialogProvider>
            <ConsoleOrgLayout orgSlug={orgSlug}>
                <Suspense>{children}</Suspense>
            </ConsoleOrgLayout>
            <InviteMemberDialog />
        </InvitationDialogProvider>
    );
}
