"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmNameDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title: string;
    name: string;

    type: "delete" | "archive";

    confirmText?: string; // optional override
    isLoading?: boolean;

    onConfirm: (text: string) => Promise<void> | void;
}

export const ConfirmNameDialog: React.FC<ConfirmNameDialogProps> = ({
    open,
    onOpenChange,
    title,
    name,
    type,
    confirmText,
    isLoading,
    onConfirm,
}) => {
    const [input, setInput] = useState("");

    const expectedText = confirmText ?? name;

    const isValid = input === expectedText;

    const description = `This action will ${type} "${name}". This cannot be undone.`;

    const handleClose = () => {
        setInput("");
        onOpenChange(false);
    };

    const handleConfirm = async () => {
        if (!isValid) return;

        await onConfirm(input);
        handleClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-105">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        <DialogTitle>{title}</DialogTitle>
                    </div>

                    <DialogDescription className="pt-2">
                        {description}
                        <br />
                        <span className="font-medium text-foreground">
                            Type{" "}
                            <code className="rounded bg-muted px-1 py-0.5">{expectedText}</code> to
                            confirm.
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Type "${expectedText}"`}
                        autoFocus
                    />
                </div>

                <DialogFooter className="gap-2 sm:justify-end">
                    <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancel
                    </Button>

                    <Button
                        variant="destructive"
                        disabled={!isValid || isLoading}
                        onClick={handleConfirm}
                    >
                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                        {buttonName[type]}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

const buttonName = {
    delete: "Delete",
    archive: "Archive",
};
