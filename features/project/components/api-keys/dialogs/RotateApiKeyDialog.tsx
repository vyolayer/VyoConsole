"use client";

import * as React from "react";
import { RefreshCw, Loader2, ShieldCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRotateApiKey } from "@project/hooks/useApiKeys";
import { CreateApiKeyResponse } from "@project/api/apikey.api";

interface RotateApiKeyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    apiKeyId: string;
    apiKeyName: string;
    onRotated: (result: CreateApiKeyResponse) => void;
}

export function RotateApiKeyDialog({
    open,
    onOpenChange,
    apiKeyId,
    apiKeyName,
    onRotated,
}: RotateApiKeyDialogProps) {
    const mutation = useRotateApiKey(apiKeyId);

    const handleConfirm = async () => {
        const result = await mutation.mutateAsync();
        onOpenChange(false);
        onRotated(result);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-400">
                        <RefreshCw className="w-4 h-4" />
                        Rotate API Key
                    </DialogTitle>
                    <DialogDescription>
                        Rotating{" "}
                        <span className="font-semibold text-[#a1a1aa]">{apiKeyName}</span> will
                        generate a new secret. The old secret will be immediately invalidated.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 flex items-start gap-2 text-sm text-amber-400">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                        Update all services using this key before rotating to avoid downtime.
                    </span>
                </div>

                <DialogFooter className="gap-2 mt-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={mutation.isPending}
                        className="bg-amber-500 hover:bg-amber-500/90 text-black font-bold"
                    >
                        {mutation.isPending && (
                            <Loader2 className="animate-spin size-4 mr-2" />
                        )}
                        Rotate Key
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
