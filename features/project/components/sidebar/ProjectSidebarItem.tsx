"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton } from "@/components/ui/sidebar";

interface Props {
    href: string;
    icon: React.ElementType;
    label: string;
}

export function ProjectSidebarItem({ href, icon: Icon, label }: Props) {
    const pathname = usePathname();

    const active = pathname === href || pathname.startsWith(`${href}/`);

    return (
        <SidebarMenuButton asChild isActive={active}>
            <Link href={href}>
                <Icon />
                <span>{label}</span>
            </Link>
        </SidebarMenuButton>
    );
}
