import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthGuard } from "@/features/auth/guards/AuthGuard";
import { OrganizationHeader } from "@/features/organization/components/OrganizationHeader";
import { OrganizationSidebar } from "@/features/organization/components/OrganizationSidebar";
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <OrganizationSidebar />
                <SidebarInset>
                    <OrganizationHeader />
                    <main className="flex-1 bg-background">{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </AuthGuard>
    );
}
