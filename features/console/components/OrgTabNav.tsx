"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = [
    { label: "Overview", path: "" },
    { label: "Projects", path: "/projects" },
    { label: "Members", path: "/members" },
    { label: "Invitations", path: "/invitations" },
    { label: "Settings", path: "/settings" },
];

interface OrgTabNavProps {
    orgSlug: string;
}

export function OrgTabNav({ orgSlug }: OrgTabNavProps) {
    return (
        <div className="border-b border-[#ffffff08] w-full">
            <div className="flex w-full max-w-7xl mx-auto px-6 lg:px-8">
                <nav className="flex gap-0" aria-label="Organization navigation">
                    {TABS.map((tab) => {
                        return (
                            <Tab
                                key={tab.label}
                                label={tab.label}
                                path={tab.path}
                                orgSlug={orgSlug}
                            />
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}

const Tab = ({ label, path, orgSlug }: { label: string; path: string; orgSlug: string }) => {
    const pathname = usePathname();
    const baseHref = `/console/${orgSlug}`;

    const href = `${baseHref}${path}`;
    const isActive =
        path === ""
            ? pathname === baseHref || pathname === `${baseHref}/`
            : pathname === href || pathname.startsWith(`${href}/`);
    return (
        <Link
            key={label}
            href={href}
            className={cn(
                "relative px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#00e5ff]"
                    : "text-[#7b7b86] hover:text-[#a1a1aa]",
            )}
        >
            {label}
        </Link>
    );
};
