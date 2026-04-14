"use client";

import React from "react";

type InvitationDialogContextType = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const InvitationDialogContext = React.createContext<InvitationDialogContextType | null>(
    null,
);

export function InvitationDialogProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = React.useState(false);

    const onOpenChange = (open: boolean) => setOpen(open);

    return (
        <InvitationDialogContext.Provider value={{ open, onOpenChange }}>
            {children}
        </InvitationDialogContext.Provider>
    );
}

export function useInvitationDialog() {
    const context = React.useContext(InvitationDialogContext);
    if (!context) throw new Error("useInvitation must be used within a InvitationProvider");

    return context;
}
