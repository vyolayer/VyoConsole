"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ProtectedError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        console.error("Protected Route Error:", error);
    }, [error]);

    return (
        <div className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center">
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Failed to load dashboard</h2>
                <p className="text-muted-foreground">
                    There was an issue loading your organization data.
                </p>
            </div>

            <Button onClick={reset}>Retry</Button>
        </div>
    );
}
