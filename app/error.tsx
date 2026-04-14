"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Global Error:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold">Something went wrong</h1>
                <p className="text-muted-foreground max-w-md">
                    An unexpected error occurred. Please try again or refresh the page.
                </p>
            </div>

            <div className="flex gap-3">
                <Button onClick={() => reset()}>Try again</Button>

                <Button variant="outline" onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </div>
        </div>
    );
}
