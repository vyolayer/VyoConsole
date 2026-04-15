import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Header */}
            <div className="flex flex-col justify-center gap-2">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-4 w-60" />
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>

            <Skeleton className="h-24" />
            <Skeleton className="h-28" />
        </div>
    );
}
