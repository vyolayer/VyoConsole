"use client";

import * as React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRevokeApiKey } from "@project/hooks/useApiKeys";

interface RevokeApiKeyDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    apiKeyId: string;
    apiKeyName: string;
}

export function RevokeApiKeyDialog({
    open,
    onOpenChange,
    apiKeyId,
    apiKeyName,
}: RevokeApiKeyDialogProps) {
    const mutation = useRevokeApiKey(apiKeyId);

    const handleConfirm = async () => {
        await mutation.mutateAsync();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-400">
                        <AlertTriangle className="w-4 h-4" />
                        Revoke API Key
                    </DialogTitle>
                    <DialogDescription>
                        This action is <strong className="text-white">permanent</strong>. Revoking{" "}
                        <span className="font-semibold text-[#a1a1aa]">{apiKeyName}</span> will
                        immediately invalidate it. Any services using this key will lose access.
                    </DialogDescription>
                </DialogHeader>

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                    You cannot undo this action. The key cannot be restored after revocation.
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
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending && (
                            <Loader2 className="animate-spin size-4 mr-2" />
                        )}
                        Revoke Key
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
