"use client";

import * as React from "react";

export const HeaderLayer: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <header className="flex items-center justify-center px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50 w-full">
            {children}
        </header>
    );
};
