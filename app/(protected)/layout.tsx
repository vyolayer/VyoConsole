import { AuthGuard } from "@/features/auth/guards";
import { organizationsQueryOptions } from "@/features/org/hooks/useOrganizations";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(organizationsQueryOptions);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthGuard>
                <div className="flex-1 bg-background pt-0">{children}</div>
            </AuthGuard>
        </HydrationBoundary>
    );
}
