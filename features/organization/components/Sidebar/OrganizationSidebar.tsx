"use client";

import * as React from "react";

import { NavUser } from "@/features/organization/components/Sidebar/NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    GalleryVerticalEndIcon,
    AudioLinesIcon,
    TerminalIcon,
    TerminalSquareIcon,
    BotIcon,
    BookOpenIcon,
    Settings2Icon,
    FrameIcon,
    PieChartIcon,
    MapIcon,
    PlusIcon,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { OrganizationNavMain } from "./OrganizationNavMain";
import { OrganizationNavProjects } from "./OrganizationNavProjects";
import { useOrganization } from "../../hooks/useOrganizations";
import Link from "next/link";
import { Logo } from "@/components/Logo";

// This is sample data.
const data = {
    organizations: [
        {
            name: "Acme Inc",
            logo: <GalleryVerticalEndIcon />,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: <AudioLinesIcon />,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: <TerminalIcon />,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: <TerminalSquareIcon />,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: <BotIcon />,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: <BookOpenIcon />,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: <Settings2Icon />,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: <FrameIcon />,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: <PieChartIcon />,
        },
        {
            name: "Travel",
            url: "#",
            icon: <MapIcon />,
        },
    ],
};

export function OrganizationSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = useUser();
    const { data } = useOrganization();

    const organizations = data?.organizations || [];

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div>
                    <Logo />
                    <OrganizationSwitcher organizations={organizations} />
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* <OrganizationNavMain items={data.navMain} />
                <OrganizationNavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
