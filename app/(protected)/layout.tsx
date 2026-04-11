import { AuthGuard } from "@/features/auth/guards";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="flex-1 bg-background pt-0">{children}</div>
        </AuthGuard>
    );
}
