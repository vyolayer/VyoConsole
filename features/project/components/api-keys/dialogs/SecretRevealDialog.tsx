"use client";

import * as React from "react";
import { CheckCheck, Copy, Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IApiKey } from "@/features/project/types/apiKey.type";

interface SecretRevealDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    apiKey: IApiKey;
    secret: string;
}

export function SecretRevealDialog({
    open,
    onOpenChange,
    apiKey,
    secret,
}: SecretRevealDialogProps) {
    const [visible, setVisible] = React.useState(false);
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(secret);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // clipboard unavailable
        }
    };

    // Reset when re-opened
    React.useEffect(() => {
        if (open) {
            setVisible(false);
            setCopied(false);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#00e5ff]">
                        <KeyRound className="w-4 h-4" />
                        API Key Created
                    </DialogTitle>
                    <DialogDescription>
                        Your new API key{" "}
                        <span className="font-semibold text-[#a1a1aa]">{apiKey.name}</span> has
                        been created. Copy the secret now — it will not be shown again.
                    </DialogDescription>
                </DialogHeader>

                {/* Warning banner */}
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3 flex items-start gap-2 text-sm text-amber-400">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                        This is the <strong>only time</strong> the full secret key will be
                        displayed. Store it in a password manager or secrets vault.
                    </span>
                </div>

                {/* Secret box */}
                <div className="bg-[#0e0e12] border border-[#ffffff10] rounded-xl p-4 flex items-center justify-between gap-3">
                    <span className="font-mono text-sm text-[#a1a1aa] break-all flex-1">
                        {visible ? secret : "•".repeat(Math.min(secret.length, 48))}
                    </span>
                    <div className="flex items-center gap-1 shrink-0">
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-[#7b7b86] hover:text-white hover:bg-[#ffffff10]"
                            onClick={() => setVisible((v) => !v)}
                        >
                            {visible ? (
                                <EyeOff className="w-3.5 h-3.5" />
                            ) : (
                                <Eye className="w-3.5 h-3.5" />
                            )}
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-[#7b7b86] hover:text-white hover:bg-[#ffffff10]"
                            onClick={handleCopy}
                        >
                            {copied ? (
                                <CheckCheck className="w-3.5 h-3.5 text-[#00e5ff]" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Key meta */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] uppercase tracking-wide text-[#7b7b86] font-semibold">
                            Prefix
                        </span>
                        <span className="font-mono text-[#a1a1aa] text-xs">{apiKey.prefix}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[11px] uppercase tracking-wide text-[#7b7b86] font-semibold">
                            Environment
                        </span>
                        <span className="text-[#a1a1aa] text-xs capitalize">
                            {apiKey.environment}
                        </span>
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        className="w-full bg-[#00e5ff] hover:bg-[#00e5ff]/90 text-black font-bold"
                        onClick={() => onOpenChange(false)}
                    >
                        {copied ? (
                            <>
                                <CheckCheck className="w-4 h-4 mr-2" /> Copied — Done
                            </>
                        ) : (
                            "I've saved the key"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
