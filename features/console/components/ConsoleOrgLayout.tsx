"use client";

import { ConsoleOrgHeader } from "./ConsoleOrgHeader";
import { OrgTabNav } from "./OrgTabNav";

interface ConsoleOrgLayoutProps {
    orgSlug: string;
    children: React.ReactNode;
}

export function ConsoleOrgLayout({ orgSlug, children }: ConsoleOrgLayoutProps) {
    const breadcrumbs = [
        { label: "Organizations" },
        { label: orgSlug, href: `/console/${orgSlug}` },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <ConsoleOrgHeader breadcrumbs={breadcrumbs} />

            <div className="flex w-full justify-center flex-1">
                <div className="flex w-full max-w-7xl flex-col p-6 lg:px-8">
                    <OrgTabNav orgSlug={orgSlug} />
                    {children}
                </div>
            </div>
        </div>
    );
}
