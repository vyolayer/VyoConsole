import { Metadata } from "next";
import { AuthGuard } from "@/features/auth/guards";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { organizationsQueryOptions } from "@/features/org/hooks/useOrganizations";

export const metadata: Metadata = {
    title: "Console | Vyolayer",
    description:
        "Manage your organizations, projects, members, and permissions from a centralized Console. Monitor activity, control access, and scale your workspace efficiently.",

    keywords: [
        "Console",
        "organization management",
        "team management",
        "project management",
        "RBAC",
        "permissions",
        "Vyolayer",
    ],

    openGraph: {
        title: "Console | Vyolayer",
        description:
            "Centralized Console to manage organizations, teams, projects, and permissions.",
        // url: "https://yourdomain.com/Console",
        siteName: "Vyolayer",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Console | Vyolayer",
        description: "Manage your organizations, members, and projects from one place.",
    },

    robots: {
        index: false, // 🔒 Console should NOT be indexed
        follow: false,
    },
};

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(organizationsQueryOptions);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AuthGuard>
                <div className="min-h-screen relative flex flex-col bg-background">
                    {/* Ambient Gradient Background */}
                    <div className="absolute left-0 right-0 top-0 -z-10 h-[600px] w-full bg-linear-to-b from-primary/5 via-primary/5 to-transparent blur-3xl pointer-events-none opacity-60"></div>
                    {children}
                </div>
            </AuthGuard>
        </HydrationBoundary>
    );
}
