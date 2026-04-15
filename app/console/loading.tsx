import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="aspect-16/6 rounded-xl" />
            <Skeleton className="aspect-16/6 rounded-xl" />
            <Skeleton className="aspect-16/6 rounded-xl" />
            {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
    );
}
