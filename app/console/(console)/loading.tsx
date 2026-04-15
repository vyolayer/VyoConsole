import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex w-full justify-center flex-1">
            <div className="flex w-full max-w-7xl">
                <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="aspect-square w-full rounded-xl" />
                    <Skeleton className="aspect-square w-full rounded-xl" />
                </div>
                {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
            </div>
        </div>
    );
}
