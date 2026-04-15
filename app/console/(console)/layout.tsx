import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardSubHeader } from "@/features/dashboard/components/DashboardSubHeader";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardHeader />
            <div className="flex flex-col min-h-screen">
                <div className="flex w-full justify-center flex-1">
                    <div className="flex w-full max-w-7xl flex-col gap-2 p-6 lg:px-8">
                        <DashboardSubHeader />
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
