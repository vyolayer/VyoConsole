import { Metadata } from "next";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardSubHeader } from "@/features/dashboard/components/DashboardSubHeader";

export const metadata: Metadata = {
    title: "Dashboard | Vyolayer",
    description:
        "Manage your organizations, projects, members, and permissions from a centralized dashboard. Monitor activity, control access, and scale your workspace efficiently.",

    keywords: [
        "dashboard",
        "organization management",
        "team management",
        "project management",
        "RBAC",
        "permissions",
        "Vyolayer",
    ],

    openGraph: {
        title: "Dashboard | Vyolayer",
        description:
            "Centralized dashboard to manage organizations, teams, projects, and permissions.",
        // url: "https://yourdomain.com/dashboard",
        siteName: "Vyolayer",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Dashboard | Vyolayer",
        description: "Manage your organizations, members, and projects from one place.",
    },

    robots: {
        index: false, // 🔒 dashboard should NOT be indexed
        follow: false,
    },
};

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardHeader />
            <div className="flex flex-col gap-4 p-4">
                <DashboardSubHeader />
                <main className="flex-1 bg-background gap-4 p-4">{children}</main>
            </div>
        </>
    );
}
