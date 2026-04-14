import { QueryClient } from "@tanstack/react-query";

import { OrganizationHeader } from "@org/components/header";
import { OrganizationSidebar } from "@org/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { organizationQueryBySlugOptions } from "@org/hooks/useOrganization";

type OrganizationLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
};

export default async function OrganizationLayout({ children, params }: OrganizationLayoutProps) {
    const { slug } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(organizationQueryBySlugOptions(slug));

    return (
        <SidebarProvider>
            <OrganizationSidebar />
            <SidebarInset>
                <OrganizationHeader />
                <main className="flex-1 bg-background gap-4 p-4 pt-0">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
