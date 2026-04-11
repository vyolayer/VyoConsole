import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardHeader />
            <main className="flex-1 bg-background gap-4 p-4">{children}</main>
        </>
    );
}
